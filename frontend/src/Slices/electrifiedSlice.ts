import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SubProcess {
  baseCost: number;
  learningRate: number;
  scalingFactor: number;
  installationFactor: number;
  energyRequirement: number;
  efficiency: number;
  name: string;
}

export interface ElectrifiedState {
  value: {
    subProcesses: SubProcess[];
  };
}

export const electrifiedSlice = createSlice({
  name: "electrified",
  initialState: {
    value: { subProcesses: new Array<SubProcess>() },
  },
  reducers: {
    addSubProcess: (state, action: PayloadAction<SubProcess>) => {
      state.value.subProcesses.push(action.payload);
    },
    updateSubProcess: (
      state,
      action: PayloadAction<{ index: number; subProcess: SubProcess }>,
    ) => {
      if (action.payload.index < state.value.subProcesses.length) {
        state.value.subProcesses[action.payload.index] =
          action.payload.subProcess;
      }
    },
  },
});

export const { addSubProcess, updateSubProcess } = electrifiedSlice.actions;

export default electrifiedSlice.reducer;
