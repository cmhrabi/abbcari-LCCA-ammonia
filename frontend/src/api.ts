import { ConventionalState } from "./Slices/conventionalSlice";
import { ElectrifiedState } from "./Slices/electrifiedSlice";
import { GeneralState } from "./Slices/generalSlice";
import { NameState } from "./Slices/nameSlice";

type SubProcess = {
  name: string;
  baseline_cost: number;
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
  subprocesses: SubProcess[];
  depreciation?: number; // Optional field for conventional process
  duration?: number; // Optional field for conventional process
  onsite_upstream_emmisions?: number; // Optional field for conventional process
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
): Payload => {
  const electrifiedSubProcesses = electrifiedSlice.value.subProcesses.map(
    (subProcess) => {
      return {
        name: subProcess.name,
        baseline_cost: subProcess.baseCost,
        installation_factor: subProcess.installationFactor,
        scaling_factor: subProcess.scalingFactor,
        learning_rate: subProcess.learningRate,
        efficiency: subProcess.efficiency,
        energy_req: subProcess.energyRequirement,
      };
    },
  );

  const conventionalSubProcesses = conventionalSlice.value.subProcesses.map(
    (subProcess) => {
      return {
        name: subProcess.name,
        baseline_cost: subProcess.baseCost,
        installation_factor: subProcess.installationFactor,
        scaling_factor: subProcess.scalingFactor,
        learning_rate: subProcess.learningRate,
        efficiency: subProcess.efficiency,
        energy_req: subProcess.energyRequirement,
        ng_req: 0,
      };
    },
  );

  conventionalSubProcesses[0].ng_req = 0.887651929;

  return {
    name: nameSlice.value.analysisName,
    electrified: {
      name: nameSlice.value.tech1Name,
      direct_cost_factor: electrifiedSlice.value.directCostFactor,
      indirect_cost_factor: electrifiedSlice.value.indirectCostFactor,
      wc_cost_factor: electrifiedSlice.value.workingCapitalFactor,
      subprocesses: electrifiedSubProcesses,
    },
    conventional: {
      name: nameSlice.value.tech2Name,
      direct_cost_factor: conventionalSlice.value.directCostFactor,
      indirect_cost_factor: conventionalSlice.value.indirectCostFactor,
      wc_cost_factor: conventionalSlice.value.workingCapitalFactor,
      depreciation: conventionalSlice.value.depreciationPercent,
      duration: conventionalSlice.value.duration,
      subprocesses: conventionalSubProcesses,
      onsite_upstream_emmisions: 10.82,
    },
    lcca_type: nameSlice.value.type,
    start_year: generalSlice.value.startYear,
    final_year: generalSlice.value.finalYear,
    discount_rate: parseFloat(generalSlice.value.discount),
    province: generalSlice.value.province,
    operating_hours: generalSlice.value.plantOperatingHours,
    final_demand: parseFloat(generalSlice.value.finalDemand),
    baseline_demand: parseFloat(generalSlice.value.baselineDemand),
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
