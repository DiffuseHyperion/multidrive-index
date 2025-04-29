import {readAccounts} from "@/lib/database/MSALAccounts"
import {redirect} from "next/navigation"

export default async function Home() {
    const accounts = (await readAccounts()).filter((account) => account.visible)
    if (accounts.length === 0) {
        redirect("/admin/accounts")
    } else if (accounts.length === 1) {
        redirect(`/${accounts[0].homeAccountId}`)
    }

    return (
        <div>
            <p>Account Selection Page</p>
            <p>Select account:</p>
            <div>
                {accounts.map((account) => (
                    <p key={account.homeAccountId}>{account.name}</p>
                ))}
            </div>
        </div>
    )
}
