import {prisma} from "@/lib/globals"
import UserList from "@/app/admin/users/_components/UserList";

export default async function UserListView() {
    const accounts = await prisma.account.findMany()

    return (
        <UserList items={accounts}/>
    )
}