import React, {Suspense} from "react"
import FilesView from "@/app/[accountId]/[[...path]]/_components/FilesView"
import {Card} from "@/shadcn/components/ui/card"
import {Skeleton} from "@/shadcn/components/ui/skeleton"

export const dynamic = "force-dynamic"

export default async function AccountPage({params}: { params: Promise<{ accountId: string, path?: string[] }> }) {
    const {accountId, path} = await params

    return (
        <Card>
            <div className={"px-6"}>
                <Suspense fallback={<Skeleton/>}>
                    <FilesView accountId={accountId} path={path}/>
                </Suspense>
            </div>
        </Card>
    )
}
