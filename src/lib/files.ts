"use server"

export type OnedriveUser = {
    user: {
        email: string
        id: string
        displayName: string
    }
}

export type OnedriveItem = {
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

export type OnedriveFolder = OnedriveItem & {
    folder: {
        childCount: number
    }
}

export type OnedriveFile = OnedriveItem & {
    "@microsoft.graph.downloadUrl": string
    file: {
        mimeType: string,
        hashes: {
            quickXorHash: string
        }
    }
}

export default async function getFiles(accessToken: string, path?: string[]) {
    const targetPath = path ? `:${path.reduce((accumulator, item) => `${accumulator}/${item}`, "")}:` : ""

    const response = await fetch(`https://graph.microsoft.com/v1.0/me/drive/root${targetPath}/children`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        }
    })

    return ((await response.json()).value as any[]).map((folder: any) => {
        if (folder.hasOwnProperty("folder")) {
            return folder as OnedriveFolder
        } else if (folder.hasOwnProperty("file")) {
            return folder as OnedriveFile
        } else {
            throw Error(`Could not recognize whether "${folder.path}" was a file or folder`)
        }
    })
}