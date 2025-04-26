import React, {Suspense} from "react"
import Breadcrumbs from "@/app/[accountId]/[[...path]]/_components/Breadcrumbs"
import ViewTypeSelect from "@/app/[accountId]/[[...path]]/_components/ViewTypeSelect"
import FilesView from "@/app/[accountId]/[[...path]]/_components/FilesView"
import {Card} from "@/shadcn/components/ui/card"
import {Skeleton} from "@/shadcn/components/ui/skeleton"

export default async function AccountPage({params}: { params: Promise<{ accountId: string, path?: string[] }> }) {
    const {accountId, path} = await params

    return (
        <div className={"py-10 flex flex-col gap-y-2"}>
            <div className={"flex flex-row justify-between items-center"}>
                <Breadcrumbs accountId={accountId} path={path}/>
                <ViewTypeSelect/>
            </div>
            <Card>
                <div className={"px-6"}>
                    <Suspense fallback={<Skeleton />}>
                        <FilesView accountId={accountId} path={path}/>
                    </Suspense>
                </div>
            </Card>
        </div>
    )
}
