import {notFound} from "next/navigation"
import {getListedGenericFiles} from "@/lib/files"
import ClientFilesView from "@/app/[accountId]/[[...path]]/_components/ClientFilesView"
import React from "react"
import MarkdownViewer from "@/app/[accountId]/[[...path]]/_components/MarkdownViewer"
import {Card, CardContent, CardHeader, CardTitle} from "@/shadcn/components/ui/card"

export default async function FilesView({accountId, path}: { accountId: string, path?: string[] }) {
    const {data} = await getListedGenericFiles(accountId, path)
    if (!data) notFound()

    const readmeList = data.filter((file) => file.name == "README.md")
    const readme = readmeList ? readmeList[0] : null

    if (readme) {
        return (
            <>
                <ClientFilesView listedItems={data}/>
                <Card>
                    <CardHeader>
                        <CardTitle>README.md</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <MarkdownViewer file={readme}/>
                    </CardContent>
                </Card>
            </>
        )
    }

    return (
        <ClientFilesView listedItems={data}/>
    )
}