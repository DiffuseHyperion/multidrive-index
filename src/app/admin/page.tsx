import {MSAL, SCOPES} from "@/lib/globals"
import {redirect} from "next/navigation"

export default async function AdminPage() {
    return (
        <div>
            <p>admin page</p>
            <div>
                <form action={async () => {
                    "use server"

                    const url = await MSAL.getAuthCodeUrl({
                        scopes: SCOPES,
                        redirectUri: `${process.env.REDIRECT_URL!}/api/auth/callback`,
                    })

                    redirect(url)
                }}>
                    <button type={"submit"}>Add Account</button>
                </form>
            </div>
        </div>
    )
}