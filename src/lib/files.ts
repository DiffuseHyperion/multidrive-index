export default async function listFiles(accessToken: string, path: string[]) {
    const response = await fetch("https://graph.microsoft.com/v1.0/me/drive/root/children", {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        }
    })
}