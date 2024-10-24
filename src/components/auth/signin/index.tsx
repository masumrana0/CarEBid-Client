"use client";
import React, { useState, useCallback, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { Button, message } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISigninData } from "@/Interface/auth";
import { useSigninMutation } from "@/Redux/api/authApi";
import { useAppDispatch } from "@/Redux/hooks";
import { setIsLoggedIn, setProfileInfo } from "@/Redux/Slices/authSlice";
import { signInSchema } from "@/schema/auth.schema";
import AuthWithThirdPerty from "../authWithThirdPerty";
import ReUseAbleInput from "@/components/shared/inputs/ReUseableInput";

// SignInPage Component
const SignInPage: React.FC<{
  setAuthState: React.Dispatch<SetStateAction<number>>;
}> = ({ setAuthState }) => {
  const [signin, { isLoading }] = useSigninMutation();
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Initialize the form using react-hook-form and yup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISigninData>({
    resolver: yupResolver(signInSchema),
  });

  // Handle sign-in process
  const handleSignIn = useCallback(
    async (data: ISigninData) => {
      try {
        const response = await signin(data).unwrap();

        if (response?.statusCode === 200) {
          const { token, user } = response.data;

          // Set token and profile info in Redux store
          dispatch(setIsLoggedIn(token?.accessToken));
          dispatch(setProfileInfo(user));

          message.success(response?.message);

          // Redirect after successful sign-in
          router.push("/");
        } else {
          setValidationMessage("An unexpected error occurred.");
        }
      } catch (error: any) {
        console.log(error);
        const errorMsg = error?.message || "Sign-in failed. Please try again.";
        message.error(errorMsg);
        setValidationMessage(errorMsg);
      }
    },
    [signin, dispatch, router],
  );

  // Render the component
  return (
    <div className="flex items-center justify-center relative">
      <div>
        <h2 className="font-bold text-dark text-3xl text-center mb-2">
          Sign In
        </h2>
        <p className="text-lg text-center mb-6">
          Need to create an account?{" "}
          <button className="text-primary" onClick={() => setAuthState(1)}>
            Sign up here
          </button>
        </p>

        <AuthWithThirdPerty />

        {/* Sign-in Form */}
        <form onSubmit={handleSubmit(handleSignIn)}>
          {/* Email Input */}
          <div className="mb-4">
            <ReUseAbleInput
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="px-1 hover:border-primary border-gray-400"
              validation={errors}
              register={register}
            />
          </div>

          {/* Password Input */}
          <div className="mb-2">
            <ReUseAbleInput
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              className="px-1 hover:border-primary border-gray-400"
              validation={errors}
              register={register}
            />
          </div>

          <div className="mb-3">
            <button
              onClick={() => setAuthState(3)}
              className="underline text-md text-primary"
            >
              Forgot password?
            </button>
          </div>

          {/* Validation Message */}
          {validationMessage && (
            <p className="text-red-500 my-2 text-sm md:text-md">
              {validationMessage}
            </p>
          )}

          {/* Submit Button */}
          <div className="mb-5">
            <Button
              loading={isLoading}
              htmlType="submit"
              className="w-full !bg-primary hover:!bg-green-600 !py-5 !text-black "
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
