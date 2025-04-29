"use client"

import {Column, ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable} from "@tanstack/react-table"
import React from "react"
import {Button} from "@/shadcn/components/ui/button"
import {ArrowUpDown, CheckIcon, EyeIcon, EyeOffIcon, SquareArrowOutUpRightIcon, XIcon} from "lucide-react"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn/components/ui/table"
import {upsertAccount} from "@/lib/database/MSALAccounts"
import {redirect, useRouter} from "next/navigation"
import {MSALAccount} from "@prisma/client"

function SortableColumnHeader({column, name}: { column: Column<MSALAccount>, name: string }) {
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

export default function AccountsList({items}: { items: MSALAccount[] }) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const router = useRouter()

    const columns: ColumnDef<MSALAccount>[] = [
        {
            accessorKey: "name",
            header: ({column}) => (
                <SortableColumnHeader column={column} name={"Name"}/>
            ),
            cell: ({row}) => (
                <p className={"pl-3"}>{row.getValue("name")}</p>
            ),
        },
        {
            accessorKey: "homeAccountId",
            header: ({column}) => (
                <SortableColumnHeader column={column} name={"Home Account ID"}/>
            ),
            cell: ({row}) => (
                <p className={"pl-3"}>{row.getValue("homeAccountId")}</p>
            ),
        },
        {
            accessorKey: "visible",
            header: ({column}) => (
                <SortableColumnHeader column={column} name={"Visible"}/>
            ),
            cell: ({row}) => (
                <p className={"pl-3"}>{row.getValue("visible") ? <CheckIcon/> : <XIcon/>}</p>
            ),
        },
        {
            id: "actions",
            header: () => (
                <p>Actions</p>
            ),
            cell: ({row}) => (
                <div className={"flex flex-row gap-x-2"}>
                    <Button variant={"secondary"} className={"cursor-pointer"} onClick={async () => {
                        await upsertAccount(row.getValue("homeAccountId"), row.getValue("name"), !row.getValue("visible"))
                        router.refresh()
                    }}>
                        {row.getValue("visible") ? <EyeOffIcon/> : <EyeIcon/>}
                    </Button>
                    <Button variant={"secondary"} className={"cursor-pointer"} onClick={() => {
                        redirect(`/${row.getValue("homeAccountId")}`)
                    }}>
                        {<SquareArrowOutUpRightIcon/>}
                    </Button>
                </div>
            ),
        },
    ]

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
                                No accounts found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}