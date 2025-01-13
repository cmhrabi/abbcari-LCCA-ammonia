import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GeneralState {
  value: {
    discount: string;
    province: string[];
    electricalAmmonia: string;
    efficiency: string;
    baseAmmonia: string;
    plantOperatingHours: number;
    startYear: number;
    finalYear: number;
  };
}

export const generalSlice = createSlice({
  name: "general",
  initialState: {
    value: {
      startYear: 2024,
      finalYear: 2050,
      discount: "",
      province: "No Selection",
      electricalAmmonia: "",
      efficiency: "",
      baseAmmonia: "",
      plantOperatingHours: 8000,
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
    setElectricalAmmonia: (state, action: PayloadAction<string>) => {
      state.value.electricalAmmonia = action.payload;
    },
    setEfficiency: (state, action: PayloadAction<string>) => {
      state.value.efficiency = action.payload;
    },
    setBaseAmmonia: (state, action: PayloadAction<string>) => {
      state.value.baseAmmonia = action.payload;
    },
    setPlantOperatingHours: (state, action: PayloadAction<number>) => {
      state.value.plantOperatingHours = action.payload;
    },
  },
});

export const {
  setStartYear,
  setFinalYear,
  setDiscount,
  setProvince,
  setElectricalAmmonia,
  setEfficiency,
  setBaseAmmonia,
  setPlantOperatingHours,
} = generalSlice.actions;

export default generalSlice.reducer;
