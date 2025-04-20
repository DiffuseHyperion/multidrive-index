import {NextRequest} from "next/server"
import {redirect} from "next/navigation"
import {MSAL, prisma, SCOPES} from "@/lib/globals"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    const code = searchParams.get("code")!
    const clientInfo = searchParams.get("client_info")!
    const sessionState = searchParams.get("session_state")!

    const response = await MSAL.acquireTokenByCode({
        code: code,
        scopes: SCOPES,
        redirectUri: `${process.env.REDIRECT_URL!}/api/auth/callback`
    })

    const account = await prisma.account.create({
        data: {
            homeAccountId: response.account!.homeAccountId,
            name: response.account!.username,
        }
    })

    redirect(`/${account.homeAccountId}`)
}