import {NextResponse} from "next/server"
import {getListedGenericFiles} from "@/lib/files"

// request argument required or params will be undefined lol
export async function GET(_: Request, {params}: { params: Promise<{ accountId: string, path?: string[] }> }) {
    const {accountId, path} = await params

    const {data, error} = await getListedGenericFiles(accountId, path)
    if (!data) return new Response("An error occured", {status: error})

    return NextResponse.json(data)
}