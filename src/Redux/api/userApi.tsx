import { IProduct } from "@/Interface/product";
import { baseApi } from "./baseApi";
import { IUser } from "@/Interface/user";

const url = "/user";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation<any, any>({
      query: (data) => ({
        url: url,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["user"],
    }),

    updateUser: build.mutation<any, { data: any; id: string }>({
      query: ({ data, id }) => ({
        url: `${url}/${id}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: ["user", "profile"],
    }),

    getAllUser: build.query<
      any,
      {
        shortBy?: string;
        sortOrder?: string;
        searchTerm?: string;
        page?: number;
        limit?: number;
      }
    >({
      query: ({
        shortBy = "updatedAt",
        sortOrder = "asc",
        searchTerm = "",
        page = 1,
        limit = 10,
      }) => ({
        url: url,
        method: "GET",
        params: { shortBy, sortOrder, searchTerm, page, limit },
      }),
      providesTags: ["user"],
    }),
    getUserById: build.query<any, string>({
      query: (id) => ({
        url: `${url}/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    deleteUser: build.mutation<any, string>({
      query: (id) => ({
        url: `${url}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateUserMutation,
  useGetAllUserQuery,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = userApi;
