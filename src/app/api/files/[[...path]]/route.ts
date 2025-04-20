import {NextRequest, NextResponse} from "next/server"
import {getAccessToken} from "@/lib/auth"
import getFiles from "@/lib/files"

export async function GET(request: NextRequest, {params}: { params: Promise<{ path?: string[] }> }) {
    const homeAccountId = request.nextUrl.searchParams.get("id")
    if (!homeAccountId) {
        return new Response("No ID provided", {status: 400})
    }

    const accessToken = await getAccessToken(homeAccountId)
    if (!accessToken) {
        return new Response("Unauthorized", {status: 401})
    }

    const path = (await params).path
    return NextResponse.json(await getFiles(accessToken, path))
}