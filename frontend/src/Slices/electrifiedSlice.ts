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

export interface Cost {
  name: string;
  cost: string;
}

export interface ElectrifiedState {
  value: {
    subProcesses: SubProcess[];
    directCosts: Cost[];
    indirectCosts: Cost[];
    workingCapitalCost: string;
    directCostFactor: number;
    indirectCostFactor: number;
    workingCapitalFactor: number;
    bottomUpCalc: boolean;
  };
}

export const electrifiedSlice = createSlice({
  name: "electrified",
  initialState: {
    value: {
      subProcesses: [
        {
          name: "SubProcess 1",
          baseCost: 2.001468915,
          installationFactor: 0.33,
          scalingFactor: 1,
          learningRate: 0.13,
          efficiency: 0.4,
          energyRequirement: 0.986181293,
        },
        {
          name: "SubProcess 2",
          baseCost: 2.252380011,
          installationFactor: 0,
          scalingFactor: 0.49,
          learningRate: 0.1,
          efficiency: 1,
          energyRequirement: 0.034624043,
        },
        {
          name: "SubProcess 3",
          baseCost: 9.256259378,
          installationFactor: 0.7,
          scalingFactor: 0.5,
          learningRate: 0.1,
          efficiency: 1,
          energyRequirement: 0.0778,
        },
      ],
      directCosts: [{ name: "", cost: "" }],
      indirectCosts: [{ name: "", cost: "" }],
      workingCapitalCost: "",
      directCostFactor: 0.33,
      indirectCostFactor: 0.5,
      workingCapitalFactor: 0.05,
      bottomUpCalc: false,
    },
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
    deleteSubProcess: (state, action: PayloadAction<number>) => {
      state.value.subProcesses.splice(action.payload, 1);
    },
    setBottomUpCalc: (state, action: PayloadAction<boolean>) => {
      state.value.bottomUpCalc = action.payload;
    },
    setDirectCostFactor: (state, action: PayloadAction<number>) => {
      state.value.directCostFactor = action.payload;
    },
    setIndirectCostFactor: (state, action: PayloadAction<number>) => {
      state.value.indirectCostFactor = action.payload;
    },
    setWorkingCapitalFactor: (state, action: PayloadAction<number>) => {
      state.value.workingCapitalFactor = action.payload;
    },
    setWorkingCapitalCost: (state, action: PayloadAction<string>) => {
      state.value.workingCapitalCost = action.payload;
    },
    addDirectCost: (state, action: PayloadAction<Cost>) => {
      state.value.directCosts.push(action.payload);
    },
    updateDirectCost: (
      state,
      action: PayloadAction<{ index: number; cost: Cost }>,
    ) => {
      if (action.payload.index < state.value.directCosts.length) {
        state.value.directCosts[action.payload.index] = action.payload.cost;
      }
    },
    deleteDirectCost: (state, action: PayloadAction<number>) => {
      state.value.directCosts.splice(action.payload, 1);
    },
    addIndirectCost: (state, action: PayloadAction<Cost>) => {
      state.value.indirectCosts.push(action.payload);
    },
    updateIndirectCost: (
      state,
      action: PayloadAction<{ index: number; cost: Cost }>,
    ) => {
      if (action.payload.index < state.value.indirectCosts.length) {
        state.value.indirectCosts[action.payload.index] = action.payload.cost;
      }
    },
    deleteIndirectCost: (state, action: PayloadAction<number>) => {
      state.value.indirectCosts.splice(action.payload, 1);
    },
    resetState: (state) => {
      state.value = {
        subProcesses: [
          {
            name: "SubProcess 1",
            baseCost: 2.001468915,
            installationFactor: 0.33,
            scalingFactor: 1,
            learningRate: 0.13,
            efficiency: 0.4,
            energyRequirement: 0.986181293,
          },
          {
            name: "SubProcess 2",
            baseCost: 2.252380011,
            installationFactor: 0,
            scalingFactor: 0.49,
            learningRate: 0.1,
            efficiency: 1,
            energyRequirement: 0.034624043,
          },
          {
            name: "SubProcess 3",
            baseCost: 9.256259378,
            installationFactor: 0.7,
            scalingFactor: 0.5,
            learningRate: 0.1,
            efficiency: 1,
            energyRequirement: 0.0778,
          },
        ],
        directCosts: [{ name: "", cost: "" }],
        indirectCosts: [{ name: "", cost: "" }],
        workingCapitalCost: "",
        directCostFactor: 0.33,
        indirectCostFactor: 0.5,
        workingCapitalFactor: 0.05,
        bottomUpCalc: false,
      };
    },
  },
});

export const {
  addSubProcess,
  updateSubProcess,
  deleteSubProcess,
  setBottomUpCalc,
  setDirectCostFactor,
  setIndirectCostFactor,
  setWorkingCapitalFactor,
  setWorkingCapitalCost,
  addDirectCost,
  updateDirectCost,
  deleteDirectCost,
  addIndirectCost,
  updateIndirectCost,
  deleteIndirectCost,
  resetState,
} = electrifiedSlice.actions;

export default electrifiedSlice.reducer;
