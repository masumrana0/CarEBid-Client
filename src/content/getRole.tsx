import { getTokenInfo } from "@/service/auth.service";

const GetRoleBasisUrl = () => {
  const tokenInfo = getTokenInfo();
  const isAdminAccount =
    tokenInfo?.role === "admin" || tokenInfo?.role === "super_admin";
  const isBusinessAccount =
    tokenInfo?.role === "customer" && tokenInfo?.accountType === "business";
  const isPersonalAccount =
    tokenInfo?.role === "customer" && tokenInfo?.accountType === "personal";
  if (isAdminAccount) {
    return "/admin";
  } else if (isBusinessAccount) {
    return "/business";
  } else if (isPersonalAccount) {
    ("/personal");
  }
};

export default GetRoleBasisUrl;
