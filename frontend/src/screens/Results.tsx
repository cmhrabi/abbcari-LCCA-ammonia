import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Text from "../design/Text/Text";
import Breadcrumbs from "../design/Breadcumbs/Breadcrumbs";
import { useAppDispatch, useAppSelector } from "../hooks";
import ResultsCard from "../design/ResultsCard/ResultsCard";
import AdjustableCard from "../design/AdjustableCard/AdjustableCard";
import LCCALineChart from "../components/Charts/LCCALineChart";
import CostChart from "../components/Charts/CostChart";
import Button from "../design/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import EmissionsChart from "../components/Charts/EmmissionsChart";
import { resetState as resetStateName } from "../Slices/nameSlice";
import { resetState as resetStateGeneral } from "../Slices/generalSlice";
import { resetState as resetStateConventional } from "../Slices/conventionalSlice";
import { resetState as resetStateElectrified } from "../Slices/electrifiedSlice";

interface LCCAData {
  LCCA: number[];
  capex_elec: number[];
  capex_conv: number[];
  capex_loss_conv: number[];
  opex_elec: number[];
  opex_conv: number[];
  import_export: number[];
  emissions_elec: number[];
  emissions_conv: number[];
}

const Review = () => {
  const analysisName = useAppSelector((state) => state.name.value.analysisName);
  const tech1Name = useAppSelector((state) => state.name.value.tech1Name);
  const tech2Name = useAppSelector((state) => state.name.value.tech2Name);
  const startYear = useAppSelector((state) => state.general.value.startYear);
  const finalYear = useAppSelector((state) => state.general.value.finalYear);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClickStartnew = () => {
    dispatch(resetStateName());
    dispatch(resetStateGeneral());
    dispatch(resetStateConventional());
    dispatch(resetStateElectrified());
    navigate("/analysis/start");
  };

  const location = useLocation();
  const lccaData = location.state.lccaData as LCCAData;

  const removeNegatives = (data: number[]) => {
    return data.map((value) => (value < 0 ? 0 : value));
  };

  const constructData = (data: number[]) => {
    const chart_data = data.map((value, index) => {
      return { x: startYear + index, y: value };
    });
    return chart_data;
  };

  return (
    <>
      <NavBar title="COMPASS" />
      <div className="py-11 max-w-6xl m-auto">
        <Breadcrumbs
          items={[
            { label: "LCCA Analysis", link: "/" },
            { label: "Start New", link: "/analysis/start" },
            { label: `${analysisName} Analysis`, link: "/analysis/main" },
            { label: "Results", link: "" },
          ]}
        />
        <div>
          <Text color="secondary" textSize="h2">
            “{tech1Name} vs. {tech2Name}” Results
          </Text>
        </div>

        <div className="pt-12 pb-3 justify-between flex flex-row items-end">
          <Text color="secondary" textSize="results-title">
            Overview
          </Text>
          <Button color="primary">Export to PDF</Button>
        </div>
        <div className="space-y-12">
          <div className="pt-4 grid grid-cols-3 gap-7">
            <ResultsCard
              title="Your initial investment"
              value={`$${(lccaData.capex_elec[0] + lccaData.opex_elec[0] + lccaData.capex_loss_conv[0]).toFixed(2)} Million`}
              caption={`if you implemented the ${tech1Name} technology`}
            />
            <ResultsCard
              title="Emissions reduced"
              value={`${(lccaData.emissions_conv[lccaData.emissions_conv.length - 1] - lccaData.emissions_elec[lccaData.emissions_elec.length - 1]).toExponential(2)} tCO2eq`}
              caption={`over ${finalYear - startYear} years`}
            />
            <ResultsCard
              title="Average yearly cost per tonne of CO2 abated"
              value={`$${(
                lccaData.LCCA.reduce((average, a) => average + a, 0) /
                lccaData.LCCA.length
              ).toFixed(2)}/tCO2eq`}
              caption={`over ${finalYear - startYear} years`}
            />
          </div>
          <div className="flex flex-row">
            <div className="w-2/3">
              <LCCALineChart
                title="Projected LCCA (Levelized cost of carbon abatement) from 2025 to 2060 ($/tCO2eq)"
                data={[{ id: "LCCA", data: constructData(lccaData.LCCA) }]}
                minY={0}
                maxY={
                  Math.max(...lccaData.LCCA) + Math.max(...lccaData.LCCA) * 0.1
                }
              />
            </div>
            <div className="w-1/3">
              <AdjustableCard />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-7">
            <CostChart
              cost_title="Total Cost of Implementing the Electrified Process"
              cost_data={[
                { id: "CAPEX", data: constructData(lccaData.capex_elec) },
                {
                  id: "Import/Export",
                  data: constructData(removeNegatives(lccaData.import_export)),
                },
                { id: "OPEX", data: constructData(lccaData.opex_elec) },
              ]}
            />
            <EmissionsChart
              emissions_title="Cumulative Lifetime Emissions"
              emissions_data={[
                {
                  id: "Conventional",
                  data: constructData(lccaData.emissions_conv),
                },
                {
                  id: "Electrical",
                  data: constructData(lccaData.emissions_elec),
                },
              ]}
            />
          </div>
        </div>

        <div className="pt-14 space-x-5">
          <Button color="grey" onClick={onClickStartnew}>
            Start another analysis
          </Button>
        </div>
      </div>
    </>
  );
};

export default Review;
