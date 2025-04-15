import {PrismaClient} from "@/lib/prisma"
import {ConfidentialClientApplication} from "@azure/msal-node"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
const globalForMSAL = globalThis as unknown as { MSAL: ConfidentialClientApplication }

export const prisma = globalForPrisma.prisma || new PrismaClient()
export const MSAL = globalForMSAL.MSAL || new ConfidentialClientApplication({
    auth: {
        clientId: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET!,
        authority: (process.env.TENANT_ID ? `https://login.microsoftonline.com/${process.env.TENANT_ID!}` : "https://login.microsoftonline.com/common")
    },
})

if (process.env.NODE_ENV! !== "production") {
    globalForPrisma.prisma = prisma
    globalForMSAL.MSAL = MSAL
}

export const SCOPES = ["Files.Read.All", "offline_access", "User.Read"]