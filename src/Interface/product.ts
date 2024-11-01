import { ICommonProfile } from "./user";

export type IProduct = {
  _id: string;
  photos: {
    mainPhoto: string;
    others: string[];
    docs: string[];
  };
  title: string; //
  make: string; //
  model: string; //
  mileage: string;
  vin: string; //
  titleStatus: //
    | "clean (CT)"
    | "salvage"
    | "rebuilt/reconstructed"
    | "junk"
    | "buyback"
    | "bonded"
    | "export only"
    | "odometer rollback"
    | "flood"
    | "non-repairable";

  location?: {
    city: string;
    zipCode: number;
  };
  seller: ICommonProfile | string;
  engine: string;
  drivetrain: string;
  transmission: "automatic" | "manual";
  bodyStyle:
    | "coupe"
    | "convertible"
    | "hatchback"
    | "sedan"
    | "suv/crossover"
    | "truck"
    | "van/minivam"
    | "wagon";
  launchingYear: number;
  exteriorColor: string;
  interiorColor: string;
  sellerType?: string;
  highlights: string[];
  equipment: string[];
  modification: string[];
  recentServiceHistory?: string[];
  otherItemsIncludedInSale?: string[];
  ownershipHistory: string;
  sellerNotes: string[];
  videos?: string[];
  views?: number;
  bids: {
    bidsHistory?: {
      buyer: ICommonProfile | string;
      amount: number;
      biddingTime: Date;
    }[];
    biddingDuration: {
      startBid: Date;
      endBid: Date;
    };
    minBid: number;
    maxBid: number;
  };
};
