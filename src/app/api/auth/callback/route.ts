import {NextRequest} from "next/server"
import {redirect} from "next/navigation"
import {MSAL, SCOPES} from "@/lib/globals"
import {upsertAccount} from "@/lib/database/Accounts"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    const code = searchParams.get("code")!

    try {
        const response = await MSAL.acquireTokenByCode({
            code: code,
            scopes: SCOPES,
            redirectUri: `${process.env.REDIRECT_URL!}/api/auth/callback`,
        })

        const accountInfo = response.account!

        await upsertAccount(accountInfo.homeAccountId, accountInfo.username)

        redirect(`/${accountInfo.homeAccountId}`)
    } catch (error: unknown) {
        const {errorMessage} = error as { errorMessage: string }
        return new Response(errorMessage, {status: 400})
    }
}