import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SubProcess {
  baseCost: number | null;
  learningRate: number | null;
  scalingFactor: number | null;
  installationFactor: number | null;
  energyRequirement: number | null;
  efficiency: number | null;
  name: string;
}

export interface BottomUpProcess {
  baseCost: string;
  learningRate: string;
  scalingFactor: string;
  installationFactor: string;
  energyRequirement: string;
  efficiency: string;
  name: string;
}

export interface Cost {
  name: string;
  cost: string;
  error?: string;
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
    bottomUpProcess: BottomUpProcess;
    waterRequirement: string;
    installationCost: string;
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
          installationFactor: 33,
          scalingFactor: 100,
          learningRate: 13,
          efficiency: 40,
          energyRequirement: 0.986181293,
        },
        {
          name: "SubProcess 2",
          baseCost: 2.252380011,
          installationFactor: 0,
          scalingFactor: 49,
          learningRate: 10,
          efficiency: 100,
          energyRequirement: 0.034624043,
        },
        {
          name: "SubProcess 3",
          baseCost: 9.256259378,
          installationFactor: 70,
          scalingFactor: 50,
          learningRate: 10,
          efficiency: 100,
          energyRequirement: 0.0778,
        },
      ] as SubProcess[],
      directCosts: [{ name: "", cost: "" } as Cost],
      indirectCosts: [{ name: "", cost: "" } as Cost],
      workingCapitalCost: "",
      directCostFactor: 33,
      indirectCostFactor: 50,
      workingCapitalFactor: 5,
      bottomUpCalc: false,
      installationCost: "",
      waterRequirement: "1.58",
      bottomUpProcess: {
        name: "",
        baseCost: "",
        installationFactor: "",
        scalingFactor: "",
        learningRate: "",
        efficiency: "",
        energyRequirement: "",
      } as BottomUpProcess,
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
    addDirectCostError: (
      state,
      action: PayloadAction<{ index: number; error: string }>,
    ) => {
      if (action.payload.index < state.value.directCosts.length) {
        state.value.directCosts[action.payload.index].error =
          action.payload.error;
      }
    },
    addIndirectCostError: (
      state,
      action: PayloadAction<{ index: number; error: string }>,
    ) => {
      if (action.payload.index < state.value.indirectCosts.length) {
        state.value.indirectCosts[action.payload.index].error =
          action.payload.error;
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
    updateBottomUpProcess: (state, action: PayloadAction<BottomUpProcess>) => {
      state.value.bottomUpProcess = action.payload;
    },
    setInstallationCost: (state, action: PayloadAction<string>) => {
      state.value.installationCost = action.payload;
    },
    setWaterRequirement: (state, action: PayloadAction<string>) => {
      state.value.waterRequirement = action.payload;
    },
    resetState: (state) => {
      state.value = {
        subProcesses: [
          {
            name: "SubProcess 1",
            baseCost: 2.001468915,
            installationFactor: 33,
            scalingFactor: 100,
            learningRate: 13,
            efficiency: 40,
            energyRequirement: 0.986181293,
          },
          {
            name: "SubProcess 2",
            baseCost: 2.252380011,
            installationFactor: 0,
            scalingFactor: 49,
            learningRate: 10,
            efficiency: 100,
            energyRequirement: 0.034624043,
          },
          {
            name: "SubProcess 3",
            baseCost: 9.256259378,
            installationFactor: 70,
            scalingFactor: 50,
            learningRate: 10,
            efficiency: 100,
            energyRequirement: 0.0778,
          },
        ],
        directCosts: [{ name: "", cost: "" }],
        indirectCosts: [{ name: "", cost: "" }],
        workingCapitalCost: "",
        directCostFactor: 33,
        indirectCostFactor: 50,
        workingCapitalFactor: 5,
        bottomUpCalc: false,
        installationCost: "",
        waterRequirement: "",
        bottomUpProcess: {
          name: "",
          baseCost: "",
          installationFactor: "",
          scalingFactor: "",
          learningRate: "",
          efficiency: "",
          energyRequirement: "",
        },
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
  addDirectCostError,
  setIndirectCostFactor,
  addIndirectCostError,
  setWorkingCapitalFactor,
  setWorkingCapitalCost,
  addDirectCost,
  updateDirectCost,
  deleteDirectCost,
  addIndirectCost,
  updateIndirectCost,
  deleteIndirectCost,
  updateBottomUpProcess,
  setInstallationCost,
  setWaterRequirement,
  resetState,
} = electrifiedSlice.actions;

export default electrifiedSlice.reducer;
