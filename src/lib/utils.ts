export async function paramPathToGraphPath(path: string[] | undefined): Promise<string> {
    return path ? `:${path.reduce((accumulator, item) => `${accumulator}/${item}`, "")}:` : ""
}

export async function paramPathToFullPath(path: string[] | undefined): Promise<string> {
    return path ? `${path.reduce((accumulator, item) => `${accumulator}/${item}`, "")}` : ""
}