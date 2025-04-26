"use client"

import {useViewTypeStore} from "@/hooks/stores"
import React from "react"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shadcn/components/ui/select"
import {GridIcon, ListIcon} from "lucide-react"


export default function ViewTypeSelect() {
    const {viewType, setViewType} = useViewTypeStore()

    return (
        <Select value={viewType} defaultValue={viewType} onValueChange={setViewType}>
            <SelectTrigger className="w-64">
                <SelectValue/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="list"><ListIcon/>List</SelectItem>
                <SelectItem value="grid"><GridIcon/>Grid</SelectItem>
            </SelectContent>
        </Select>

    )
}