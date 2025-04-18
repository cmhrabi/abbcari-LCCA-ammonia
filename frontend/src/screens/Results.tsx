import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Text from "../design/Text/Text";
import Breadcrumbs from "../design/Breadcumbs/Breadcrumbs";
import { useAppSelector } from "../hooks";
import ResultsCard from "../design/ResultsCard/ResultsCard";
import AdjustableCard from "../design/AdjustableCard/AdjustableCard";
import LCCALineChart from "../components/Charts/LCCALineChart";
import CostChart from "../components/Charts/CostChart";
import Button from "../design/Button/Button";
import { useLocation } from "react-router-dom";
import EmissionsChart from "../components/Charts/EmmissionsChart";
import { addToast, Checkbox, Spinner, useDisclosure } from "@heroui/react";
import { cleanData, postAnalysis } from "../api";
import { generatePDF } from "../utils/utils";
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

  const [showOriginal, setShowOriginal] = useState(false);

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

  const [lccaDataLocal, setLccaDataLocal] = useState<LCCAData>({
    LCCA: [],
    capex_elec: [],
    capex_conv: [],
    capex_loss_conv: [],
    opex_elec: [],
    opex_conv: [],
    import_export: [],
    emissions_elec: [],
    emissions_conv: [],
  });
  const [lccaDataLocalAdjusted, setLccaDataLocalAdjusted] =
    useState<LCCAData>(lccaData);

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
          if (lccaDataLocal.LCCA.length === 0) {
            setLccaDataLocal(lccaDataLocalAdjusted);
          }
          setLccaDataLocalAdjusted(response);
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

  const [chartData, setChartData] = useState([
    {
      id: "LCCA",
      data: constructData(lccaDataLocalAdjusted.LCCA),
    },
  ]);
  useEffect(() => {
    setChartData(
      lccaDataLocal.LCCA.length > 0
        ? showOriginal
          ? [
              {
                id: "Original LCCA",
                data: constructData(lccaDataLocal.LCCA),
              },
              {
                id: "New LCCA",
                data: constructData(lccaDataLocalAdjusted.LCCA),
              },
            ]
          : [
              {
                id: "New LCCA",
                data: constructData(lccaDataLocalAdjusted.LCCA),
              },
            ]
        : [
            {
              id: "LCCA",
              data: constructData(lccaDataLocalAdjusted.LCCA),
            },
          ],
    );
  }, [lccaDataLocal, lccaDataLocalAdjusted, showOriginal]);

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
                value={`$${(lccaDataLocalAdjusted.capex_elec[0] + lccaDataLocalAdjusted.opex_elec[0] + lccaDataLocalAdjusted.capex_loss_conv[0]).toFixed(2)} Million`}
                caption={`if you implemented the ${tech1Name} technology`}
              />
              <ResultsCard
                title="Emissions reduced"
                value={
                  <div>
                    {(
                      (lccaDataLocalAdjusted.emissions_conv[
                        lccaDataLocalAdjusted.emissions_conv.length - 1
                      ] -
                        lccaDataLocalAdjusted.emissions_elec[
                          lccaDataLocalAdjusted.emissions_elec.length - 1
                        ]) /
                      1000000
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
                      lccaDataLocalAdjusted.LCCA.reduce(
                        (average, a) => (a > 0 ? average + a : average),
                        0,
                      ) / lccaDataLocalAdjusted.LCCA.length
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
                    <>
                      <div className="pb-3">
                        Projected LCCA (Levelized cost of carbon abatement) from{" "}
                        {startYear} to {finalYear} ($/tCO<sub>2</sub>eq)
                      </div>
                      {lccaDataLocal.LCCA.length > 0 && (
                        <Checkbox
                          color="primary"
                          isSelected={showOriginal}
                          defaultSelected={showOriginal}
                          onChange={(e) => {
                            setShowOriginal(e.target.checked);
                          }}
                        >
                          <Text textSize="sub2">
                            Show original LCCA analysis
                          </Text>
                        </Checkbox>
                      )}
                    </>
                  }
                  data={chartData}
                />
              </div>
              <div className="flex flex-col justify-between">
                <CostChart
                  cost_title="Total Cost of Implementing the Electrified Process"
                  cost_data={[
                    {
                      id: "CAPEX",
                      data: constructData(lccaDataLocalAdjusted.capex_elec),
                    },
                    {
                      id: "Import/Export",
                      data: constructData(
                        removeNegatives(lccaDataLocalAdjusted.import_export),
                      ),
                    },
                    {
                      id: "OPEX",
                      data: constructData(lccaDataLocalAdjusted.opex_elec),
                    },
                  ]}
                />
                <EmissionsChart
                  emissions_title="Cumulative Lifetime Emissions"
                  emissions_data={[
                    {
                      id: "Conventional",
                      data: constructData(lccaDataLocalAdjusted.emissions_conv),
                    },
                    {
                      id: "Electrical",
                      data: constructData(lccaDataLocalAdjusted.emissions_elec),
                    },
                  ]}
                />
              </div>
            </div>
            <AdjustableCard onClickAdjust={onClickAdjust} />
          </div>
        </div>
        <div className="pt-14 space-x-5">
          <Button color="grey" onClick={onClickStartNew}>
            Start Another Analysis
          </Button>
        </div>
      </div>

      <StartNewModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default Results;
