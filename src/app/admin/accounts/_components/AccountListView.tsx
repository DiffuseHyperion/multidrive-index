import AccountsList from "@/app/admin/accounts/_components/AccountList"
import {prisma} from "@/lib/globals"

export default async function AccountListView() {
    const accounts = await prisma.mSALAccount.findMany()

    return (
        <AccountsList items={accounts}/>
    )
}