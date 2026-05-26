import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { name, email, password, howFound, reason } = await request.json()

    if (!name || !email || !password || !howFound || !reason) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      )
    }

    const totalUsers = await prisma.user.count()

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        howFound,
        reason,
        approved: totalUsers === 0,
        role: totalUsers === 0 ? "admin" : "user",
      },
    })

    return NextResponse.json({
      message:
        totalUsers === 0
          ? "Admin account created. You can now log in."
          : "Registration submitted. Waiting for admin approval.",
      isAdmin: totalUsers === 0,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}
