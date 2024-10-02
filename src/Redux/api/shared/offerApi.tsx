import { IOffer, IOfferResponse } from "@/Interface/offer";
import { baseApi } from "../baseApi";
// Adjust import path as needed
const url = "/offer";

const offerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOffer: build.mutation<IOfferResponse, any>({
      query: (data) => ({
        url: url,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),

      invalidatesTags: ["offer"],
    }),
    updateOffer: build.mutation<IOfferResponse, { data: any; id: string }>({
      query: ({ data, id }) => ({
        url: `${url}/${id}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: ["offer"],
    }),
    getAllOffers: build.query({
      query: (query) => ({
        url: query ? `${url}?category=${query}` : `${url}`,
        method: "GET",
      }),
      providesTags: ["offer"],
    }),
    myOffer: build.query({
      query: (query) => ({
        url: query ? `${url}/my-offer?category=${query}` : `${url}/my-offer`,
        method: "GET",
      }),
      providesTags: ["offer"],
    }),

    getOfferById: build.query<any, string>({
      query: (id) => ({
        url: `${url}/${id}`,
        method: "GET",
      }),
      providesTags: ["offer"],
    }),
    deleteOffer: build.mutation<any, string>({
      query: (id) => ({
        url: `${url}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["offer"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateOfferMutation,
  useUpdateOfferMutation,
  useGetAllOffersQuery,
  useMyOfferQuery,
  useGetOfferByIdQuery,
  useDeleteOfferMutation,
} = offerApi;
