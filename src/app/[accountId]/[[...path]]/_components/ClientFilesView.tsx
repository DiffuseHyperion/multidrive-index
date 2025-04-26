"use client"

import {useViewTypeStore} from "@/hooks/stores"
import ListView from "@/app/[accountId]/[[...path]]/_components/list/ListView"
import GridView from "@/app/[accountId]/[[...path]]/_components/grid/GridView"
import {ListedGenericFile} from "@/lib/files"

export default function ClientFilesView({listedItems}: { listedItems: ListedGenericFile[] }) {
    const {viewType} = useViewTypeStore()

    switch (viewType) {
        case "list":
            return <ListView items={listedItems}/>
        case "grid":
            return <GridView items={listedItems}/>
    }
}