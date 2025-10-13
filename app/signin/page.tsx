import { Suspense } from "react";
import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
      <SignInForm />
    </Suspense>
  );
}
