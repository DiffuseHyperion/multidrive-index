"use server"

import {MSAL, prisma, SCOPES} from "@/lib/globals"

export async function getAccessToken(homeAccountId: string) {
    const accountInfo = await MSAL.getTokenCache().getAccountByHomeId(homeAccountId)

    if (!accountInfo) {
        prisma.account.delete({
            where: {
                homeAccountId: homeAccountId,
            },
        })
        return null
    }

    return (await MSAL.acquireTokenSilent({
        account: accountInfo,
        scopes: SCOPES,
    })).accessToken
}