import React from "react"

export default function Layout({breadcrumbs, children}: { breadcrumbs: React.ReactNode, children: React.ReactNode }) {
    return (
        <div>
            {breadcrumbs}
            <p>testing layout</p>
            {children}
        </div>
    )
}