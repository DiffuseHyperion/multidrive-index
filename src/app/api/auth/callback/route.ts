import {NextRequest} from "next/server"
import {redirect} from "next/navigation"
import {MSAL, prisma, SCOPES} from "@/lib/globals"

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

        const account = await prisma.account.upsert({
            where: {
                homeAccountId: accountInfo.homeAccountId,
            },
            update: {
                name: accountInfo.username,
            },
            create: {
                homeAccountId: accountInfo.homeAccountId,
                name: accountInfo.username,
            },
        })

        redirect(`/${account.homeAccountId}`)
    } catch (error: unknown) {
        const {errorMessage} = error as { errorMessage: string }
        return new Response(errorMessage, {status: 400})
    }
}