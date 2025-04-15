import {MSAL, SCOPES} from "@/lib/globals"
import {redirect} from "next/navigation"

export async function GET(request: Request) {
    const url = await MSAL.getAuthCodeUrl({
        scopes: SCOPES,
        redirectUri: `${process.env.REDIRECT_URL!}/api/auth/callback`
    })

    redirect(url)
}