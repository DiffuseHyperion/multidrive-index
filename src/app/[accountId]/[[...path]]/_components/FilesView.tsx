import {notFound} from "next/navigation"
import {getListedGenericFiles} from "@/lib/files"
import ClientFilesView from "@/app/[accountId]/[[...path]]/_components/ClientFilesView"

export default async function FilesView({accountId, path}: { accountId: string, path?: string[] }) {
    const {data} = await getListedGenericFiles(accountId, path)
    if (!data) notFound()

    return <ClientFilesView listedItems={data}/>
}