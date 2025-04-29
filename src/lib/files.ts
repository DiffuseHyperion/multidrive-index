"use server"

import {paramPathToFullPath} from "@/lib/utils"
import {getAccessToken} from "@/lib/msal/tokens"

export type OnedriveUser = {
    user: {
        email: string
        id: string
        displayName: string
    }
}

export type OnedriveGenericFile = {
    createdDateTime: string
    eTag: string
    id: string
    lastModifiedDateTime: string
    name: string
    webUrl: string
    cTag: string
    size: number
    createdBy: OnedriveUser
    lastModifiedBy: OnedriveUser
    parentReference: {
        driveType: string
        driveId: string
        id: string
        name: string
        path: string
        siteId: string
    }
    fileSystemInfo: {
        createdDateTime: string
        lastModifiedDateTime: string
    }
}

export type OnedriveFolder = OnedriveGenericFile & {
    folder: {
        childCount: number
    }
}

export type OnedriveFile = OnedriveGenericFile & {
    "@microsoft.graph.downloadUrl": string
    file: {
        mimeType: string,
        hashes: {
            quickXorHash: string
        }
    }
}

export type ListedGenericFile = {
    name: string
    key: string
    category: "file" | "folder",
    mimeType?: string,
    lastModified: Date
    size?: number
    path: string
}

export async function getOnedriveGenericFiles(accountId: string, path?: string[]): Promise<{
    data: (OnedriveFolder | OnedriveFile)[],
    error: null
} | { data: null, error: number }> {
    const accessToken = await getAccessToken(accountId)
    if (!accessToken) {
        return {data: null, error: 401}
    }

    const targetPath = path ? `:${path.reduce((accumulator, item) => `${accumulator}/${item}`, "")}:` : ""

    const response = await fetch(`https://graph.microsoft.com/v1.0/me/drive/root${targetPath}/children`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        },
    })

    if (!response.ok) {
        return {data: null, error: response.status}
    }

    return {
        data: ((await response.json()).value).map((folder: OnedriveFolder | OnedriveFile) => {
            if (folder.hasOwnProperty("folder")) {
                return folder as OnedriveFolder
            } else if (folder.hasOwnProperty("file")) {
                return folder as OnedriveFile
            } else {
                throw Error(`Could not recognize whether "${folder.name}" was a file or folder`)
            }
        }),
        error: null,
    }
}

export async function getListedGenericFiles(accountId: string, path?: string[]): Promise<{
    data: ListedGenericFile[],
    error: null
} | { data: null, error: number }> {
    const {data, error} = await getOnedriveGenericFiles(accountId, path)
    if (!data) {
        return {data: null, error: error}
    }

    const listedGenericFiles = data.map((item) => {
        if ("folder" in item) {
            const redirectPath = `/${accountId}${paramPathToFullPath(path)}/${item.name}`
            return {
                name: item.name,
                key: item.eTag,
                mimeType: undefined,
                category: "folder",
                lastModified: new Date(item.lastModifiedDateTime),
                size: undefined,
                path: redirectPath,
            } as ListedGenericFile
        } else if ("file" in item) {
            return {
                name: item.name,
                key: item.eTag,
                mimeType: item.file.mimeType,
                category: "file",
                lastModified: new Date(item.lastModifiedDateTime),
                size: item.size,
                path: item["@microsoft.graph.downloadUrl"],
            } as ListedGenericFile
        } else {
            throw new Error(`Could not identify whether an item was a file or folder`)
        }
    })

    return {data: listedGenericFiles, error: null}
}