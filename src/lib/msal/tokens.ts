"use server"

import {MSAL, SCOPES} from "@/lib/globals"
import {deleteAccount} from "@/lib/database/MSALAccounts"

export async function getAccessToken(homeAccountId: string) {
    const accountInfo = await MSAL.getTokenCache().getAccountByHomeId(homeAccountId)

    if (!accountInfo) {
        await deleteAccount(homeAccountId)
        return null
    }

    return (await MSAL.acquireTokenSilent({
        account: accountInfo,
        scopes: SCOPES,
    })).accessToken
}