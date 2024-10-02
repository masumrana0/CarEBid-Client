import { baseApi } from "./baseApi";

const url = "/job";

const jobApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createJob: build.mutation<any, { data: any }>({
      query: ({ data }) => ({
        url: `/job`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: ["job"],
    }),
    // runningjob
    getAllRunningJob: build.query({
      query: (query) => ({
        url: `/running-job${query}`,
        method: "GET",
      }),
      providesTags: ["job"],
    }),
    getOneRunningJob: build.query<any, string>({
      query: (id) => ({
        url: `/running-job/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    //pendingjob
    getAllPendingJob: build.query({
      query: (query) => ({
        url: `/pending-job${query}`,
        method: "GET",
      }),
      providesTags: ["job"],
    }),
    getOnePendingJob: build.query<any, string>({
      query: (id) => ({
        url: `/pending-job/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updatePendingJob: build.mutation<any, { data: any; id: string }>({
      query: ({ data, id }) => ({
        url: `/pending-job/${id}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: ["job"],
    }),
    pendingToRunningJob: build.mutation({
      query: (id) => ({
        url: `/pending-job/pending-to-running/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["job"],
    }),
    pendingToRejectJob: build.mutation({
      query: (id) => ({
        url: `/pending-job/pending-to-reject/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["job"],
    }),
    deletePendingJob: build.mutation<any, string>({
      query: (id) => ({
        url: `/pending-job/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["job"],
    }),

    // Rejectjob
    getAllRejectJob: build.query({
      query: (query) => ({
        url: `/reject-job${query}`,
        method: "GET",
      }),
      providesTags: ["job"],
    }),
    getOneRejectJob: build.query<any, string>({
      query: (id) => ({
        url: `/reject-job/${id}`,
        method: "GET",
      }),
      providesTags: ["job"],
    }),
    deleteRejectJob: build.mutation<any, string>({
      query: (id) => ({
        url: `/reject-job/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["job"],
    }),

    // JobOfWork
    SubmiteJobOfWork: build.mutation<any, { data: any }>({
      query: ({ data }) => ({
        url: `/jobofwork`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: ["job"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateJobMutation,
  // running job
  useGetAllRunningJobQuery,
  useGetOneRunningJobQuery,
  // pending job
  useGetAllPendingJobQuery,
  useGetOnePendingJobQuery,
  useDeletePendingJobMutation,
  useUpdatePendingJobMutation,
  usePendingToRunningJobMutation,
  usePendingToRejectJobMutation,

  // reject job
  useGetAllRejectJobQuery,
  useGetOneRejectJobQuery,
  useDeleteRejectJobMutation,

  //jobOfwork
  useSubmiteJobOfWorkMutation,
} = jobApi;
