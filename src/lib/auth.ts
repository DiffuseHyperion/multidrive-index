"use server"

import {MSAL, SCOPES} from "@/lib/globals"

export async function getAccessToken(homeAccountId: string) {
    const accountInfos = await MSAL.getTokenCache().getAllAccounts()
    const filteredAccounts = accountInfos.filter((accountInfo) => accountInfo.homeAccountId === homeAccountId)

    if (filteredAccounts.length !== 0) {
        return null
    }

    return (await MSAL.acquireTokenSilent({
        account: filteredAccounts[0],
        scopes: SCOPES,
    })).accessToken
}