"use server"

import {prisma} from "@/lib/globals"

export async function readAccounts() {
    return prisma.mSALAccount.findMany()
}

export async function upsertAccount(homeAccountId: string, name: string, visible: boolean) {
    return prisma.mSALAccount.upsert({
        where: {
            homeAccountId: homeAccountId,
        },
        update: {
            name: name,
            visible: visible,
        },
        create: {
            homeAccountId: homeAccountId,
            name: name,
            visible: visible,
        },
    })
}

export async function isAccountVisible(homeAccountId: string) {
    const result = await prisma.mSALAccount.findUnique({
        where: {
            homeAccountId: homeAccountId,
        },
        select: {
            visible: true,
        },
    })
    return result ? result!.visible : null
}

export async function deleteAccount(homeAccountId: string) {
    return prisma.mSALAccount.delete({
        where: {
            homeAccountId: homeAccountId,
        },
    })
}