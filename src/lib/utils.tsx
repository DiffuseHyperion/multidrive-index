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
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return (bytes / Math.pow(k, i)).toFixed(decimals) + ' ' + sizes[i]
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

export function formatDate(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0')

    let hours = date.getHours()
    const minutes = pad(date.getMinutes())
    const seconds = pad(date.getSeconds())
    const ampm = hours >= 12 ? 'PM' : 'AM'

    hours = hours % 12
    hours = hours ? hours : 12 // 0 becomes 12
    const hourStr = pad(hours)

    const year = date.getFullYear().toString().slice(-2)
    const month = pad(date.getMonth() + 1)
    const day = pad(date.getDate())

    // Extract 3-letter timezone abbreviation (e.g., PST, EDT, UTC)
    const tzAbbr = Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
        .formatToParts(date)
        .find(part => part.type === 'timeZoneName')?.value || 'UTC'

    return `${year}-${month}-${day} ${hourStr}:${minutes}:${seconds} ${ampm} ${tzAbbr}`
}