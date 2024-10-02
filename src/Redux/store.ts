/**
 * Title: 'Redux setup by Masum Rana'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 21-01-2024
 *
 */

import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./api/baseApi";
import rootReducer from "./rootReducer";

// Extracting the middleware from baseApi
const apiMiddleware = baseApi.middleware;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
