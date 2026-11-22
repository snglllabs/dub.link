import { getSession } from "@/lib/auth";
import { AuthLayout } from "@/ui/layout/auth-layout";
import { APP_DOMAIN, constructMetadata } from "@dub/utils";
import { redirect } from "next/navigation";
import RegisterPageClient from "./page-client";

export const metadata = constructMetadata({
  title: "Create your Dub account",
  canonicalUrl: `${APP_DOMAIN}/register`,
});

export default async function RegisterPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <AuthLayout showTerms="app">
      <RegisterPageClient />
    </AuthLayout>
  );
}
