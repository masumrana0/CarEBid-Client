import {
  IChangeEmail,
  IChangePassword,
  IForgotPassword,
  ISigninData,
  ISignUpData,
} from "@/Interface/auth";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation({
      query: (signupdata: ISignUpData) => ({
        url: "/auth/customer/register",
        method: "POST",
        data: signupdata,
      }),
    }),
    signin: build.mutation({
      query: (signinData: ISigninData) => ({
        url: "/auth/login",
        method: "POST",
        data: signinData,
      }),
    }),
    isUserExist: build.mutation({
      query: (data) => ({
        url: "/auth/is-exist",
        method: "POST",
        data: data,
      }),
    }),
    forgotPassword: build.mutation({
      query: (email: IForgotPassword) => ({
        url: "/auth/forget-password",
        method: "POST",
        data: email,
      }),
    }),
    resetPassword: build.mutation({
      query: ({ data, token }) => ({
        url: `/auth/reset-password/${token}`,
        method: "PATCH",
        data: { newPassword: data.newPassword },
      }),
    }),
    changePassword: build.mutation({
      query: (data: IChangePassword) => ({
        url: `/auth/change-password`,
        method: "PATCH",
        data: data,
      }),
    }),
    changeEmail: build.mutation({
      query: (data: IChangeEmail) => ({
        url: `/auth/change-email`,
        method: "PATCH",
        data: data,
      }),
    }),
    sendVerifictionEmail: build.mutation({
      query: (data: { name: string; email: string }) => ({
        url: "/auth/sendVerificationEmail",
        method: "POST",
        data: data,
      }),
    }),
    verifyEmail: build.mutation({
      query: (token: string) => ({
        url: `/auth/verify-email/${token}`,
        method: "PATCH",
        invalidatesTags: ["profile"],
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useSigninMutation,
  useSignupMutation,
  useIsUserExistMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useChangePasswordMutation,
  useChangeEmailMutation,
  useSendVerifictionEmailMutation,
} = authApi;
