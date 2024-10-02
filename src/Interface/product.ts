export interface IProduct {
  _id?: string;
  category: string;
  title: string;
  warranty: string; // Warranty duration as a string (e.g., "1 year")
  emi: number; // Number of EMI installments
  price: number;
  company: string;
  photo: string | any; // URL or path to the image
  status: "in stock" | "out of stock"; // Predefined statuses
}
