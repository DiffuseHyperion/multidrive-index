import React, {Suspense} from "react"
import Breadcrumbs from "@/app/[accountId]/[[...path]]/_components/Breadcrumbs"
import ViewTypeSelect from "@/app/[accountId]/[[...path]]/_components/ViewTypeSelect"
import FilesView from "@/app/[accountId]/[[...path]]/_components/FilesView"
import {Card, CardHeader} from "@/shadcn/components/ui/card"

export default async function AccountPage({params}: { params: Promise<{ accountId: string, path?: string[] }> }) {
    const {accountId, path} = await params

    return (
        <div className={"flex flex-col gap-y-2"}>
            <div className={"flex flex-row justify-between items-center"}>
                <Breadcrumbs accountId={accountId} path={path}/>
                <ViewTypeSelect/>
            </div>
            <Card>
                <CardHeader>
                    <Suspense>
                        <FilesView accountId={accountId} path={path}/>
                    </Suspense>
                </CardHeader>
            </Card>
        </div>
    )
}
