import { PrismaClient } from "@prisma/client"
import { PrismaLibSql } from "@prisma/adapter-libsql"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  const useTurso = process.env.TURSO_DATABASE_URL
  const config: { url: string; authToken?: string } = {
    url: useTurso || "file:./dev.db",
  }
  if (useTurso) {
    config.authToken = process.env.TURSO_AUTH_TOKEN
  }

  const adapter = new PrismaLibSql(config)
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
