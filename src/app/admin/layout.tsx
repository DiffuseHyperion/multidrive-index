import React from "react"
import {getSession} from "@/lib/auth/session"
import {redirect} from "next/navigation"

export default async function AdminLayout({children}: { children: React.ReactNode }) {
    const session = await getSession()
    if (!session.isLoggedIn) {
        redirect("/login")
    }

    return (
        <div className={"flex-grow flex flex-row gap-x-2"}>
            {children}
        </div>
    )
}