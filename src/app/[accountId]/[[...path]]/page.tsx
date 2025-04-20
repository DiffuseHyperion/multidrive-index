import {getAccessToken} from "@/lib/auth"
import {notFound} from "next/navigation"
import getFiles from "@/lib/files"
import {paramPathToFullPath} from "@/lib/utils"
import ListViewTable, {ListedItem} from "@/app/[accountId]/[[...path]]/_components/ListViewTable"

export default async function AccountPage({params}: { params: Promise<{ accountId: string, path?: string[] }> }) {
    const {accountId, path} = await params

    const token = await getAccessToken(accountId)
    if (!token) {
        notFound()
    }

    const {data} = await getFiles(token, path)
    if (!data) {
        notFound()
    }

    const listItems = data.map((item) => {
        if ("folder" in item) {
            const redirectPath = `/${accountId}${paramPathToFullPath(path)}/${item.name}`
            return {
                name: item.name,
                type: "Folder",
                lastModified: new Date(item.lastModifiedDateTime),
                size: undefined,
                href: redirectPath,
            } as ListedItem
        } else if ("file" in item) {
            console.log(item)
            return {
                name: item.name,
                type: item.file.mimeType,
                lastModified: new Date(item.lastModifiedDateTime),
                size: item.size,
                href: item["@microsoft.graph.downloadUrl"],
            } as ListedItem
        } else {
            throw new Error(`Could not identify whether an item was a file or folder`)
        }
    })

    return (
        <ListViewTable items={listItems}/>
    )
}
