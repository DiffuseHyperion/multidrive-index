import {NextRequest} from "next/server"
import {redirect} from "next/navigation"
import {MSAL, SCOPES} from "@/lib/globals"
import {cookies} from "next/headers"

export async function GET(request: NextRequest) {
    const cookieStore = await cookies()
    const searchParams = request.nextUrl.searchParams

    const code = searchParams.get("code")!
    const clientInfo = searchParams.get("client_info")!
    const sessionState = searchParams.get("session_state")!

    const response = await MSAL.acquireTokenByCode({
        code: code,
        scopes: SCOPES,
        redirectUri: `${process.env.REDIRECT_URL!}/api/auth/callback`
    })

    cookieStore.set("access_token", response.accessToken)

    redirect("/")
}