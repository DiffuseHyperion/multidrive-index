"use client"

import {z} from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shadcn/components/ui/form"
import {Input} from "@/shadcn/components/ui/input"
import {Button} from "@/shadcn/components/ui/button"
import login from "@/lib/auth/login"
import {redirect} from "next/navigation"
import {toast} from "sonner"

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Username is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
})

export default function AdminLoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const {name, password} = values

        const hasher = window.crypto.subtle
        const encoder = new TextEncoder()

        const hashArray = new Uint8Array(await hasher.digest("SHA-256", encoder.encode(password + "multidrive-index")))
        const hashString = Array.from(hashArray).map(byte => byte.toString(16).padStart(2, "0")).join("")
        const success = await login(name, hashString)

        if (success) {
            redirect("/admin")
        } else {
            toast("Invalid credentials.")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8"}>
                <FormField
                    control={form.control}
                    name={"name"}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"password"}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type={"password"} {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type={"submit"} className={"cursor-pointer"}>Login</Button>
            </form>
        </Form>
    )
}