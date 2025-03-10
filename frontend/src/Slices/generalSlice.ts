import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GeneralState {
  value: {
    discount: string;
    province: string;
    finalDemand: string;
    baselineDemand: string;
    plantOperatingHours: number;
    startYear: number;
    finalYear: number;
  };
}

export const generalSlice = createSlice({
  name: "general",
  initialState: {
    value: {
      startYear: 2025,
      finalYear: 2050,
      discount: "0.07",
      province: "Ontario",
      finalDemand: "238.23",
      plantOperatingHours: 8000,
      baselineDemand: "0.01486512",
    },
  },
  reducers: {
    setStartYear: (state, action: PayloadAction<number>) => {
      state.value.startYear = action.payload;
    },
    setFinalYear: (state, action: PayloadAction<number>) => {
      state.value.finalYear = action.payload;
    },
    setDiscount: (state, action: PayloadAction<string>) => {
      state.value.discount = action.payload;
    },
    setProvince: (state, action: PayloadAction<string>) => {
      state.value.province = action.payload;
    },
    setFinalDemand: (state, action: PayloadAction<string>) => {
      state.value.finalDemand = action.payload;
    },
    setPlantOperatingHours: (state, action: PayloadAction<number>) => {
      state.value.plantOperatingHours = action.payload;
    },
    setBaselineDemand: (state, action: PayloadAction<string>) => {
      state.value.baselineDemand = action.payload;
    },
    resetState: (state) => {
      state.value = {
        startYear: 2025,
        finalYear: 2050,
        discount: "0.07",
        province: "Ontario",
        finalDemand: "238.23",
        plantOperatingHours: 8000,
        baselineDemand: "0.01486512",
      };
    },
  },
});

export const {
  setStartYear,
  setFinalYear,
  setDiscount,
  setProvince,
  setFinalDemand,
  setPlantOperatingHours,
  setBaselineDemand,
  resetState,
} = generalSlice.actions;

export default generalSlice.reducer;
