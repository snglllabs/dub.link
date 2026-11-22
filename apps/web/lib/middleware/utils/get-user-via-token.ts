import { UserProps } from "@/lib/types";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

// Keep this in sync with `cookies.sessionToken.name` in lib/auth/options.ts.
// Without an explicit cookieName, getToken() defaults to the `__Secure-` prefixed
// cookie whenever the request looks secure, which never matches the cookie the app
// actually sets on self-hosted (non-Vercel) deployments. That mismatch makes the
// middleware treat authenticated users as logged out and causes a /login <-> /
// redirect loop with the login page's session check.
const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

export async function getUserViaToken(req: NextRequest) {
  const session = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
  })) as {
    email?: string;
    user?: UserProps;
  };

  return session?.user;
}
