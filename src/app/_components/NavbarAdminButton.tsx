import {getSession} from "@/lib/auth/session"
import {Button} from "@/shadcn/components/ui/button"
import Link from "next/link"
import {LogInIcon} from "lucide-react"

export default async function NavbarAdminButton() {
    const session = await getSession()
    if (!session.isLoggedIn) {
        return null
    }

    return (
        <Button asChild variant={"ghost"}>
            <Link href={"/admin"}>
                <LogInIcon/>
            </Link>
        </Button>
    )
}