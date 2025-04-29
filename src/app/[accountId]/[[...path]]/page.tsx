import React, {Suspense} from "react"
import FilesView from "@/app/[accountId]/[[...path]]/_components/FilesView"
import {Card, CardHeader} from "@/shadcn/components/ui/card"
import {Skeleton} from "@/shadcn/components/ui/skeleton"
import {isAccountVisible} from "@/lib/database/MSALAccounts"
import {notFound} from "next/navigation"

export const dynamic = "force-dynamic"

export default async function AccountPage({params}: { params: Promise<{ accountId: string, path?: string[] }> }) {
    const {accountId, path} = await params

    if (!(await isAccountVisible(accountId))) {
        notFound()
    }

    return (
        <Card className={"flex-grow flex flex-col"}>
            <CardHeader className={"gap-y-6"}>
                <Suspense fallback={<Skeleton className={"flex-grow"}/>}>
                    <FilesView accountId={accountId} path={path}/>
                </Suspense>
            </CardHeader>
        </Card>
    )
}
