import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/login",
  },
})

export const config = {
  matcher: ["/((?!login|register|api/auth|api/reset|_next/static|_next/image|favicon.ico|logo\\.jpg).*)"],
}
