import { IProduct } from "@/Interface/product";
import { baseApi } from "./baseApi";

const url = "/product";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProduct: build.mutation({
      query: (data) => ({
        url: url,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: build.mutation<any, { data: Partial<IProduct>; id: string }>(
      {
        query: ({ data, id }) => ({
          url: `${url}/${id}`,
          method: "PATCH",
          data: data,
        }),
        invalidatesTags: ["product"],
      },
    ),
    getAllProduct: build.query({
      query: (query) => ({
        url: `${url}${query}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getProductById: build.query<any, string>({
      query: (id) => ({
        url: `${url}/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    deleteProduct: build.mutation<any, string>({
      query: (id) => ({
        url: `${url}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useDeleteProductMutation,
} = productApi;
