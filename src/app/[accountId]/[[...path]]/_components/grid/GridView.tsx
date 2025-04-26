"use client"

import {ListedItem} from "@/app/[accountId]/[[...path]]/_components/ClientFilesView"
import {formatBytes, getIcon} from "@/lib/utils"
import Link from "next/link"
import {Button} from "@/shadcn/components/ui/button"

export default function GridView({items}: { items: ListedItem[] }) {
    return (
        <div className={"grid gap-4 grid-cols-[repeat(auto-fill,minmax(150px,1fr))]"}>
            {items.map((item) => (
                <Button key={item.key} asChild variant={"outline"} className={"w-36 h-36"}>
                    <Link href={item.href}>
                        <div className={"h-full flex flex-col items-center justify-center text-center"}>
                            {getIcon(item.type)}
                            <p className={"text-wrap"}>{item.name}</p>
                            <p>{item.size ? formatBytes(item.size, 2) : "-"}</p>
                        </div>
                    </Link>
                </Button>
            ))}
        </div>
    )
}