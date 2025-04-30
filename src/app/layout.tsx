import type {Metadata} from "next"
import {Geist, Geist_Mono} from "next/font/google"
import "./globals.css"
import {ThemeProvider} from "@/shadcn/components/ThemeProvider"
import {Toaster} from "@/shadcn/components/ui/sonner"
import AppNavbar from "@/app/_components/AppNavbar"
import {SidebarProvider} from "@/shadcn/components/ui/sidebar"
import AppSidebar from "@/app/_components/AppSidebar"
import {cookies} from "next/headers"
import {getSession} from "@/lib/auth/session"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "MultiDrive Index",
    description: "Turn your OneDrive into a public file-sharing website!",
}

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    const session = await getSession()

    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true" && session.isLoggedIn

    return (
        <html lang={"en"} className={"min-h-screen flex flex-col"} suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex-grow flex flex-col`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SidebarProvider defaultOpen={defaultOpen}>
                <AppSidebar/>
                <main className={"flex-grow flex flex-col"}>
                    <AppNavbar/>
                    <div className={"py-4 flex-grow flex flex-row justify-center"}>
                        <div className={"w-full max-w-320 px-8 flex-grow flex flex-col"}>
                            {children}
                        </div>
                    </div>
                </main>
            </SidebarProvider>
            <Toaster/>
        </ThemeProvider>
        </body>
        </html>
    )
}
