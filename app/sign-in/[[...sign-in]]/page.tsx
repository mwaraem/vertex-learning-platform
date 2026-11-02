import { Suspense } from "react";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Suspense fallback={<p>Loading sign-in...</p>}>
        <SignIn />
      </Suspense>
    </div>
  );
}
