import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  annualCO2: "",
  purchases: [],
  controls: {
    customCo2: false,
  },
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setAnnualCO2: (state, action) => {
      return { ...state, annualCO2: action.payload };
    },
    setCustomCo2: (state, action) => {
      return { ...state, controls: { customCo2: action.payload } };
    },
    addPurchase: (state, action) => {
      return { ...state, purchases: state.purchases };
    },
  },
});

export const { setAnnualCO2, setCustomCo2 } = formSlice.actions;

export default formSlice.reducer;
