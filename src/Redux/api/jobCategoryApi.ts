import { baseApi } from "./baseApi";
const jobCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createJobCategory: build.mutation({
      query: (jobCategoryData) => ({
        url: "/job-category",
        method: "POST",
        data: jobCategoryData,
      }),
      invalidatesTags: ["job-category"],
    }),
    getJobCategories: build.query({
      query: () => ({
        url: "/job-category",
        method: "GET",
      }),
      providesTags: ["job-category"],
    }),
    getJobCategoryById: build.query({
      query: (id) => ({
        url: `/job-category/${id}`,
        method: "GET",
      }),
      providesTags: ["job-category"],
    }),
    updateJobCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `/job-category/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["job-category"],
    }),
    deleteJobCategory: build.mutation<void, string>({
      query: (id) => ({
        url: `/job-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["job-category"],
    }),
    deleteSubJobCategory: build.mutation<void, any>({
      query: ({ categoryId, subOptionId }) => ({
        url: `/job-category/delete-subCategory?categoryId=${categoryId}&subOptionId=${subOptionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["job-category"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateJobCategoryMutation,
  useGetJobCategoriesQuery,
  useGetJobCategoryByIdQuery,
  useUpdateJobCategoryMutation,
  useDeleteJobCategoryMutation,
  useDeleteSubJobCategoryMutation,
} = jobCategoryApi;
