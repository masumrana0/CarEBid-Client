"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useVerifyEmailMutation } from "@/Redux/api/authApi";
import { message } from "antd";
import SmallSpinner from "@/components/shared/spinners/smallLoadingSpinner";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { IUser } from "@/Interface/user";
import { setProfileInfo } from "@/Redux/Slices/authSlice";
import LoadingSpinner from "@/components/shared/spinners/loadingSpinner";

const EmailVerification: React.FC<{ token: string }> = ({ token }) => {
  const [emailVerificationLink, { isLoading, isError }] =
    useVerifyEmailMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const previousProfileData = useAppSelector(
    (state) => state.authReducer.profile,
  ) as IUser;
  const updatedProfileData = { ...previousProfileData, isEmailVerified: true };

  useEffect(() => {
    const verifyEmail = async () => {
      await emailVerificationLink(token as string)
        .unwrap()
        .then((res: any) => {
          if (res?.statusCode === 200) {
            dispatch(setProfileInfo(updatedProfileData));
            setErrorMessage(
              "Congratulations! Your email has been successfully verified.",
            );
            redirectToHome(4000);
          } else {
            if (res?.error?.message == "jwt expired") {
              message.error("Invalid or expired link. Please try  again.");
              setErrorMessage("Invalid or expired link. Please try  again.");
            } else {
              message.error(res?.error?.message);
              setErrorMessage(res?.error?.message);
            }
            redirectToHome(3000);
          }
        })
        .catch(() => {
          setErrorMessage("An unexpected error occurred");
          redirectToHome(3000);
        });
    };

    const redirectToHome = (timeout: number) => {
      setTimeout(() => {
        router.push("/");
      }, timeout);
    };
    verifyEmail();
  }, [emailVerificationLink, router, token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r  ">
      <div className="bg-white   p-8 rounded-lg shadow-lg max-w-md w-full ">
        <div className="mb-6 text-center ">
          {errorMessage && (
            <div
              className={`p-4 mb-4 border-l-4 ${
                isError
                  ? "bg-red-100 border-red-500 text-red-700"
                  : "bg-green-100 border-green-500 text-green-700"
              }`}
            >
              {isLoading ? <LoadingSpinner /> : errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
