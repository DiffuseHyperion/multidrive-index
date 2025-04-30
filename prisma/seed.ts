import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
     await prisma.account.upsert({
        where: { name: "admin" },
        update: {},
        create: {
            name: "admin",
            hash: "4ca58bd136d797adb9000abaf9a35407a580a0b915fb9a735dd9a757d77ef125" // "admin"
        },
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })