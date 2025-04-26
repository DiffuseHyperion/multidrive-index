import {FileArchiveIcon, FileIcon, FileTextIcon, FolderIcon, ImageIcon} from "lucide-react"

export function paramPathToGraphPath(path: string[] | undefined): string {
    return path ? `:${path.reduce((accumulator, item) => `${accumulator}/${item}`, "")}:` : ""
}

export function paramPathToFullPath(path: string[] | undefined): string {
    return path ? `${path.reduce((accumulator, item) => `${accumulator}/${item}`, "")}` : ""
}

export function formatBytes(bytes: number, decimals: number) {
    // stolen from https://gist.github.com/zentala/1e6f72438796d74531803cc3833c039c
    if (bytes == 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(decimals) + ' ' + sizes[i];
}

export function getIcon(mimeType: string) {
    switch (mimeType) {
        case "Folder":
            return <FolderIcon/>
        case "image/png":
            return <ImageIcon/>
        case "application/x-gzip":
        case "application/zip":
            return <FileArchiveIcon/>
        case "text/plain":
            return <FileTextIcon/>
        default:
            return <FileIcon/>
    }
}