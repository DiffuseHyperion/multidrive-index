"use client"

import {
    Column,
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable
} from "@tanstack/react-table"
import React from "react"
import {Button} from "@/shadcn/components/ui/button"
import {ArrowUpDown, EditIcon} from "lucide-react"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn/components/ui/table"
import {Account} from "@prisma/client"
import UpsertUserSheet from "@/app/admin/users/_components/UpsertUserSheet";

function SortableColumnHeader({column, name}: { column: Column<Account>, name: string }) {
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

export default function UserList({items}: { items: Account[] }) {
    const [sorting, setSorting] = React.useState<SortingState>([])

    const columns: ColumnDef<Account>[] = [
        {
            accessorKey: "name",
            header: ({column}) => (
                <SortableColumnHeader column={column} name={"Username"}/>
            ),
            cell: ({row}) => (
                <p className={"pl-3"}>{row.getValue("name")}</p>
            ),
        },
        {
            id: "actions",
            header: () => (
                <p>Actions</p>
            ),
            cell: ({row}) => (
                <div className={"flex flex-row gap-x-2"}>
                    <UpsertUserSheet defaultName={row.getValue("name")}>
                        <Button variant={"secondary"} className={"cursor-pointer"}>
                            <EditIcon/>
                            Edit Account
                        </Button>
                    </UpsertUserSheet>
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