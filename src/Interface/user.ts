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
  profilePhoto?: string;
  passwordChangedAt?: Date;
  isEmailVerified?: boolean;
  isVerified?: boolean;
};

export type ICommonProfile = {
  id: string;
  name: string;
  profilePhoto?: string;
};
