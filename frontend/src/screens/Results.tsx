import React, { useState } from "react";
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
import { addToast, Spinner, useDisclosure } from "@heroui/react";
import { cleanData, postAnalysis } from "../api";
import { generatePDF } from "../utils/utils";
import StartNew from "./StartNew";
import StartNewModal from "../components/StartNewModal/StartNew";

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

const Results = () => {
  const analysisName = useAppSelector((state) => state.name.value.analysisName);
  const tech1Name = useAppSelector((state) => state.name.value.tech1Name);
  const tech2Name = useAppSelector((state) => state.name.value.tech2Name);
  const startYear = useAppSelector((state) => state.general.value.startYear);
  const finalYear = useAppSelector((state) => state.general.value.finalYear);
  const electrifiedSlice = useAppSelector((state) => state.electrified);
  const conventionalSlice = useAppSelector((state) => state.conventional);
  const generalSlice = useAppSelector((state) => state.general);
  const nameSlice = useAppSelector((state) => state.name);

  const [exportLoading, setExportLoading] = useState(false);
  const generateResultPDF = async () => {
    await generatePDF("results_export", `${tech1Name}_vs_${tech2Name}_LCCA`);
    setExportLoading(false);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const onClickStartNew = () => {
    onOpen();
  };

  const location = useLocation();
  const lccaData = location.state.lccaData as LCCAData;

  const [lccaDataLocal, setLccaDataLocal] = useState(lccaData);

  const onClickAdjust = async () => {
    const data = cleanData(
      electrifiedSlice,
      conventionalSlice,
      nameSlice,
      generalSlice,
    );
    if (data.error !== "") {
      addToast({
        title: "Error in analysis",
        description: data.error,
        classNames: {
          base: "bg-danger-bg rounded-3px border-danger",
          description: "text-grey-dark",
          icon: "text-danger",
        },
        severity: "danger",
      });
      return;
    }

    if (data.payload) {
      const result = await postAnalysis(data.payload);
      if (result) {
        const response = await result.response;
        if (result.error !== "") {
          addToast({
            title: "Error in analysis",
            description: result.error,
            classNames: {
              base: "bg-danger-bg rounded-3px border-danger",
              description: "text-grey-dark",
              icon: "text-danger",
            },
            severity: "danger",
          });
        } else {
          setLccaDataLocal(response);
        }
      }
    }
  };

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
        <div id="results_export">
          <div>
            <Text color="secondary" textSize="h2">
              “{tech1Name} vs. {tech2Name}” Results
            </Text>
          </div>

          <div className="pt-12 pb-3 justify-between flex flex-row items-end">
            <Text color="secondary" textSize="results-title">
              Overview
            </Text>
            <Button
              color="primary"
              onClick={() => {
                setExportLoading(true);
                generateResultPDF();
              }}
            >
              {exportLoading ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Export to PDF"
              )}
            </Button>
          </div>
          <div className="space-y-12">
            <div className="pt-4 grid grid-cols-3 gap-7">
              <ResultsCard
                title="Your initial investment"
                value={`$${(lccaDataLocal.capex_elec[0] + lccaDataLocal.opex_elec[0] + lccaDataLocal.capex_loss_conv[0]).toFixed(2)} Million`}
                caption={`if you implemented the ${tech1Name} technology`}
              />
              <ResultsCard
                title="Emissions reduced"
                value={
                  <div>
                    {(
                      lccaDataLocal.emissions_conv[
                        lccaDataLocal.emissions_conv.length - 1
                      ] -
                      lccaDataLocal.emissions_elec[
                        lccaDataLocal.emissions_elec.length - 1
                      ]
                    ).toExponential(2)}{" "}
                    tCO<sub>2</sub>eq
                  </div>
                }
                caption={`over ${finalYear - startYear} years`}
              />
              <ResultsCard
                title={
                  <div>
                    Average yearly cost per tonne of CO<sub>2</sub> abated
                  </div>
                }
                value={
                  <div>
                    $
                    {(
                      lccaDataLocal.LCCA.reduce(
                        (average, a) => (a > 0 ? average + a : average),
                        0,
                      ) / lccaDataLocal.LCCA.length
                    ).toFixed(2)}{" "}
                    /tCO<sub>2</sub>eq
                  </div>
                }
                caption={`per year`}
              />
            </div>
            <div className="flex flex-row">
              <div className="w-2/3">
                <LCCALineChart
                  title={
                    <div>
                      Projected LCCA (Levelized cost of carbon abatement) from{" "}
                      {startYear} to {finalYear} ($/tCO<sub>2</sub>eq)
                    </div>
                  }
                  data={[
                    { id: "LCCA", data: constructData(lccaDataLocal.LCCA) },
                  ]}
                />
              </div>
              <div className="w-1/3">
                <AdjustableCard onClickAdjust={onClickAdjust} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-7">
              <CostChart
                cost_title="Total Cost of Implementing the Electrified Process"
                cost_data={[
                  {
                    id: "CAPEX",
                    data: constructData(lccaDataLocal.capex_elec),
                  },
                  {
                    id: "Import/Export",
                    data: constructData(
                      removeNegatives(lccaDataLocal.import_export),
                    ),
                  },
                  { id: "OPEX", data: constructData(lccaDataLocal.opex_elec) },
                ]}
              />
              <EmissionsChart
                emissions_title="Cumulative Lifetime Emissions"
                emissions_data={[
                  {
                    id: "Conventional",
                    data: constructData(lccaDataLocal.emissions_conv),
                  },
                  {
                    id: "Electrical",
                    data: constructData(lccaDataLocal.emissions_elec),
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="pt-14 space-x-5">
          <Button color="grey" onClick={onClickStartNew}>
            Start another analysis
          </Button>
        </div>
      </div>
      <StartNewModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default Results;
