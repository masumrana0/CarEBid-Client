"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, message } from "antd";
import Form from "@/components/shared/inputs/Form";
import FormInput from "@/components/shared/inputs/FormInput";
import LoadingSpinner from "@/components/shared/spinners/loadingSpinner";
import { IResetPassword } from "@/Interface/auth";
import { useResetPasswordMutation } from "@/Redux/api/authApi";
import { resetPasswordSchema } from "@/schema/auth.schema";
import ReUseAbleInput from "@/components/shared/inputs/ReUseableInput";

const ResetPassword: React.FC<{ token: string }> = ({ token }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const redirectToHome = (timeout: number, path: string) => {
    setTimeout(() => {
      router.push(path);
    }, timeout);
  };
  const handleSubmit = async (data: IResetPassword) => {
    await resetPassword({ data, token })
      .then((res: any) => {
        if (res?.data?.statusCode === 200) {
          setErrorMessage(null);
          message.success("Password changed successfully. ");
          redirectToHome(3000, "/auth/signin");
          // redirectToHome(1000, "/auth/signin");
        } else {
          if (res?.error?.message == "jwt expired") {
            message.error(
              "Invalid or expired link. Please try reseting your password again.",
            );
            setErrorMessage(
              "Invalid or expired link. Please try reseting your password again.",
            );
            redirectToHome(2000, "/auth/signin");
          } else {
            message.error(res?.error?.message);
            setErrorMessage(res?.error?.message);
            redirectToHome(3000, "/auth/signin");
          }
        }
      })
      .catch(() => {
        setErrorMessage("An unexpected error occurred");
      });
  };

  return (
    <div className="min-h-screen light-darkmode flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full   relative">
        {isLoading && <LoadingSpinner />}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            Reset Password
          </h2>
          <p className="text-gray-600 mt-2">Enter your new password below.</p>
        </div>
        {errorMessage && (
          <div className="p-4 mb-4 border-l-4 bg-red-100 border-red-500 text-red-700">
            {errorMessage}
          </div>
        )}
        <Form resolver={resetPasswordSchema} submitHandler={handleSubmit}>
          <div className="mb-4">
            <ReUseAbleInput
              placeholder="Enter your new password"
              name="newPassword"
              type="password"
              label="New password"
              id="newPassword"
              required
            />
          </div>
          <div className="mb-4">
            <ReUseAbleInput
              placeholder="Enter your new confirm password"
              label="Confirm New Password"
              name="confirmNewPassword"
              type="password"
              id="confirmPassword"
              required
            />
          </div>
          <Button
            htmlType="submit"
            block
            size="large"
            loading={isLoading}
            className="w-full !bg-primary hover:!bg-green-600 !py-5 !text-black "
          >
            {isLoading ? "Reseting Password...." : "Reset Password"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
