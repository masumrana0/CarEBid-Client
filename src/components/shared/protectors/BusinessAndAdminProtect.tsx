"use client";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setLogOut } from "@/Redux/Slices/authSlice";
import { getTokenInfo } from "@/service/auth.service";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

import PageLoader from "../spinners/PageLoader";

interface PrivateRouteProps {
  children: ReactNode;
}

const BusinessAndAdminProtect: React.FC<PrivateRouteProps> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    // Ensure hydration is complete before proceeding
    setHasHydrated(true);

    // Fetch token info once hydration is complete
    const tokenInfo = getTokenInfo();

    // Redirect logic
    if (
      !isLoggedIn ||
      !(
        (tokenInfo?.role === "customer" &&
          tokenInfo?.accountType === "business") ||
        tokenInfo?.role === "admin"
      )
    ) {
      // dispatch(setLogOut());
      router.push("/not-authorized");
    }
  }, [isLoggedIn, dispatch, router]);

  if (!hasHydrated || !isLoggedIn) {
    return <PageLoader />;
  }

  return <>{children}</>;
};

export default BusinessAndAdminProtect;
