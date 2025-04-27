import Link from "next/link"
import NavbarAdminButton from "@/app/_components/NavbarAdminButton"
import {Suspense} from "react"

export default async function Navbar() {
    return (
        <div className={"w-full sticky top-0 bg-background border-b-2 border-secondary h-12 py-1 flex flex-row items-center justify-center"}>
            <div className={"w-full max-w-320 px-8 flex flex-row items-center justify-between"}>
                <Link href={"/"}>MultiDrive Index</Link>
                <Suspense>
                    <NavbarAdminButton/>
                </Suspense>
            </div>
        </div>
    )
}