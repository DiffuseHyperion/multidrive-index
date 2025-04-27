import AdminLoginForm from "@/app/login/_components/LoginForm"
import {Card} from "@/shadcn/components/ui/card"

export default async function AdminLoginPage() {
    return (
        <div className={"h-full flex flex-col items-center justify-center"}>
            <Card className={"p-6"}>
                <AdminLoginForm/>
            </Card>
        </div>
    )
}