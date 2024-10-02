import { baseApi } from "./api/baseApi";
import authReducer from "./Slices/authSlice";
import layoutSlice from "./Slices/dashboardLayout/layoutSlice";
import jobQuerySlice from "./Slices/jobQuerySlice";
import utilitySlice from "./Slices/unitlitySlice";
import userSlice from "./Slices/userSlice";

const rootReducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  authReducer: authReducer,
  layoutReducer: layoutSlice,
  utilityReducer: utilitySlice,
  userReducer: userSlice,
  jobqueryReducer: jobQuerySlice,
};

export default rootReducer;
