import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NameState {
  value: {
    analysisId: string;
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
      analysisId: "",
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
    setAnalysisId: (state, action: PayloadAction<string>) => {
      state.value.analysisId = action.payload;
    },
    resetState: (state) => {
      state.value = {
        analysisId: "",
        analysisName: "",
        tech1Name: "",
        tech2Name: "",
        type: "",
      };
    },
    setState: (state, action: PayloadAction<NameState["value"]>) => {
      state.value = action.payload;
    },
  },
});

export const {
  setAnalysisName,
  setTech1Name,
  setTech2Name,
  setType,
  setAnalysisId,
  resetState,
  setState: setNameState,
} = nameSlice.actions;

export default nameSlice.reducer;
