"use client"

import {Column, ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn/components/ui/table"
import {formatBytes, formatDate, getIcon} from "@/lib/utils"
import React from "react"
import {redirect} from "next/navigation"
import {ArrowUpDown} from "lucide-react"
import {Button} from "@/shadcn/components/ui/button"
import {ListedGenericFile} from "@/lib/files"

function SortableColumnHeader({column, name}: { column: Column<ListedGenericFile>, name: string }) {
    return (
        <Button
            variant={"ghost"}
            className={"cursor-pointer"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            <p>{name}</p>
            <ArrowUpDown/>
        </Button>
    )
}

export const columns: ColumnDef<ListedGenericFile>[] = [
    {
        accessorKey: "name",
        header: ({column}) => (
            <SortableColumnHeader column={column} name={"Name"}/>
        ),
        cell: ({row}) => (
            // left padding is 2 instead of 3 due to existing padding in icons
            <div className={"flex flex-row items-center gap-x-2 pl-2"}>
                {getIcon(row.getValue("mimeType"))}
                <p>{row.getValue("name")}</p>
            </div>
        ),
    },
    {
        accessorKey: "mimeType",
        header: ({column}) => (
            <SortableColumnHeader column={column} name={"Type"}/>
        ),
        cell: ({row}) => (
            <p className={"pl-3"}>{row.getValue("mimeType") ? row.getValue("mimeType") : "Folder"}</p>
        ),
    },
    {
        accessorKey: "lastModified",
        header: ({column}) => (
            <SortableColumnHeader column={column} name={"Last Modified"}/>
        ),
        cell: ({row}) => (
            <p className={"pl-3"}>{formatDate(row.getValue("lastModified") as Date)}</p>
        ),
    },
    {
        accessorKey: "size",
        header: ({column}) => (
            <SortableColumnHeader column={column} name={"Size"}/>
        ),
        cell: ({row}) => (
            <p className={"pl-3"}>{row.getValue("size") ? formatBytes(row.getValue("size")!, 2) : "-"}</p>
        ),
    },
    {
        accessorKey: "path",
        header: () => null,
        cell: () => null,
    },
]

export default function ListView({items}: { items: ListedGenericFile[] }) {
    const [sorting, setSorting] = React.useState<SortingState>([])

    const data = items // variable name must be "data" :moyai:
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    })

    return (
        <div className={"rounded-md border"}>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className={"cursor-pointer"}
                                onClick={() => redirect(row.getValue("path"))}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className={"h-24 text-center"}>
                                Folder is empty.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
