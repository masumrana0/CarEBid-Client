import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IFilter {
  searchTerm: string | null;
  jobTitle: string | null;
  category: string | null;
  subCategory: string | null;
  date: string | null;
  region: string | null;
  limit: number | null;
}

export interface IInitialState {
  filter: IFilter;
  query: string | null;
}

const initialState: IInitialState = {
  filter: {
    searchTerm: null,
    jobTitle: null,
    category: null,
    subCategory: null,
    date: null,
    region: null,
    limit: null,
  },
  query: "/",
};

// Utility function to generate query string
const generateJobQueryString = (params: IFilter): string => {
  const queryParameters: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined) {
      queryParameters.push(`${key}=${value}`);
    }
  }
  return queryParameters.length > 0 ? `?${queryParameters.join("&")}` : "/";
};

export const jobQuerySlice = createSlice({
  name: "jobQuery",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string | null>) => {
      state.filter.searchTerm = action.payload;
      state.query = generateJobQueryString(state.filter);
    },
    setJobTitle: (state, action: PayloadAction<string | null>) => {
      state.filter.jobTitle = action.payload;
      state.query = generateJobQueryString(state.filter);
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.filter.category = action.payload;
      state.query = generateJobQueryString(state.filter);
    },
    setSubCategory: (state, action: PayloadAction<string | null>) => {
      state.filter.subCategory = action.payload;
      state.query = generateJobQueryString(state.filter);
    },
    setDate: (state, action: PayloadAction<string | null>) => {
      state.filter.date = action.payload;
      state.query = generateJobQueryString(state.filter);
    },
    setRegion: (state, action: PayloadAction<string | null>) => {
      state.filter.region = action.payload;
      state.query = generateJobQueryString(state.filter);
    },
    setLimit: (state, action: PayloadAction<number | null>) => {
      state.filter.limit = action.payload;
      state.query = generateJobQueryString(state.filter);
    },
    generateJobQuery: (state) => {
      state.query = generateJobQueryString(state.filter);
    },
  },
});

export const {
  setSearchTerm,
  setJobTitle,
  setCategory,
  setSubCategory,
  setDate,
  setRegion,
  setLimit,
  generateJobQuery,
} = jobQuerySlice.actions;

export default jobQuerySlice.reducer;
