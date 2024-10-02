import React from "react";
import { Metadata } from "next";
import SignUpPage from "@/components/auth/signup";

export const metadata: Metadata = {
  title: "CarEBid || Signup ",
  description: "Signup page for authentication",
};

const SigninUpPage = () => {
  return (
    <>
      <SignUpPage />
    </>
  );
};

export default SigninUpPage;
