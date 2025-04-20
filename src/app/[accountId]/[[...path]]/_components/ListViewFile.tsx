import {OnedriveItem} from "@/lib/files"
import {FileIcon} from "lucide-react"

export default async function ListViewFile({downloadUrl, item}: { downloadUrl: string, item: OnedriveItem }) {
    return (
        <div className={"flex flex-row gap-x-1"}>
            <FileIcon/>
            <a key={item.eTag} href={downloadUrl}>{item.name}</a>
        </div>
    )
}