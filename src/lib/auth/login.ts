"use server"

import {prisma} from "@/lib/globals"
import {getSession} from "@/lib/auth/session"

export default async function login(name: string, hash: string) {
    console.log(hash)
    const session = await getSession()

    const user = await prisma.account.findUnique({
        where: {
            name: name,
            hash: hash,
        }
    })

    if (!user) {
        return false
    }

    session.isLoggedIn = true
    session.name = user.name
    await session.save()
    return true
}