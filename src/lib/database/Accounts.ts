"use server"

import {prisma} from "@/lib/globals"

export async function readAccounts() {
    return prisma.mSALAccount.findMany()
}

export async function upsertAccount(homeAccountId: string, name: string) {
    return prisma.mSALAccount.upsert({
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

export async function deleteAccount(homeAccountId: string) {
    return prisma.mSALAccount.delete({
        where: {
            homeAccountId: homeAccountId,
        },
    })
}