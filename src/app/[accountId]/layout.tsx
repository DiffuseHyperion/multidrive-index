import React from "react"

export default async function AccountLayout({header, children}: {
    header: React.ReactNode,
    children: React.ReactNode
}) {
    return (
        <div className={"flex flex-col gap-y-2"}>
            {header}
            {children}
        </div>
    )
}