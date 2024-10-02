export const businessMenuItems: any = [
  { name: "Shop", href: "/shop" },
  {
    label: "Offer",
    links: [
      { name: "Add  offer", href: "/offer/create-offer" },
      { name: "My  offer", href: "/offer/my-offer" },
      { name: "All offer", href: "/offer/all-offer" },
    ],
  },
  {
    label: "Business",
    links: [
      { name: "Account Plan", href: "/" },
      { name: "Minimum Recharge", href: "/" },
      { name: "Work & Earn", href: "/" },
      { name: "Add Product", href: "/" },
      { name: "Add Work", href: "/" },
      { name: "My product", href: "/" },
      { name: "Notice", href: "/" },
      { name: "Advertisment", href: "/" },
    ],
  },
  {
    label: "About",
    links: [
      { name: "Free Flexiplan", href: "/" },
      { name: "Personal Account", href: "/" },
      { name: "Business Account", href: "/" },
      { name: "Account Plan", href: "/" },
      { name: "Work & Earn", href: "/" },
      { name: "Advertisment", href: "/" },
      { name: "Investor Relation", href: "/" },
      { name: "Financial  Result", href: "/" },
      { name: "Best Earning Website", href: "/" },
    ],
  },
];

export const personalMenuItems: any = [
  { name: "Recharge", href: "/recharge" },

  { name: "Shop", href: "/shop" },

  {
    label: "Personal",
    links: [
      { name: "Account Plan", href: "/" },
      { name: "Work & Earn", href: "/jobS" },
      { name: "Notice", href: "/" },
      { name: "Advertisement", href: "/" },
    ],
  },

  {
    label: "Offer",
    links: [
      { name: "All Offer", href: "/offer/all-offer" },
      { name: "Discount Offer", href: "/offer/discount-offer" },
      { name: "Special Offer", href: "/offer/special-offer" },
    ],
  },

  {
    label: "About",
    links: [
      { name: "Free Flexiplan", href: "/" },
      { name: "Personal Account", href: "/" },
      { name: "Business Account", href: "/" },
      { name: "Account Plan", href: "/" },
      { name: "Work & Earn", href: "/jobs" },
      { name: "Advertisment", href: "/" },
      { name: "Investor Relation", href: "/" },
      { name: "Financial  Result", href: "/" },
      { name: "Best Earning Website", href: "/" },
    ],
  },
];

export const adminMenuItems: any = [
  {
    label: "Personal",
    links: [
      { name: "Recharge", href: "/" },
      { name: "Discount Offer", href: "/" },
      { name: "Special Offer", href: "/" },
      { name: "My Offer", href: "/" },
      { name: "Work & Earn", href: "/jobs" },
      { name: "Account Plan", href: "/" },
      { name: "Add Work", href: "/" },
      { name: "Shop", href: "/" },
      { name: "Notice", href: "/" },
      { name: "Advertisement", href: "/" },
    ],
  },
  {
    label: "Business",
    links: [
      { name: "Minimum Recharge", href: "/" },
      { name: "Add discount offer", href: "/" },
      { name: "Add special offer", href: "/" },
      { name: "Work & Earn", href: "/jobs" },
      { name: "Account Plan", href: "/" },
      { name: "Add Product", href: "/" },
      { name: "Add Work", href: "/" },
      { name: "Shop", href: "/" },
      { name: "Notice", href: "/" },
      { name: "Advertisment", href: "/" },
    ],
  },
  {
    label: "About",
    links: [
      { name: "Free Flexiplan", href: "/" },
      { name: "Personal Account", href: "/" },
      { name: "Business Account", href: "/" },
      { name: "Account Plan", href: "/" },
      { name: "Work & Earn", href: "/" },
      { name: "Advertisment", href: "/" },
      { name: "Investor Relation", href: "/" },
      { name: "Financial  Result", href: "/" },
      { name: "Best Earning Website", href: "/" },
    ],
  },
];

export const getNabarBottomMenu = (tokenInfo: any) => {
  if (tokenInfo?.role == "admin") {
    return adminMenuItems;
  } else if (tokenInfo?.accountType == "business") {
    return businessMenuItems;
  } else if (tokenInfo?.accountType == "personal") {
    return personalMenuItems;
  }
  return [];
};
