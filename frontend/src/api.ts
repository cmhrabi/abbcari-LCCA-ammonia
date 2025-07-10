import { ConventionalState } from "./Slices/conventionalSlice";
import { ElectrifiedState } from "./Slices/electrifiedSlice";
import { GeneralState } from "./Slices/generalSlice";
import { NameState } from "./Slices/nameSlice";

type Cost = {
  name: string;
  cost: number;
};

type SubProcess = {
  name: string;
  baseline_cost?: number;
  installation_factor: number;
  scaling_factor: number;
  learning_rate: number;
  efficiency: number;
  energy_req: number;
  ng_req?: number; // Optional field
};

type Process = {
  name: string;
  direct_cost_factor: number;
  indirect_cost_factor: number;
  wc_cost_factor: number;
  wc_cost?: number;
  installation_cost?: number; // Optional field
  direct_costs?: Cost[]; // Optional field
  indirect_costs?: Cost[]; // Optional field
  subprocesses: SubProcess[];
  water_consumption: number;
  depreciation?: number; // Optional field for conventional process
  duration?: number; // Optional field for conventional process
  onsite_upstream_emmisions?: number; // Optional field for conventional process
  bottom_up: boolean; // Optional field for conventional process
};

type Payload = {
  name: string;
  electrified: Process;
  conventional: Process;
  lcca_type: string;
  start_year: number;
  final_year: number;
  discount_rate: number;
  province: string;
  operating_hours: number;
  final_demand: number;
  baseline_demand: number;
};

type PayloadAnalysis = {
  _id: string;
  name: string;
  electrified: Process;
  conventional: Process;
  lcca_type: string;
  start_year: number;
  final_year: number;
  discount_rate: number;
  province: string;
  operating_hours: number;
  final_demand: number;
  baseline_demand: number;
};

type LCCAOutput = {
  LCCA: number[];
  capex_conv: number[];
  capex_elec: number[];
  emissions_conv: number[];
  emissions_e: number[];
  import_export: number[];
  opex_conv: number[];
  opex_elec: number[];
};

type AnalysesResponse = {
  error: string;
  response: string | null;
  analyses: AnalysisName[];
};

type AnalysisName = {
  id: string;
  name: string;
};

type UnpackedSlices = {
  electrifiedSlice: ElectrifiedState["value"];
  conventionalSlice: ConventionalState["value"];
  nameSlice: NameState["value"];
  generalSlice: GeneralState["value"];
};

const unpackData = (payload: PayloadAnalysis): UnpackedSlices => {
  // Helper to parse costs array
  const parseCosts = (costs?: Cost[]) =>
    (costs || []).map((cost) => ({
      name: cost.name,
      cost: cost.cost.toString(),
    }));

  // Electrified Slice
  const electrifiedSlice: ElectrifiedState["value"] = {
    directCostFactor: payload.electrified.direct_cost_factor * 100,
    indirectCostFactor: payload.electrified.indirect_cost_factor * 100,
    workingCapitalFactor: payload.electrified.wc_cost_factor * 100,
    workingCapitalCost: payload.electrified.wc_cost?.toString() || "0",
    installationCost: payload.electrified.installation_cost?.toString() || "0",
    directCosts: parseCosts(payload.electrified.direct_costs),
    indirectCosts: parseCosts(payload.electrified.indirect_costs),
    waterRequirement: payload.electrified.water_consumption.toString(),
    bottomUpCalc: payload.electrified.bottom_up,
    bottomUpProcess: payload.electrified.bottom_up
      ? {
          name: payload.electrified.subprocesses[0]?.name || "",
          baseCost:
            payload.electrified.subprocesses[0]?.baseline_cost?.toString() ||
            "0",
          installationFactor:
            (payload.electrified.subprocesses[0]?.installation_factor ?? 0) *
              100 +
            "",
          scalingFactor:
            (payload.electrified.subprocesses[0]?.scaling_factor ?? 0) * 100 +
            "",
          learningRate:
            (payload.electrified.subprocesses[0]?.learning_rate ?? 0) * 100 +
            "",
          efficiency:
            (payload.electrified.subprocesses[0]?.efficiency ?? 0) * 100 + "",
          energyRequirement:
            payload.electrified.subprocesses[0]?.energy_req?.toString() || "0",
        }
      : {
          name: "",
          baseCost: "0",
          installationFactor: "0",
          scalingFactor: "0",
          learningRate: "0",
          efficiency: "0",
          energyRequirement: "0",
        },
    subProcesses: payload.electrified.bottom_up
      ? []
      : payload.electrified.subprocesses.map((sp) => ({
          name: sp.name,
          baseCost: sp.baseline_cost ?? 0,
          installationFactor: (sp.installation_factor ?? 0) * 100,
          scalingFactor: (sp.scaling_factor ?? 0) * 100,
          learningRate: (sp.learning_rate ?? 0) * 100,
          efficiency: (sp.efficiency ?? 0) * 100,
          energyRequirement: sp.energy_req ?? 0,
        })),
  };

  // Conventional Slice
  const conventionalSlice: ConventionalState["value"] = {
    directCostFactor: payload.conventional.direct_cost_factor * 100,
    indirectCostFactor: payload.conventional.indirect_cost_factor * 100,
    workingCapitalFactor: payload.conventional.wc_cost_factor * 100,
    workingCapitalCost: payload.conventional.wc_cost?.toString() || "0",
    installationCost: payload.conventional.installation_cost?.toString() || "0",
    directCosts: parseCosts(payload.conventional.direct_costs),
    indirectCosts: parseCosts(payload.conventional.indirect_costs),
    waterRequirement: payload.conventional.water_consumption.toString(),
    bottomUpCalc: payload.conventional.bottom_up,
    depreciationPercent: (payload.conventional.depreciation ?? 0) * 100,
    duration: payload.conventional.duration ?? 0,
    onsiteEmissions: (
      (payload.conventional.onsite_upstream_emmisions ?? 0) / 2
    ).toString(),
    upstreamEmissions: (
      (payload.conventional.onsite_upstream_emmisions ?? 0) / 2
    ).toString(),
    bottomUpProcess: payload.conventional.bottom_up
      ? {
          name: payload.conventional.subprocesses[0]?.name || "",
          baseCost:
            payload.conventional.subprocesses[0]?.baseline_cost?.toString() ||
            "0",
          installationFactor:
            (payload.conventional.subprocesses[0]?.installation_factor ?? 0) *
              100 +
            "",
          scalingFactor:
            (payload.conventional.subprocesses[0]?.scaling_factor ?? 0) * 100 +
            "",
          learningRate:
            (payload.conventional.subprocesses[0]?.learning_rate ?? 0) * 100 +
            "",
          efficiency:
            (payload.conventional.subprocesses[0]?.efficiency ?? 0) * 100 + "",
          energyRequirement:
            payload.conventional.subprocesses[0]?.energy_req?.toString() || "0",
          ngReq:
            payload.conventional.subprocesses[0]?.ng_req?.toString() || "0",
        }
      : {
          name: "",
          baseCost: "0",
          installationFactor: "0",
          scalingFactor: "0",
          learningRate: "0",
          efficiency: "0",
          energyRequirement: "0",
          ngReq: "0",
        },
    subProcesses: payload.conventional.bottom_up
      ? []
      : payload.conventional.subprocesses.map((sp) => ({
          name: sp.name,
          baseCost: sp.baseline_cost ?? 0,
          installationFactor: (sp.installation_factor ?? 0) * 100,
          scalingFactor: (sp.scaling_factor ?? 0) * 100,
          learningRate: (sp.learning_rate ?? 0) * 100,
          efficiency: (sp.efficiency ?? 0) * 100,
          energyRequirement: sp.energy_req ?? 0,
          ngReq: sp.ng_req ?? 0,
        })),
  };

  // Name Slice
  const nameSlice: NameState["value"] = {
    analysisId: payload._id,
    analysisName: payload.name,
    tech1Name: payload.electrified.name,
    tech2Name: payload.conventional.name,
    type: payload.lcca_type,
  };

  const generalSlice: GeneralState["value"] = {
    startYear: payload.start_year,
    finalYear: payload.final_year,
    discount: (payload.discount_rate ?? 0) * 100 + "",
    province: payload.province,
    plantOperatingHours: payload.operating_hours,
    finalDemand: payload.final_demand.toString(),
    baselineDemand: payload.baseline_demand.toString(),
  };

  return { electrifiedSlice, conventionalSlice, nameSlice, generalSlice };
};

const cleanData = (
  electrifiedSlice: ElectrifiedState,
  conventionalSlice: ConventionalState,
  nameSlice: NameState,
  generalSlice: GeneralState,
): { error: string; payload: Payload | null } => {
  const electrifiedSubProcesses: SubProcess[] = [];
  if (electrifiedSlice.value.bottomUpCalc) {
    electrifiedSubProcesses.push({
      name: electrifiedSlice.value.bottomUpProcess.name,
      installation_factor:
        (parseFloat(
          electrifiedSlice.value.bottomUpProcess.installationFactor,
        ) ?? 0) / 100,
      scaling_factor:
        (parseFloat(electrifiedSlice.value.bottomUpProcess.scalingFactor) ??
          0) / 100,
      learning_rate:
        (parseFloat(electrifiedSlice.value.bottomUpProcess.learningRate) ?? 0) /
        100,
      efficiency:
        (parseFloat(electrifiedSlice.value.bottomUpProcess.efficiency) ?? 0) /
        100,
      energy_req:
        parseFloat(electrifiedSlice.value.bottomUpProcess.energyRequirement) ??
        0,
    });
  } else {
    electrifiedSlice.value.subProcesses.map((subProcess) => {
      electrifiedSubProcesses.push({
        name: subProcess.name,
        baseline_cost: subProcess.baseCost ?? 0,
        installation_factor: (subProcess.installationFactor ?? 0) / 100,
        scaling_factor: (subProcess.scalingFactor ?? 0) / 100,
        learning_rate: (subProcess.learningRate ?? 0) / 100,
        efficiency: (subProcess.efficiency ?? 0) / 100,
        energy_req: subProcess.energyRequirement ?? 0,
      });
    });
  }

  const conventionalSubProcesses: SubProcess[] = [];
  if (conventionalSlice.value.bottomUpCalc) {
    conventionalSubProcesses.push({
      name: conventionalSlice.value.bottomUpProcess.name,
      installation_factor:
        (parseFloat(
          conventionalSlice.value.bottomUpProcess.installationFactor,
        ) ?? 0) / 100,
      scaling_factor:
        (parseFloat(conventionalSlice.value.bottomUpProcess.scalingFactor) ??
          0) / 100,
      learning_rate:
        (parseFloat(conventionalSlice.value.bottomUpProcess.learningRate) ??
          0) / 100,
      efficiency:
        (parseFloat(conventionalSlice.value.bottomUpProcess.efficiency) ?? 0) /
        100,
      energy_req:
        parseFloat(conventionalSlice.value.bottomUpProcess.energyRequirement) ??
        0,
    });
  } else {
    conventionalSlice.value.subProcesses.map((subProcess) => {
      conventionalSubProcesses.push({
        name: subProcess.name,
        baseline_cost: subProcess.baseCost ?? 0,
        installation_factor: (subProcess.installationFactor ?? 0) / 100,
        scaling_factor: (subProcess.scalingFactor ?? 0) / 100,
        learning_rate: (subProcess.learningRate ?? 0) / 100,
        efficiency: (subProcess.efficiency ?? 0) / 100,
        energy_req: subProcess.energyRequirement ?? 0,
        ng_req: subProcess.ngReq ?? 0,
      });
    });
  }

  if (electrifiedSubProcesses.length <= 0) {
    return { error: "Please add electrified sub processes", payload: null };
  }

  if (conventionalSubProcesses.length <= 0) {
    return { error: "Please add conventional sub processes", payload: null };
  }

  return {
    error: "",
    payload: {
      name: nameSlice.value.analysisName,
      electrified: {
        name: nameSlice.value.tech1Name,
        direct_cost_factor: electrifiedSlice.value.directCostFactor / 100,
        indirect_cost_factor: electrifiedSlice.value.indirectCostFactor / 100,
        wc_cost_factor: electrifiedSlice.value.workingCapitalFactor / 100,
        wc_cost: parseFloat(electrifiedSlice.value.workingCapitalCost) || 0,
        installation_cost:
          parseFloat(electrifiedSlice.value.installationCost) || 0,
        direct_costs: electrifiedSlice.value.directCosts.map((cost) => ({
          ...cost,
          cost: parseFloat(cost.cost) || 0,
        })),
        indirect_costs: electrifiedSlice.value.indirectCosts.map((cost) => ({
          ...cost,
          cost: parseFloat(cost.cost) || 0,
        })),
        subprocesses: electrifiedSubProcesses,
        water_consumption: parseFloat(electrifiedSlice.value.waterRequirement),
        bottom_up: electrifiedSlice.value.bottomUpCalc,
      },
      conventional: {
        name: nameSlice.value.tech2Name,
        bottom_up: conventionalSlice.value.bottomUpCalc,
        direct_cost_factor: conventionalSlice.value.directCostFactor / 100,
        indirect_cost_factor: conventionalSlice.value.indirectCostFactor / 100,
        wc_cost_factor: conventionalSlice.value.workingCapitalFactor / 100,
        wc_cost: parseFloat(conventionalSlice.value.workingCapitalCost) || 0,
        installation_cost:
          parseFloat(conventionalSlice.value.installationCost) || 0,
        direct_costs: conventionalSlice.value.directCosts.map((cost) => ({
          ...cost,
          cost: parseFloat(cost.cost) || 0,
        })),
        indirect_costs: conventionalSlice.value.indirectCosts.map((cost) => ({
          ...cost,
          cost: parseFloat(cost.cost) || 0,
        })),
        depreciation: conventionalSlice.value.depreciationPercent / 100,
        duration: conventionalSlice.value.duration,
        subprocesses: conventionalSubProcesses,
        water_consumption: parseFloat(conventionalSlice.value.waterRequirement),
        onsite_upstream_emmisions:
          parseFloat(conventionalSlice.value.onsiteEmissions) +
          parseFloat(conventionalSlice.value.upstreamEmissions),
      },
      lcca_type: nameSlice.value.type,
      start_year: generalSlice.value.startYear,
      final_year: generalSlice.value.finalYear,
      discount_rate: parseFloat(generalSlice.value.discount) / 100,
      province: generalSlice.value.province,
      operating_hours: generalSlice.value.plantOperatingHours,
      final_demand: parseFloat(generalSlice.value.finalDemand),
      baseline_demand: parseFloat(generalSlice.value.baselineDemand),
    },
  };
};

const postAnalysis = async (data: Payload) => {
  return await fetch(`${process.env.REACT_APP_API}/api/calc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 200) {
        return { error: "", response: response.json() };
      }
      throw new Error(`Failed to run anlysis status: ${response.status}`);
    })
    .catch((error) => {
      return { error: error.message, response: null };
    });
};

const postLogin = async (auth0_id: string) => {
  return await fetch(`${process.env.REACT_APP_API}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ auth0_id }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((json) => {
          if (json.message === "User signed up successfully") {
            return { error: "", response: json, signedUp: true };
          }
          return { error: "", response: json, signedUp: false };
        });
      }
      throw new Error(`Failed to sign up status: ${response.status}`);
    })
    .catch((error) => {
      return { error: error.message, response: null, signedUp: false };
    });
};

const getSavedAnalyses = async (
  auth0_id: string,
): Promise<AnalysesResponse> => {
  return await fetch(`${process.env.REACT_APP_API}/api/analyses/${auth0_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((json) => {
          if (json.message === "No analyses found") {
            return { error: "", response: json, analyses: [] };
          }
          const analyses = json.map((a: { _id: string; name: string }) => ({
            id: a._id,
            name: a.name,
          }));
          return { error: "", response: json, analyses };
        });
      }
      throw new Error(`Failed to get analyses status: ${response.status}`);
    })
    .catch((error) => {
      return { error: error.message, response: null, analyses: [] };
    });
};

const getAnalysisById = async (
  auth0_id: string,
  analysisId: string,
): Promise<{ error: string; response: UnpackedSlices | null }> => {
  return await fetch(
    `${process.env.REACT_APP_API}/api/analysis/${auth0_id.replace("auth0|", "")}/${analysisId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((json) => {
          if (json.message === "Analysis not found") {
            return { error: "Analysis not found", response: null };
          }
          return { error: "", response: unpackData(json) };
        });
      }
      throw new Error(`Failed to get analysis status: ${response.status}`);
    })
    .catch((error) => {
      return { error: error.message, response: null };
    });
};

export {
  cleanData,
  postAnalysis,
  postLogin as postSignup,
  getSavedAnalyses,
  getAnalysisById,
};
export type { LCCAOutput, AnalysisName, UnpackedSlices };
