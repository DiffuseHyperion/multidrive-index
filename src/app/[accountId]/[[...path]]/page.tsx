import {getAccessToken} from "@/lib/auth"
import {notFound} from "next/navigation"
import getFiles from "@/lib/files"
import ListViewFolder from "@/app/[accountId]/[[...path]]/_components/ListViewFolder"
import ListViewFile from "@/app/[accountId]/[[...path]]/_components/ListViewFile"
import {paramPathToFullPath} from "@/lib/utils"

export default async function AccountPage({params}: { params: Promise<{ accountId: string, path?: string[] }> }) {
    const {accountId, path} = await params

    const token = await getAccessToken(accountId)
    if (!token) {
        notFound()
    }

    const {data, error} = await getFiles(token, path)
    if (!data) {
        console.log(error)
        notFound()
    }
    return (
        <div className={"flex flex-col gap-y-2"}>
            {data.map((item) => {
                if ("folder" in item) {
                    const redirectPath = `/${accountId}${paramPathToFullPath(path)}/${item.name}`
                    return (
                        <ListViewFolder redirectPath={redirectPath} item={item} key={item.id}/>
                    )
                } else if ("file" in item) {
                    return (
                        <ListViewFile downloadUrl={item["@microsoft.graph.downloadUrl"]} item={item} key={item.id}/>
                    )
                }
            })}
        </div>
    )
}
