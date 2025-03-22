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
        electrifiedSlice.value.bottomUpProcess.installationFactor / 100,
      scaling_factor:
        electrifiedSlice.value.bottomUpProcess.scalingFactor / 100,
      learning_rate: electrifiedSlice.value.bottomUpProcess.learningRate / 100,
      efficiency: electrifiedSlice.value.bottomUpProcess.efficiency / 100,
      energy_req: electrifiedSlice.value.bottomUpProcess.energyRequirement,
    });
  } else {
    electrifiedSlice.value.subProcesses.map((subProcess) => {
      electrifiedSubProcesses.push({
        name: subProcess.name,
        baseline_cost: subProcess.baseCost,
        installation_factor: subProcess.installationFactor / 100,
        scaling_factor: subProcess.scalingFactor / 100,
        learning_rate: subProcess.learningRate / 100,
        efficiency: subProcess.efficiency / 100,
        energy_req: subProcess.energyRequirement,
      });
    });
  }

  const conventionalSubProcesses: SubProcess[] = [];
  if (conventionalSlice.value.bottomUpCalc) {
    conventionalSubProcesses.push({
      name: conventionalSlice.value.bottomUpProcess.name,
      installation_factor:
        conventionalSlice.value.bottomUpProcess.installationFactor / 100,
      scaling_factor:
        conventionalSlice.value.bottomUpProcess.scalingFactor / 100,
      learning_rate: conventionalSlice.value.bottomUpProcess.learningRate / 100,
      efficiency: conventionalSlice.value.bottomUpProcess.efficiency / 100,
      energy_req: conventionalSlice.value.bottomUpProcess.energyRequirement,
    });
  } else {
    conventionalSlice.value.subProcesses.map((subProcess) => {
      conventionalSubProcesses.push({
        name: subProcess.name,
        baseline_cost: subProcess.baseCost,
        installation_factor: subProcess.installationFactor / 100,
        scaling_factor: subProcess.scalingFactor / 100,
        learning_rate: subProcess.learningRate / 100,
        efficiency: subProcess.efficiency / 100,
        energy_req: subProcess.energyRequirement,
        ng_req: subProcess.ngReq,
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

export { cleanData, postAnalysis };
export type { LCCAOutput };
