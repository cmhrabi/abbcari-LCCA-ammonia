import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NameState {
  value: {
    analysisName: string;
    tech1Name: string;
    tech2Name: string;
    type: string;
  };
}

export const nameSlice = createSlice({
  name: "name",
  initialState: {
    value: {
      analysisName: "P2A vs Grey",
      tech1Name: "P2A",
      tech2Name: "Grey",
      type: "",
    },
  },
  reducers: {
    setAnalysisName: (state, action: PayloadAction<string>) => {
      state.value.analysisName = action.payload;
    },
    setTech1Name: (state, action: PayloadAction<string>) => {
      state.value.tech1Name = action.payload;
    },
    setTech2Name: (state, action: PayloadAction<string>) => {
      state.value.tech2Name = action.payload;
    },
    setType: (state, action: PayloadAction<string>) => {
      state.value.type = action.payload;
    },
    resetState: (state) => {
      state.value = {
        analysisName: "P2A vs Grey",
        tech1Name: "P2A",
        tech2Name: "Grey",
        type: "",
      };
    },
  },
});

export const {
  setAnalysisName,
  setTech1Name,
  setTech2Name,
  setType,
  resetState,
} = nameSlice.actions;

export default nameSlice.reducer;
