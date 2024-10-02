import { baseApi } from "./baseApi";

const jobOfWorkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // JobOfWork
    submiteJobOfWork: build.mutation<any, { data: any }>({
      query: ({ data }) => ({
        url: `/jobofwork`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: ["job", "jobOfWork"],
    }),
    getSpecificUserJobOfWork: build.query<any, void>({
      query: () => ({
        url: "/jobofwork",
        method: "GET",
      }),
      providesTags: ["jobOfWork"],
    }),
    getWorkSubmitedStatus: build.query({
      query: (id) => ({
        url: `/jobofwork/${id}`,
        method: "GET",
      }),
      providesTags: ["jobOfWork", "job"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useSubmiteJobOfWorkMutation,
  useGetSpecificUserJobOfWorkQuery,
  useGetWorkSubmitedStatusQuery,
} = jobOfWorkApi;
