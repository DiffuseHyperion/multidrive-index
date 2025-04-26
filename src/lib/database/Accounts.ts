"use server"

import {prisma} from "@/lib/globals"

export async function readAccounts() {
    return prisma.account.findMany()
}

export async function upsertAccount(homeAccountId: string, name: string) {
    return prisma.account.upsert({
        where: {
            homeAccountId: homeAccountId,
        },
        update: {
            name: name,
        },
        create: {
            homeAccountId: homeAccountId,
            name: name,
        },
    })
}