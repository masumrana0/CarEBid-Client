import { IProduct } from "@/Interface/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IInitialState {
  setFormStep: number;
  selectedProduct: IProduct | null;
}

// Retrieve the initial step from localStorage, or default to 0
const initialState: IInitialState = {
  setFormStep: Number(localStorage.getItem("step")) || 0,
  selectedProduct: null,
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setProductFormStep: (state, action: PayloadAction<number>) => {
      state.setFormStep = action.payload;
      localStorage.setItem("step", action.payload.toString());
    },

    setSelectedProduct: (state, action: PayloadAction<IProduct>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setProductFormStep, setSelectedProduct } = productSlice.actions;

export default productSlice.reducer;
