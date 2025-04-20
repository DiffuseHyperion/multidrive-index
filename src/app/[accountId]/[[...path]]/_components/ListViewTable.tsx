"use client"

import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table"
import React from "react"
import {redirect} from "next/navigation"
import {formatBytes, getIcon} from "@/lib/utils"

export type ListedItem = {
    name: string
    type: string,
    lastModified: Date
    size?: number
    href: string
}

const columnHelper = createColumnHelper<ListedItem>()

const columns = [
    columnHelper.accessor("name", {
        header: () => <p className={"text-left"}>Name</p>,
        cell: (ctx) => (
            <div className={"flex flex-row gap-x-2"}>
                {getIcon(ctx.row.getValue("type"))}
                <p>{ctx.getValue()}</p>
            </div>
        ),
    }),
    columnHelper.accessor("type", {
        header: () => <p className={"text-left"}>Type</p>,
    }),
    columnHelper.accessor("lastModified", {
        header: () => <p className={"text-left"}>Last Modified</p>,
        cell: (ctx) => <p suppressHydrationWarning>{ctx.getValue().toLocaleString()}</p>,
    }),
    columnHelper.accessor("size", {
        header: () => <p className={"text-left"}>Size</p>,
        cell: (ctx) => <p>{ctx.getValue() ? formatBytes(ctx.getValue()!, 2) : "-"}</p>,
    }),
    columnHelper.accessor("href", {
        header: () => null, // lmao
        cell: () => null,
    }),
]

export default function ListViewTable({items}: { items: ListedItem[] }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [data, _setData] = React.useState(() => [...items])

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <table className={"w-full"}>
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map(row => (
                <tr key={row.id} className={"cursor-pointer hover:bg-accent"}
                    onClick={() => redirect(row.getValue("href"))}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    )
}
