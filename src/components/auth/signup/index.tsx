"use client";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { ISignUpData } from "@/Interface/auth";
import { useSignupMutation } from "@/Redux/api/authApi";
import AuthWithThirdPerty from "../authWithThirdPerty";
import SignupEmail from "./SignupEmail";
import ReUseAbleInput from "@/components/shared/inputs/ReUseableInput";
import { SignUpSchema } from "@/schema/auth.schema";


interface ISignUpFormValues {
  password: string;
  confirmPassword: string;
  name: string;
}

const SignUpPage: React.FC<{ setAuthState: React.Dispatch<SetStateAction<number>> }> = ({ setAuthState }) => {
  const [isNext, setNext] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpFormValues>({
    resolver: yupResolver(SignUpSchema),
  });

  // Redux signup mutation hook
  const [signup, { isLoading }] = useSignupMutation();

  // Submit handler
  const onSubmit = (data: ISignUpFormValues) => {

    if (isNext) {
      console.log({ ...data, email: email })
      // Proceed with signup
      signup({ ...data, email: email } as ISignUpData)
        .unwrap()
        .then((res: any) => {
          const { token, user } = res?.data;
          message.success(res?.message || "Account created successfully.");
          router.push("/"); // Redirect to homepage
        })
        .catch((error: any) => {
          const errorMessage = error?.message || "An unexpected error occurred.";
          message.error(errorMessage);
        });
    }
  };

  return (
    <div>
      <h2 className="font-bold xl:text-3xl text-center">Sign up</h2>

      {!isNext && (
        <>
          <p className="mb-3 text-md md:text-lg my-3 text-center">
            Already have an account?{" "}
            <button onClick={() => setAuthState(1)} className="text-primary">Sign in here</button>
          </p>

          {/* Third-party authentication */}
          <AuthWithThirdPerty />
        </>
      )}

      {isNext ? (
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="text-left">
            {/* Password Input */}
            <div className="mb-4">
              <ReUseAbleInput
                label="Password"
                name="password"
                type="password"
                validation={errors}
                register={register}
                placeholder="Create a password..."
                icon={<LockOutlined />}
                className="hover:border-primary border-gray-400"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="mb-4">
              <ReUseAbleInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                validation={errors}
                register={register}
                placeholder="Confirm your password..."
                icon={<LockOutlined />}
                className="hover:border-primary border-gray-400"
              />
            </div>

            {/* Name Input */}
            <div className="my-4">
              <ReUseAbleInput
                name="name"
                validation={errors}
                register={register}
                label="Username (public name others see)"
                placeholder="Create a username..."
                icon={<UserOutlined />}
                className="hover:border-primary border-gray-400"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            htmlType="submit"
            block
            size="large"
            loading={isLoading}
            className="!bg-green-500 hover:!bg-green-600 !text-black"
          >
            {isLoading ? "Creating account...." : "Create account"}
          </Button>

          {/* Terms and Privacy */}
          <p className="text-xs text-gray-500 mt-4">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-green-500">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-green-500">
              Privacy Policy
            </a>
            .
          </p>

          {/* Help Link */}
          <div className="mt-4 text-center">
            <a href="#" className="text-green-500 text-sm">
              Need help?
            </a>
          </div>
        </form>
      ) : (
        <SignupEmail setEmail={setEmail} setNext={setNext} />
      )}
    </div>
  );
};

export default SignUpPage;
