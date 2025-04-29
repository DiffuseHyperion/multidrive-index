import {MSAL, SCOPES} from "@/lib/globals"
import AccountListView from "@/app/admin/accounts/_components/AccountListView"
import {Suspense} from "react"
import {Card} from "@/shadcn/components/ui/card"
import {Skeleton} from "@/shadcn/components/ui/skeleton"
import {Button} from "@/shadcn/components/ui/button"
import {redirect} from "next/navigation"
import {PlusIcon} from "lucide-react"
import {getSession} from "@/lib/auth/session"

export default async function AdminAccount() {
    const session = await getSession()
    if (!session.isLoggedIn) {
        redirect("/login?redirect=/admin/accounts")
    }

    return (
        <div className={"flex-grow flex flex-col gap-y-2"}>
            <div className={"flex flex-row items-center justify-between"}>
                <p>Accounts List</p>
                <form action={async () => {
                    "use server"
                    const url = await MSAL.getAuthCodeUrl({
                        scopes: SCOPES,
                        redirectUri: `${process.env.REDIRECT_URL!}/api/auth/callback`,
                    })
                    redirect(url)
                }}>
                    <Button type={"submit"} variant={"secondary"} className={"cursor-pointer"}>
                        <PlusIcon/>
                        Add Account
                    </Button>
                </form>
            </div>
            <Card className={"p-6 flex-grow flex flex-col"}>
                <Suspense fallback={<Skeleton className={"flex-grow"}/>}>
                    <AccountListView/>
                </Suspense>
            </Card>
        </div>
    )
}