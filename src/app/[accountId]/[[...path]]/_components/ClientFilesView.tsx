"use client"

import {useViewTypeStore} from "@/hooks/stores"
import ListView from "@/app/[accountId]/[[...path]]/_components/list/ListView"
import GridView from "@/app/[accountId]/[[...path]]/_components/grid/GridView"

export type ListedItem = {
    name: string
    key: string
    type: string,
    lastModified: Date
    size?: number
    href: string
}

export default function ClientFilesView({listedItems}: {listedItems: ListedItem[]}) {
    const {viewType} = useViewTypeStore()

    switch (viewType) {
        case "list":
            return <ListView items={listedItems}/>
        case "grid":
            return <GridView items={listedItems}/>
    }
}