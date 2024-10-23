"use client";
import { authInfoKey, authKey, PROFILE_INFO_KEY } from "@/constant/storegeKey";

import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { getBaseUrl } from "@/helpers/config/envConfig";
import {
  getFromLocalStorage,
  getFromLocalStorageAsParse,
  setToLocalStorage,
  setToLocalStorageAsStringify,
} from "@/utils/local-storage";
import { jwtDecode } from "jwt-decode";

export const storeToken = ({ accessToken }: { accessToken: string }) => {
  const tokenWithBearer = `Bearer ${accessToken}`;
  return localStorage.setItem(authKey, tokenWithBearer);
};

// handle Loggedin
export const handleLoggedIn = (token: string) => {
  storeToken({ accessToken: token });
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;
};

export const getTokenInfo = (): any => {
  if (isLoggedIn()) {
    const tokenInfo = getFromLocalStorageAsParse(authInfoKey);

    if (tokenInfo !== null) {
      const token = getFromLocalStorage(authKey);
      return tokenInfo as any;
    }

    const token = getFromLocalStorage(authKey);

    if (token) {
      const userDecodedData = jwtDecode(token.split(" ")[1] as string);

      setToLocalStorageAsStringify(authInfoKey, userDecodedData);
      return userDecodedData;
    }
  }
  return null;
};

// handle Logout
export const Logout = () => {
  localStorage.removeItem(PROFILE_INFO_KEY);
  localStorage.removeItem(authKey);
  localStorage.removeItem(authInfoKey);
  return;
  // localStorage.clear();
};

export const removetokenInfo = (key: string) => {
  return localStorage.removeItem(key);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${getBaseUrl()}/auth/get-new-accessToken`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
