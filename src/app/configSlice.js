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
  showConfig: false,
  login: { userId: "", token: "" },
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfig: (state, action) => {
      return {
        ...state,
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
    setShowConfig: (state, action) => {
      return { ...state, showConfig: !state.showConfig };
    },
    setLogin: (state, action) => {
      return { ...state, login: action.payload };
    },
  },
});

export const { setConfig, setSetting, setShowConfig, setLogin } =
  configSlice.actions;

export default configSlice.reducer;
