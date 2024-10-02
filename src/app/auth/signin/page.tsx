import SignInPage from "@/components/auth/signin";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "CarEBid || Sigin ",
  description: "Sigin page for authentication user ",
};

const SignInMainPage = () => {
  return (
    <>
      <SignInPage />
    </>
  );
};

export default SignInMainPage;
