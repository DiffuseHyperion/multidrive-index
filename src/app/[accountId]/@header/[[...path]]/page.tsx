import Breadcrumbs from "@/app/[accountId]/@header/[[...path]]/_components/Breadcrumbs"
import ViewTypeSelect from "@/app/[accountId]/[[...path]]/_components/ViewTypeSelect"
import React from "react"

export default async function AccountHeader({params}: { params: Promise<{ accountId: string, path?: string[] }> }) {
    const {accountId, path} = await params

    return (
        <div className={"flex flex-row justify-between items-center"}>
            <Breadcrumbs accountId={accountId} path={path}/>
            <ViewTypeSelect/>
        </div>
    )
}