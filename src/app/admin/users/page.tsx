import {Suspense} from "react"
import {Card, CardHeader} from "@/shadcn/components/ui/card"
import {Skeleton} from "@/shadcn/components/ui/skeleton"
import {Button} from "@/shadcn/components/ui/button"
import {PlusIcon} from "lucide-react"
import {requireSession} from "@/lib/auth/session"
import UserListView from "@/app/admin/users/_components/UserListView";

export default async function AdminUsers() {
    await requireSession("/admin/users")

    return (
        <div className={"flex-grow flex flex-col gap-y-2"}>
            <div className={"flex flex-row items-center justify-between"}>
                <p>Admin Users List</p>
                <Button type={"submit"} variant={"secondary"} className={"cursor-pointer"}>
                    <PlusIcon/>
                    Add Account
                </Button>
            </div>
            <Card className={"flex-grow flex flex-col"}>
                <CardHeader>
                    <Suspense fallback={<Skeleton className={"flex-grow"}/>}>
                        <UserListView/>
                    </Suspense>
                </CardHeader>
            </Card>
        </div>
    )
}