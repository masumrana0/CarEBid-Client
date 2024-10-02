"use client";

import React, { SetStateAction, useState } from "react";
import { Button, message } from "antd";
import ReUseAbleInput from "@/components/shared/inputs/ReUseableInput";
import { useForgotPasswordMutation } from "@/Redux/api/authApi";
import { MdMailOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define validation schema for the form
const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPassword: React.FC<{ setAuthState: React.Dispatch<SetStateAction<number>> }> = ({ setAuthState }) => {
  const [forgotPassword, { isLoading, isError }] = useForgotPasswordMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize the form handler with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  // Handle form submission
  const onSubmit = async (data: { email: string }) => {
    setErrorMessage(null);

    try {
      const res: any = await forgotPassword(data).unwrap();

      if (res?.statusCode === 200) {
        message.success("Please check your email inbox.");
        setErrorMessage('Please check your email inbox.')
        reset(); // Reset the form on successful submission
      }
    } catch (error: any) {

      message.error(error.message);
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="p-3 w-full">
      <div className="mb-3 text-center">
        <h2 className="text-3xl font-bold text-gray-900 ">Forgot Password</h2>
        <button className="text-md text-primary my-1" onClick={() => setAuthState(3)}>
          Back to Sign In
        </button>
        <p className="text-gray-600 mt-2">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      {/* Display error message */}
      {errorMessage && (
        <div
          className={`p-4 mb-4 border-l-4 ${ isError ? "bg-red-100 border-red-500 text-red-700" : "bg-green-100 border-green-500 text-green-700"
            }`}
        >
          {errorMessage}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <ReUseAbleInput
            className="hover:border-primary border-gray-400"
            icon={<MdMailOutline />}
            type="email"
            id="email"
            name="email"
            label="Email Address"
            placeholder="Enter your account email"
            register={register}

          />
        </div>

        {/* Submit button */}
        <div className="flex items-center justify-between">
          <Button
            className="w-full !bg-primary hover:!bg-green-600 !py-5 !text-black"
            key="submit"
            type="primary"
            loading={isLoading}
            htmlType="submit"
          >
            Send Reset Link
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
