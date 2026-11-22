import { getSession } from "@/lib/auth";
import LoginForm from "@/ui/auth/login/login-form";
import { AuthLayout } from "@/ui/layout/auth-layout";
import { APP_DOMAIN, constructMetadata } from "@dub/utils";
import { redirect } from "next/navigation";

export const metadata = constructMetadata({
  title: "Sign in to Dub",
  canonicalUrl: `${APP_DOMAIN}/login`,
});

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <AuthLayout showTerms="app">
      <div className="w-full max-w-sm">
        <h3 className="text-center text-xl font-semibold">
          Log in to your Dub account
        </h3>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </AuthLayout>
  );
}
