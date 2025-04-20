import {NextRequest, NextResponse} from "next/server"
import {getAccessToken} from "@/lib/auth"
import getFiles from "@/lib/files"

export async function GET(request: NextRequest, {params}: { params: Promise<{ accountId: string, path?: string[] }> }) {
    const {accountId, path} = await params
    if (!accountId) {
        return new Response("No ID provided", {status: 400})
    }

    const accessToken = await getAccessToken(accountId)
    if (!accessToken) {
        return new Response("Unauthorized", {status: 401})
    }

    return NextResponse.json(await getFiles(accessToken, path))
}