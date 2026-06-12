import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST() {
  const { count } = await prisma.user.deleteMany()
  return NextResponse.json({ message: `Deleted ${count} user(s)` })
}
