import {
  IHeaderCarouselSlide,
  IHeaderSliderResponse,
} from "@/Interface/sliders";
import { baseApi } from "../baseApi";

const url = "/web-content/headercarousel";

const headerCarouselApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createHeaderSlide: build.mutation<
      IHeaderSliderResponse,
      IHeaderCarouselSlide
    >({
      query: (data) => ({
        url: url,
        method: "POST",
        data: data,
      }),
    }),
    updateHeaderSlide: build.mutation<
      void,
      { data: Partial<IHeaderCarouselSlide>; id: string }
    >({
      query: ({ data, id }) => ({
        url: `${url}/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getAllHeaderSlides: build.query<any, void>({
      query: () => ({
        url: url,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateHeaderSlideMutation,
  useUpdateHeaderSlideMutation,
  useGetAllHeaderSlidesQuery,
} = headerCarouselApi;
