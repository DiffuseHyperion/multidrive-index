export default async function Breadcrumbs({params}: { params: Promise<{ accountId: string, path?: string[] }> }) {
    const {accountId, path} = await params

    return (
        <div>
            <p>testing breadcrumbs</p>
            <p>{path}</p>
        </div>
    )
}