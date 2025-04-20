export function paramPathToGraphPath(path: string[] | undefined): string {
    return path ? `:${path.reduce((accumulator, item) => `${accumulator}/${item}`, "")}:` : ""
}

export function paramPathToFullPath(path: string[] | undefined): string {
    return path ? `${path.reduce((accumulator, item) => `${accumulator}/${item}`, "")}` : ""
}