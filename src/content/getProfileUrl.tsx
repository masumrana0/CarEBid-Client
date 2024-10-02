const getProfileUrl = (tokenInfo: any) => {
  let profileUrl = "/";
  if (tokenInfo?.role === "admin" || tokenInfo?.role === "super_admin") {
    profileUrl = "/admin/profile";
  } else if (tokenInfo?.accountType === "business") {
    profileUrl = "/business/profile";
  } else if (tokenInfo?.accountType === "personal") {
    profileUrl = "/personal/profile";
  }
  return profileUrl;
};

export default getProfileUrl;
