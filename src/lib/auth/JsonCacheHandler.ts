import {JsonCache, SerializedAccessTokenEntity, SerializedAccountEntity, SerializedAppMetadataEntity, SerializedIdTokenEntity, SerializedRefreshTokenEntity} from "@azure/msal-node"
import {prisma} from "@/lib/globals"
import {TenantProfile} from "@azure/msal-common"

export async function getJsonCache(): Promise<JsonCache> {
    const accountEntities = await getAccountEntities()
    const idTokenEntities = await getIdTokenEntities()
    const accessTokenEntities = await getAccessTokenEntities()
    const refreshTokenEntities = await getRefreshTokenEntities()
    const appMetadataEntities = await getAppMetadataEntities()

    return {
        Account: accountEntities,
        IdToken: idTokenEntities,
        AccessToken: accessTokenEntities,
        RefreshToken: refreshTokenEntities,
        AppMetadata: appMetadataEntities,
    } as JsonCache
}

export async function saveJsonCache(cache: JsonCache): Promise<void> {
    await Promise.all([
        saveAccountEntities(cache.Account),
        saveIdTokenEntities(cache.IdToken),
        saveAccessTokenEntities(cache.AccessToken),
        saveRefreshTokenEntities(cache.RefreshToken),
        saveAppMetadataEntities(cache.AppMetadata),
    ])

}

async function saveAppMetadataEntities(appMetadataEntities: Record<string, SerializedAppMetadataEntity>): Promise<void> {
    for (const [id, appMetadata] of Object.entries(appMetadataEntities)) {
        await prisma.appMetadataCache.upsert({
            where: {
                id: id
            },
            update: {
                clientId: appMetadata.client_id,
                environment: appMetadata.environment,
                familyId: appMetadata.family_id
            },
            create: {
                id: id,
                clientId: appMetadata.client_id,
                environment: appMetadata.environment,
                familyId: appMetadata.family_id
            }
        })
    }
}

async function getAppMetadataEntities(): Promise<Record<string, SerializedAppMetadataEntity>> {
    const appMetadataObjects = await prisma.appMetadataCache.findMany()
    const appMetadataEntities: Record<string, SerializedAppMetadataEntity> = {}

    for (const appMetadata of appMetadataObjects) {
        appMetadataEntities[appMetadata.id] = {
            client_id: appMetadata.clientId,
            environment: appMetadata.environment,
            family_id: appMetadata.familyId
        } as SerializedAppMetadataEntity
    }
    return appMetadataEntities
}

async function saveRefreshTokenEntities(refreshTokenEntities: Record<string, SerializedRefreshTokenEntity>): Promise<void> {
    for (const [id, refreshToken] of Object.entries(refreshTokenEntities)) {
        await prisma.refreshTokenCache.upsert({
            where: {
                id: id
            },
            update: {
                homeAccountId: refreshToken.home_account_id,
                environment: refreshToken.environment,
                credentialType: refreshToken.credential_type,
                clientId: refreshToken.client_id,
                secret: refreshToken.secret,
                familyId: refreshToken.family_id,
                target: refreshToken.target,
                realm: refreshToken.realm
            },
            create: {
                id: id,
                homeAccountId: refreshToken.home_account_id,
                environment: refreshToken.environment,
                credentialType: refreshToken.credential_type,
                clientId: refreshToken.client_id,
                secret: refreshToken.secret,
                familyId: refreshToken.family_id,
                target: refreshToken.target,
                realm: refreshToken.realm
            }
        })
    }
}

async function getRefreshTokenEntities(): Promise<Record<string, SerializedRefreshTokenEntity>> {
    const refreshTokens = await prisma.refreshTokenCache.findMany()
    const refreshTokenEntities: Record<string, SerializedRefreshTokenEntity> = {}

    for (const refreshToken of refreshTokens) {
        refreshTokenEntities[refreshToken.id] = {
            home_account_id: refreshToken.homeAccountId,
            environment: refreshToken.environment,
            credential_type: refreshToken.credentialType,
            client_id: refreshToken.clientId,
            secret: refreshToken.secret,
            family_id: refreshToken.familyId,
            target: refreshToken.target,
            realm: refreshToken.realm
        } as SerializedRefreshTokenEntity
    }
    return refreshTokenEntities
}

async function saveAccessTokenEntities(accessTokenEntities: Record<string, SerializedAccessTokenEntity>): Promise<void> {
    for (const [id, idToken] of Object.entries(accessTokenEntities)) {
        await prisma.accessTokenCache.upsert({
            where: {
                id: id
            },
            update: {
                homeAccountId: idToken.home_account_id,
                environment: idToken.environment,
                credentialType: idToken.credential_type,
                clientId: idToken.client_id,
                secret: idToken.secret,
                realm: idToken.realm,
                target: idToken.target,
                cachedAt: idToken.cached_at,
                expiresOn: idToken.expires_on,
                extendedExpiresOn: idToken.extended_expires_on,
                refreshOn: idToken.refresh_on,
                keyId: idToken.key_id,
                tokenType: idToken.token_type,
                requestedClaims: idToken.requestedClaims,
                requestedClaimsHash: idToken.requestedClaimsHash,
                userAssertionHash: idToken.userAssertionHash,
            },
            create: {
                id: id,
                homeAccountId: idToken.home_account_id,
                environment: idToken.environment,
                credentialType: idToken.credential_type,
                clientId: idToken.client_id,
                secret: idToken.secret,
                realm: idToken.realm,
                target: idToken.target,
                cachedAt: idToken.cached_at,
                expiresOn: idToken.expires_on,
                extendedExpiresOn: idToken.extended_expires_on,
                refreshOn: idToken.refresh_on,
                keyId: idToken.key_id,
                tokenType: idToken.token_type,
                requestedClaims: idToken.requestedClaims,
                requestedClaimsHash: idToken.requestedClaimsHash,
                userAssertionHash: idToken.userAssertionHash,
            }
        })
    }
}

async function getAccessTokenEntities(): Promise<Record<string, SerializedAccessTokenEntity>> {
    const accessTokens = await prisma.accessTokenCache.findMany()
    const accessTokenEntities: Record<string, SerializedAccessTokenEntity> = {}

    for (const accessToken of accessTokens) {
        accessTokenEntities[accessToken.id] = {
            home_account_id: accessToken.homeAccountId,
            environment: accessToken.environment,
            credential_type: accessToken.credentialType,
            client_id: accessToken.clientId,
            secret: accessToken.secret,
            realm: accessToken.realm,
            target: accessToken.target,
            cached_at: accessToken.cachedAt,
            expires_on: accessToken.expiresOn,
            extended_expires_on: accessToken.extendedExpiresOn,
            refresh_on: accessToken.refreshOn,
            key_id: accessToken.keyId,
            token_type: accessToken.tokenType,
            requestedClaims: accessToken.requestedClaims,
            requestedClaimsHash: accessToken.requestedClaimsHash,
            userAssertionHash: accessToken.userAssertionHash,
        } as SerializedAccessTokenEntity
    }
    return accessTokenEntities
}

async function saveIdTokenEntities(idTokenEntities: Record<string, SerializedIdTokenEntity>): Promise<void> {
    for (const [id, idToken] of Object.entries(idTokenEntities)) {
        await prisma.idTokenCache.upsert({
            where: {
                id: id
            },
            update: {
                clientId: idToken.client_id,
                credentialType: idToken.credential_type,
                environment: idToken.environment,
                homeAccountId: idToken.home_account_id,
                realm: idToken.realm,
                secret: idToken.secret
            },
            create: {
                id: id,
                clientId: idToken.client_id,
                credentialType: idToken.credential_type,
                environment: idToken.environment,
                homeAccountId: idToken.home_account_id,
                realm: idToken.realm,
                secret: idToken.secret
            }
        })
    }
}

async function getIdTokenEntities(): Promise<Record<string, SerializedIdTokenEntity>> {
    const idTokens = await prisma.idTokenCache.findMany()
    const idTokenEntities: Record<string, SerializedIdTokenEntity> = {}

    for (const idToken of idTokens) {
        idTokenEntities[idToken.id] = {
            home_account_id: idToken.homeAccountId,
            environment: idToken.environment,
            credential_type: idToken.credentialType,
            client_id: idToken.clientId,
            secret: idToken.secret,
            realm: idToken.realm,
        } as SerializedIdTokenEntity
    }
    return idTokenEntities
}

async function saveAccountEntities(accountEntities: Record<string, SerializedAccountEntity>): Promise<void> {
    for (const [id, account] of Object.entries(accountEntities)) {
        await prisma.accountCache.upsert({
            where: {
                id: id
            },
            update: {
                homeAccountId: account.home_account_id,
                environment: account.environment,
                realm: account.realm,
                localAccountId: account.local_account_id,
                username: account.username,
                authorityType: account.authority_type,
                name: account.name,
                clientInfo: account.client_info,
                lastModificationTime: account.last_modification_time,
                lastModificationApp: account.last_modification_app,
                tenantProfiles: {
                    deleteMany: {}, // there are no supported functions to update based on an array (like createMany but for updates), replacing will have to do
                    createMany: {
                        data: (account.tenantProfiles || []).map(profile => {
                            const tenantProfile = JSON.parse(profile) as TenantProfile
                            return {
                                tenantId: tenantProfile.tenantId,
                                localAccountId: tenantProfile.localAccountId,
                                name: tenantProfile.name,
                                isHomeTenant: tenantProfile.isHomeTenant
                            }
                        })
                    }
                }
            },
            create: {
                id: id,
                homeAccountId: account.home_account_id,
                environment: account.environment,
                realm: account.realm,
                localAccountId: account.local_account_id,
                username: account.username,
                authorityType: account.authority_type,
                name: account.name,
                clientInfo: account.client_info,
                lastModificationTime: account.last_modification_time,
                lastModificationApp: account.last_modification_app,
                tenantProfiles: {
                    createMany: {
                        data: (account.tenantProfiles || []).map(profile => {
                            const tenantProfile = JSON.parse(profile) as TenantProfile
                            return {
                                tenantId: tenantProfile.tenantId,
                                localAccountId: tenantProfile.localAccountId,
                                name: tenantProfile.name,
                                isHomeTenant: tenantProfile.isHomeTenant
                            }
                        })
                    }
                },
            }
        })


    }
}

async function getAccountEntities(): Promise<Record<string, SerializedAccountEntity>> {
    const accounts = await prisma.accountCache.findMany()
    const accountEntities: Record<string, SerializedAccountEntity> = {}

    for (const account of accounts) {
        accountEntities[account.id] = {
            home_account_id: account.homeAccountId,
            environment: account.environment,
            realm: account.realm,
            local_account_id: account.localAccountId,
            username: account.username,
            authority_type: account.authorityType,
            name: account.name,
            client_info: account.clientInfo,
            last_modification_time: account.lastModificationTime,
            last_modification_app: account.lastModificationApp,
            tenantProfiles: (await getTenantProfileEntities(account.id)).map(profile => JSON.stringify(profile)),
        } as SerializedAccountEntity
    }
    return accountEntities
}

async function getTenantProfileEntities(accountId: string): Promise<TenantProfile[]> {
    const result = await prisma.tenantProfileCache.findMany({
        where: {
            accountId: accountId,
        },
    })
    return result.map(profile => ({
        tenantId: profile.tenantId,
        localAccountId: profile.localAccountId,
        name: profile.name,
        isHomeTenant: profile.isHomeTenant,
    }) as TenantProfile)
}