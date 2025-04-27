import React from "react"
import {getSession} from "@/lib/auth/session"
import {redirect} from "next/navigation"

export default async function AdminLayout({sidebar, children}: { sidebar: React.ReactNode, children: React.ReactNode }) {
    const session = await getSession()
    if (!session.isLoggedIn) {
        redirect("/login")
    }

    return (
        <div className={"flex flex-row gap-x-2"}>
            {sidebar}
            {children}
        </div>
    )
}