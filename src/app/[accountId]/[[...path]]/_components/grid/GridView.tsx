"use client"

import {ListedItem} from "@/app/[accountId]/[[...path]]/_components/ClientFilesView"
import {Card} from "@/shadcn/components/ui/card"
import {formatBytes, getIcon} from "@/lib/utils"
import Link from "next/link"

export default function GridView({items}: { items: ListedItem[] }) {
    return (
        <div className={"grid gap-4 grid-cols-[repeat(auto-fill,minmax(150px,1fr))]"}>
            {items.map((item) => (
                <Link key={item.key} href={item.href}>
                    <Card className={"aspect-square w-36"}>
                        <div className={"h-full flex flex-col items-center justify-center text-center"}>
                            {getIcon(item.type)}
                            <p>{item.name}</p>
                            <p>{item.size ? formatBytes(item.size, 2) : "-"}</p>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    )
}