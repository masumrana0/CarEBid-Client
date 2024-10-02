export type IUser = {
  updatedAt: string;
  _id?: string;
  name: string;
  email: string;
  password: string;
  role?: "customer" | "admin" | "super_admin";
  accountType?: "personal" | "business";
  documents?: string[];
  membership?: "free" | "faid";
  contactNo?: string;
  mainBalance: number; //only for spendable but no withdrawable and non t ransferable
  earningBalance: number; // withdrawable and transferable to main balance,
  rechargeEarningBalance?: number; // withdrawable and transferable to main balance, // it's only for bussiness account
  profilePhoto?: string;
  passwordChangedAt?: Date;
  isEmailVerified?: boolean;
  isVerified?: boolean;
};
