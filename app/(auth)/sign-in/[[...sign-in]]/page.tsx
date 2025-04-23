import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return (
    <main className="flex w-full h-[100vh] justify-center items-center">
      <SignIn />
    </main>
  );
};

export default SignInPage;
