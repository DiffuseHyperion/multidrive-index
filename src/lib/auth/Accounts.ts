"use server"

import {Account} from "@prisma/client";
import {prisma} from "@/lib/globals";

export async function upsertUser(user: Account) {
    return prisma.account.upsert({
        where: {
            name: user.name
        },
        update: {
            name: user.name,
            hash: user.hash,
        },
        create: {
            name: user.name,
            hash: user.hash,
        }
    })
}