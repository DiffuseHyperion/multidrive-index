import {paramPathToFullPath} from "@/lib/utils"
import React from "react"
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator} from "@/shadcn/components/ui/breadcrumb"

export default async function Breadcrumbs({accountId, path}: { accountId: string, path?: string[] }) {
    const breadcrumbRawItems = [{
        name: "Root",
        redirect: `/${accountId}`,
    }, ...(path || []).map((item, index) => {
        const redirectPath = `/${accountId}${paramPathToFullPath(path!.slice(0, index + 1))}`
        return {
            name: item,
            redirect: redirectPath,
        }
    })]

    // have to put into a function or nextjs will complain about keys
    async function getBreadcrumbItem(index: number, name: string, redirect: string) {
        if (index === breadcrumbRawItems.length - 1) {
            return (
                <BreadcrumbItem key={name}>
                    <BreadcrumbLink href={redirect}>{name}</BreadcrumbLink>
                </BreadcrumbItem>
            )
        }
        return (
            <>
                <BreadcrumbItem key={name}>
                    <BreadcrumbLink href={redirect}>{name}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
            </>
        )
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbRawItems.map(({name, redirect}, index) => getBreadcrumbItem(index, name, redirect))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}