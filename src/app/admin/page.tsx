import {MSAL, SCOPES} from "@/lib/globals"
import {redirect} from "next/navigation"

export default async function AdminPage() {
    async function login() {
        "use server"

        const url = await MSAL.getAuthCodeUrl({
            scopes: SCOPES,
            redirectUri: `${process.env.REDIRECT_URL!}/api/auth/callback`,
        })

        redirect(url)
    }

    return (
        <div>
            <p>admin page</p>
            <div>
                <form action={login}>
                    <button type={"submit"}>Add Account</button>
                </form>
            </div>
        </div>
    )
}