export default async function AccountPage({params}: {params: Promise<{ accountId: string }>}) {
    const { accountId } = await params

    return (
        <div>
            <p>Account Page</p>
            <p>{accountId}</p>
        </div>
    )
}
