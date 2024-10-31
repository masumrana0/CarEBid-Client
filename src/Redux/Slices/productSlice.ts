import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IInitialState {
  setFormStep: number;
}

// Retrieve the initial step from localStorage, or default to 0
const initialState: IInitialState = {
  setFormStep: Number(localStorage.getItem("step")) || 0,
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setProductFormStep: (state, action: PayloadAction<number>) => {
      state.setFormStep = action.payload;
      localStorage.setItem("step", action.payload.toString());
    },
  },
});

export const { setProductFormStep } = productSlice.actions;

export default productSlice.reducer;
