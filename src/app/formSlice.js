import { createSlice } from "@reduxjs/toolkit";
import { avgAnnualCO2ByCountry } from "../config/avgAnnualCO2ByCountry";
import sortPurchases from "../utils/sortPurchases";

const initialState = {
  annualCO2: "", // metric tons
  purchases: [{ month: "", year: "", trees: "" }],
  inflationRate: "", // %
  controls: {
    customCo2: false,
    errors: {},
    max_annual_purchase: 55,
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
      return {
        ...state,
        controls: { ...state.controls, customCo2: action.payload },
      };
    },
    setPurchase: (state, action) => {
      const { index, key, value } = action.payload;
      let newPurchases = JSON.parse(JSON.stringify(state.purchases));
      let newValue = value;

      // this if statement ensures no more than 55 trees are bought a year
      if (key === "trees") {
        const sameYearArr = newPurchases.filter(
          (p, i) => i !== index && p.year === newPurchases[index].year
        );
        let currentYearValue = 0;
        sameYearArr.map((p) => (currentYearValue += p.trees));

        newValue =
          currentYearValue + value <= state.controls.max_annual_purchase
            ? value
            : state.controls.max_annual_purchase - currentYearValue;

        // trigger notification so user knows they reached max?
      }

      newPurchases[index][key] = newValue;
      return { ...state, purchases: newPurchases };
    },
    delPurchase: (state, action) => {
      let newPurchases = JSON.parse(JSON.stringify(state.purchases));
      newPurchases.splice(action.payload, 1);
      if (newPurchases.length < 1) newPurchases = initialState.purchases;
      return { ...state, purchases: newPurchases };
    },
    addPurchase: (state) => {
      let newPurchases = JSON.parse(JSON.stringify(state.purchases));

      // copy last purchase month & year for more convenient user experience
      let newPurchase = JSON.parse(
        JSON.stringify(newPurchases[newPurchases.length - 1])
      );
      newPurchase.trees = "";
      newPurchases.push(newPurchase);
      return { ...state, purchases: newPurchases };
    },
    sortPurchasesByDate: (state, action) => {
      let newPurchases = [...state.purchases];
      sortPurchases(newPurchases);
      return { ...state, purchases: newPurchases };
    },
    setInflationRate: (state, action) => {
      return { ...state, inflationRate: action.payload };
    },
    setErrors: (state, action) => {
      return {
        ...state,
        controls: { ...state.controls, errors: action.payload },
      };
    },
    clearErrors: (state) => {
      return {
        ...state,
        controls: { ...state.controls, errors: initialState.controls.errors },
      };
    },
    setMaxPurchase: (state, action) => {
      return {
        ...state,
        controls: { ...state.controls, max_annual_purchase: action.payload },
      };
    },
    loadForm: (state, action) => {
      let newForm = action.payload;
      newForm.controls = { ...initialState.controls };
      newForm.annualCO2 = newForm.annualCO2 / 1000;
      if (!Object.values(avgAnnualCO2ByCountry).includes(newForm.annualCO2)) {
        newForm.controls.customCo2 = true;
      }
      return { ...newForm };
    },
  },
});

export const {
  setAnnualCO2,
  setCustomCo2,
  setPurchase,
  delPurchase,
  addPurchase,
  sortPurchasesByDate,
  setInflationRate,
  setErrors,
  clearErrors,
  setMaxPurchase,
  loadForm,
} = formSlice.actions;

export default formSlice.reducer;
