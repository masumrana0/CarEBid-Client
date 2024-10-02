"use client";
import OfferCard from "@/components/publicComponents/home/discountOffer/OfferCard";
import LoadingSpinner from "@/components/shared/spinners/loadingSpinner";
import { useGetAllOffersQuery } from "@/Redux/api/shared/offerApi";
import React from "react";

const OfferComponentPage = () => {
  const { data, isLoading, isError } = useGetAllOffersQuery(null);
  const offers = data?.data;

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error loading offers.</div>;

  return (
    <div>
      <h3 className="font-bold text-2xl mb-3">All Offer</h3>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 ">
          {offers?.map((offer: any) => (
            <div key={offer.id}>
              <OfferCard offer={offer} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OfferComponentPage;
