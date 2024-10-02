import React from "react";
import ResetPassword from "@/components/auth/resetPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CarEBid || reset-password ",
  description: "Reset password",
};
const ResetPasswordPage: React.FC = ({ params }: any) => {
  const { token } = params;
  return (
    <>
      <ResetPassword token={token as string} />
    </>
  );
};

export default ResetPasswordPage;
