import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
import dataReducer from "./dataSlice";
import configReducer from "./configSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    data: dataReducer,
    config: configReducer,
  },
});
