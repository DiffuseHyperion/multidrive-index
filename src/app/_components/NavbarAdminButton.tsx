import {getSession} from "@/lib/auth/session"
import {SidebarTrigger} from "@/shadcn/components/ui/sidebar"

export default async function NavbarAdminButton() {
    const session = await getSession()
    if (!session.isLoggedIn) {
        return null
    }

    return (
        <SidebarTrigger/>
    )
}