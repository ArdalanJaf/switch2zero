import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  annualCO2: "",
  purchases: [{ month: "", year: "", trees: "" }],
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
          currentYearValue + value <= 55 ? value : 55 - currentYearValue;
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

      newPurchases.push(initialState.purchases[0]);
      return { ...state, purchases: newPurchases };
    },
  },
});

export const {
  setAnnualCO2,
  setCustomCo2,
  setPurchase,
  delPurchase,
  addPurchase,
} = formSlice.actions;

export default formSlice.reducer;
