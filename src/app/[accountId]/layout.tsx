import React from "react"

export default function Layout({breadcrumbs, children}: { breadcrumbs: React.ReactNode, children: React.ReactNode }) {
    return (
        <div className={"py-10 flex flex-col gap-y-2"}>
            {breadcrumbs}
            <div className={"border-2 border-gray-700 rounded-lg p-4"}>
                {children}
            </div>

        </div>
    )
}