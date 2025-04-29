import React from "react"

export default async function AdminLayout({children}: { children: React.ReactNode }) {
    return (
        <div className={"flex-grow flex flex-row gap-x-2"}>
            {children}
        </div>
    )
}