import {MSAL, SCOPES} from "@/lib/globals"
import {redirect} from "next/navigation"
import {getSession} from "@/lib/auth/session"

export default async function AdminPage() {
    const session = await getSession()
    if (!session.isLoggedIn) {
        redirect("/admin/login")
    }


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