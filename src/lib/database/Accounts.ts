"use server"

import {prisma} from "@/lib/globals"

export async function readAccounts() {
    return prisma.account.findMany()
}