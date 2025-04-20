import {paramPathToFullPath} from "@/lib/utils"
import {ChevronRightIcon} from "lucide-react"
import React from "react"

function BreadcrumbsWrapper({children}: { children: React.ReactNode }) {
    return (
        <div className={`flex flex-row`}>
            {children}
        </div>
    )
}


export default async function Breadcrumbs({params}: { params: Promise<{ accountId: string, path?: string[] }> }) {
    const {accountId, path} = await params

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
                <a key={name} href={redirect}>{name}</a>
            )
        }
        return (
            <>
                <a key={name} href={redirect}>{name}</a>
                <ChevronRightIcon key={`${name}-separator`}/>
            </>
        )
    }

    return (
        <BreadcrumbsWrapper>
            {breadcrumbRawItems.map(({name, redirect}, index) => getBreadcrumbItem(index, name, redirect))}
        </BreadcrumbsWrapper>
    )
}