import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: "",
  updates: {
    initial_cost: "",
    upkeep_cost: "",
    annual_offset: "",
    growth_time: "",
    max_annual_purchase: "",
    useFractionalExponential: 0,
    applyInflationToUpkeep: 0,
  },
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfig: (state, action) => {
      return {
        current: action.payload,
        updates: {
          ...initialState.updates,
          useFractionalExponential:
            action.payload.useFractionalExponential > 0 ? true : false,
          applyInflationToUpkeep:
            action.payload.applyInflationToUpkeep > 0 ? true : false,
        },
      };
    },
    setSetting: (state, action) => {
      let newUpdates = JSON.parse(JSON.stringify(state.updates));
      newUpdates[action.payload.key] = action.payload.value;
      return { ...state, updates: newUpdates };
    },
  },
});

export const { setConfig, setSetting } = configSlice.actions;

export default configSlice.reducer;
