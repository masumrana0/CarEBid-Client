import {
  IChangePassword,
  IForgotPassword,
  ISigninData,
  ISignUpData,
} from "@/Interface/auth";
import { baseApi } from "../baseApi";
const url = "/user";

const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => ({
        url: url,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetProfileQuery } = profileApi;
