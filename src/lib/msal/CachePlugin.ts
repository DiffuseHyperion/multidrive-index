import {ICachePlugin, TokenCacheContext} from "@azure/msal-node"
import {getJsonCache, saveJsonCache} from "@/lib/msal/JsonCacheHandler"

export class CachePlugin implements ICachePlugin {
    async beforeCacheAccess(cacheContext: TokenCacheContext): Promise<void> {
        cacheContext.tokenCache.deserialize(JSON.stringify(await getJsonCache()))
    }

    async afterCacheAccess(cacheContext: TokenCacheContext): Promise<void> {
        await saveJsonCache(JSON.parse(cacheContext.tokenCache.serialize()))
    }
}