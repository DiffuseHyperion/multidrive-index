import {readAccounts} from "@/lib/database/Accounts"
import {redirect} from "next/navigation"

export default async function Home() {
    const accounts = await readAccounts()
    if (accounts.length === 0) {
        redirect("/admin")
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
