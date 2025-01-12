import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GeneralState {
  value: {
    discount: string;
    province: string[];
    electricalAmmonia: string;
    efficiency: string;
    baseAmmonia: string;
    plantOperatingHours: string;
  };
}

export const generalSlice = createSlice({
  name: "general",
  initialState: {
    value: {
      startYear: "",
      finalYear: "",
      discount: "",
      province: "No Selection",
      electricalAmmonia: "",
      efficiency: "",
      baseAmmonia: "",
      plantOperatingHours: "",
    },
  },
  reducers: {
    setStartYear: (state, action: PayloadAction<string>) => {
      state.value.startYear = action.payload;
    },
    setFinalYear: (state, action: PayloadAction<string>) => {
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
    setPlantOperatingHours: (state, action: PayloadAction<string>) => {
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
