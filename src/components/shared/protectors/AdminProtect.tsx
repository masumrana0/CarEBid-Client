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

const AdminProtect = ({ children }: PrivateRouteProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);

  // State to track hydration
  const [hasHydrated, setHasHydrated] = useState(false);

  // Assuming getTokenInfo is synchronous
  const tokenInfo = getTokenInfo();

  useEffect(() => {
    // Mark hydration as complete
    setHasHydrated(true);

    // Handle redirection if not logged in or not an admin
    if (
      !isLoggedIn ||
      !(tokenInfo?.role === "admin" || tokenInfo?.role === "super_admin")
    ) {
      // dispatch(setLogOut());

      router.push("/not-authorized");
    }
  }, [isLoggedIn, dispatch, router, tokenInfo?.role]);

  // If not hydrated or not logged in, show spinner
  if (!hasHydrated || !isLoggedIn) {
    return <PageLoader />;
  }

  return <>{children}</>;
};

export default AdminProtect;
