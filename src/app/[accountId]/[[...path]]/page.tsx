import {getAccessToken} from "@/lib/auth"
import {notFound} from "next/navigation"
import getFiles from "@/lib/files"

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
        <div>
            <p>Account Files</p>
            <div>
                {data.map((item) => {
                    if ("folder" in item) {
                        const redirectPath = path ? `/${accountId}${path.reduce((accumulator, item) => `${accumulator}/${item}`, "")}/${item.name}` : `/${accountId}/${item.name}`
                        return (
                            <a key={item.eTag} href={redirectPath}>{item.name}</a>
                        )
                    } else if ("file" in item) {
                        return (
                            <a key={item.eTag} href={item["@microsoft.graph.downloadUrl"]}>{item.name}</a>
                        )
                    }
                })}
            </div>
        </div>
    )
}
