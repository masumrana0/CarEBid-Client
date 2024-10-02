import { IProduct } from "@/Interface/product";
import { baseApi } from "./baseApi";

const url = "/product";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProduct: build.mutation<any, IProduct>({
      query: (data) => ({
        url: url,
        method: "POST",
        data: data,
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
    getAllProducts: build.query<any, void>({
      query: () => ({
        url: url,
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
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useDeleteProductMutation,
} = productApi;
