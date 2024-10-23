export interface IProduct {
  _id?: string;
  photos: {
    mainPhoto: string;
    others: string[];
  };
  make: string;
  model: string;
  mileage: string;
  vin: string;
  titleStatus: string;
  location: string;
  seller: {
    id: string;
    name: string;
    profilePhoto?: string;
  };
  engine: string;
  drivetrain: string;
  transmission: string;
  bodyStyle: string;
  exteriorColor: string;
  interiorColor: string;
  sellerType: string;
  highlights: string[];
  equipment: string[];
  modification: string[];
  recentServiceHistory: string[];
  otherItemsIncludedInSale: string[];
  ownershipHistory: string;
  sellerNotes: string[];
  videos: string[];
  views: number;
  bids: {
    bidsHistory: any[];
    minBid: number;
    maxBid: number;
  };
  comments: any[];
}
