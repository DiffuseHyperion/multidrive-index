export default async function AdminPage() {
    return (
        <div>
            <p>admin page</p>
            <div>
                <a href={"/api/auth/login"}>Add Account</a>
            </div>
        </div>
    )
}