import {OnedriveFolder} from "@/lib/files"
import {FolderIcon} from "lucide-react"

export default async function ListViewFolder({redirectPath, item}: {redirectPath: string, item: OnedriveFolder}) {
    return (
        <div className={"flex flex-row gap-x-1"}>
            <FolderIcon/>
            <a key={item.eTag} href={redirectPath}>{item.name}</a>
        </div>
    )
}