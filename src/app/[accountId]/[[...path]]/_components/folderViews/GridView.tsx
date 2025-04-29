"use client"

import {formatBytes, getIcon} from "@/lib/utils"
import Link from "next/link"
import {Button} from "@/shadcn/components/ui/button"
import {ListedGenericFile} from "@/lib/files"

export default function GridView({items}: { items: ListedGenericFile[] }) {
    if (items.length) {
        return (
            <div className={"flew-grow grid gap-4 grid-cols-[repeat(auto-fill,minmax(150px,1fr))]"}>
                {items.map((item) => (
                    <Button key={item.key} asChild variant={"outline"} className={"w-36 h-36"}>
                        <Link href={item.path}>
                            <div className={"h-full flex flex-col items-center justify-center text-center"}>
                                {getIcon(item.mimeType)}
                                <p className={"text-wrap"}>{item.name}</p>
                                <p>{item.size ? formatBytes(item.size, 2) : "-"}</p>
                            </div>
                        </Link>
                    </Button>
                ))}
            </div>
        )
    }

    return (
        <p className={"flex-grow flex flex-col items-center justify-center"}>Folder is empty.</p>
    )
}