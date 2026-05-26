import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userEmail = session.user.email
  const userRole = (session.user as any)?.role

  if (userRole === "admin") {
    return NextResponse.json({ visitCount: -1, locked: false, skip: true })
  }

  const user = await prisma.user.update({
    where: { email: userEmail },
    data: { visitCount: { increment: 1 } },
  })

  let locked = false
  if (user.visitCount > 10) {
    await prisma.user.update({
      where: { email: userEmail },
      data: { approved: false },
    })
    locked = true
  }

  return NextResponse.json({ visitCount: user.visitCount, locked })
}
