import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConvSubProcess {
  baseCost: number | null;
  learningRate: number | null;
  scalingFactor: number | null;
  installationFactor: number | null;
  energyRequirement: number | null;
  efficiency: number | null;
  ngReq?: number | null;
  name: string;
}

export interface Cost {
  name: string;
  cost: string;
  error?: string;
}

export interface ConventionalState {
  value: {
    subProcesses: ConvSubProcess[];
    directCosts: Cost[];
    indirectCosts: Cost[];
    workingCapitalCost: string;
    installationCost: string;
    directCostFactor: number;
    indirectCostFactor: number;
    workingCapitalFactor: number;
    bottomUpCalc: boolean;
    depreciationPercent: number;
    duration: number;
    onsiteEmissions: string;
    upstreamEmissions: string;
    waterRequirement: string;
    bottomUpProcess: ConvSubProcess;
  };
}

export const conventionalSlice = createSlice({
  name: "conventional",
  initialState: {
    value: {
      subProcesses: [
        {
          name: "SubProcess 1",
          baseCost: 6.373533174,
          installationFactor: 0,
          scalingFactor: 66.63,
          learningRate: 11,
          efficiency: 100,
          energyRequirement: 0.017,
          ngReq: 0.887651929,
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
      ] as ConvSubProcess[],
      directCosts: [{ name: "", cost: "" } as Cost],
      indirectCosts: [{ name: "", cost: "" } as Cost],
      workingCapitalCost: "",
      installationCost: "",
      directCostFactor: 33,
      indirectCostFactor: 50,
      workingCapitalFactor: 5,
      bottomUpCalc: false,
      depreciationPercent: 11.8,
      duration: 20,
      onsiteEmissions: "5.41",
      upstreamEmissions: "5.41",
      waterRequirement: "0.0791",
      bottomUpProcess: {
        name: "",
        baseCost: null,
        installationFactor: null,
        scalingFactor: null,
        learningRate: null,
        efficiency: null,
        energyRequirement: null,
        ngReq: null,
      } as ConvSubProcess,
    },
  },
  reducers: {
    addSubProcess: (state, action: PayloadAction<ConvSubProcess>) => {
      state.value.subProcesses.push(action.payload);
    },
    updateSubProcess: (
      state,
      action: PayloadAction<{ index: number; subProcess: ConvSubProcess }>,
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
    setDepreciationPercent: (state, action: PayloadAction<number>) => {
      state.value.depreciationPercent = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.value.duration = action.payload;
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
    updateBottomUpProcess: (state, action: PayloadAction<ConvSubProcess>) => {
      state.value.bottomUpProcess = action.payload;
    },
    setUpstreamEmissions: (state, action: PayloadAction<string>) => {
      state.value.upstreamEmissions = action.payload;
    },
    setOnsightEmissions: (state, action: PayloadAction<string>) => {
      state.value.onsiteEmissions = action.payload;
    },
    setWaterRequirement: (state, action: PayloadAction<string>) => {
      state.value.waterRequirement = action.payload;
    },
    setInstallationCost: (state, action: PayloadAction<string>) => {
      state.value.installationCost = action.payload;
    },
    resetState: (state) => {
      state.value = {
        subProcesses: [
          {
            name: "SubProcess 1",
            baseCost: 6.373533174,
            installationFactor: 0,
            scalingFactor: 66.63,
            learningRate: 11,
            efficiency: 100,
            energyRequirement: 0.017,
            ngReq: 0.887651929,
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
        installationCost: "",
        workingCapitalCost: "",
        directCostFactor: 33,
        indirectCostFactor: 50,
        workingCapitalFactor: 5,
        bottomUpCalc: false,
        depreciationPercent: 11.8,
        duration: 20,
        onsiteEmissions: "5.41",
        upstreamEmissions: "5.41",
        waterRequirement: "0.0791",
        bottomUpProcess: {
          name: "",
          baseCost: 0,
          installationFactor: 0,
          scalingFactor: 0,
          learningRate: 0,
          efficiency: 0,
          energyRequirement: 0,
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
  setDepreciationPercent,
  setDuration,
  updateBottomUpProcess,
  setUpstreamEmissions,
  setOnsightEmissions,
  setWaterRequirement,
  setInstallationCost,
  resetState,
} = conventionalSlice.actions;

export default conventionalSlice.reducer;
