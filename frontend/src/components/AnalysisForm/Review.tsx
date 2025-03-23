import React from "react";
import {
  Accordion,
  AccordionItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import Text from "../../design/Text/Text";
import Button from "../../design/Button/Button";
import { useAppSelector } from "../../hooks";
import { cleanData, postAnalysis } from "../../api";
import { addToast } from "@heroui/toast";
import { useNavigate } from "react-router-dom";

interface ReviewProps {
  setCurrStep: (arg0: number) => void;
}

type UpsideDownIconProps = React.SVGProps<SVGSVGElement>;

const Review: React.FC<ReviewProps> = ({ setCurrStep }) => {
  const generalValues = useAppSelector((state) => state.general.value);
  const tech1Name = useAppSelector((state) => state.name.value.tech1Name);
  const tech2Name = useAppSelector((state) => state.name.value.tech2Name);
  const analysisType = useAppSelector((state) => state.name.value.type);
  const conValues = useAppSelector((state) => state.conventional.value);
  const conSubProcesses = useAppSelector(
    (state) => state.conventional.value.subProcesses,
  );
  const elecSubProcesses = useAppSelector(
    (state) => state.electrified.value.subProcesses,
  );
  const elecValues = useAppSelector((state) => state.electrified.value);

  const electrifiedSlice = useAppSelector((state) => state.electrified);
  const conventionalSlice = useAppSelector((state) => state.conventional);
  const nameSlice = useAppSelector((state) => state.name);
  const generalSlice = useAppSelector((state) => state.general);

  const navigate = useNavigate();

  const onSubmit = async () => {
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
          navigate("/analysis/results", {
            state: { lccaData: response },
          });
        }
      }
    }
  };
  const UpsideDownIcon: React.FC<UpsideDownIconProps> = () => {
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.275 13.8314C13.0524 13.5854 12.672 13.5658 12.4253 13.7878C12.1786 14.0097 12.159 14.3891 12.3816 14.6352L15.5784 18.1699C15.8179 18.4347 16.2346 18.4339 16.4732 18.1683L19.6199 14.6645C19.8415 14.4176 19.8206 14.0383 19.5731 13.8172C19.3257 13.5961 18.9453 13.617 18.7237 13.8638L16.3201 16.5403C16.1615 16.7168 15.885 16.7173 15.7258 16.5413L13.275 13.8314Z"
          fill="#252A31"
        />
      </svg>
    );
  };

  return (
    <div>
      <Accordion
        selectionMode="multiple"
        variant="splitted"
        className="space-y-26"
        defaultExpandedKeys={"1"}
      >
        <AccordionItem
          className="shadow-card rounded-[10px] mb-7 mt-8 bg-grey-bg"
          key="1"
          aria-label="General Inputs"
          indicator={<UpsideDownIcon />}
          title={
            <div className="justify-between flex flex-row">
              <Text textSize="sub3">General inputs</Text>
              <Button
                size="noPadding"
                color="transparent"
                onClick={() => setCurrStep(0)}
              >
                Edit
              </Button>
            </div>
          }
        >
          <div className="shadow-card rounded-[10px] border-1 border-grey bg-white py-4 px-10">
            <div className="grid grid-cols-2 gap-y-3">
              <Text>Start year: {generalValues.startYear}</Text>
              <Text>Discount rate: {generalValues.discount}%</Text>
              <Text>Target year: {generalValues.finalYear}</Text>
              <Text>Province used in analysis: {generalValues.province}</Text>
              <Text>
                Plant operating hours: {generalValues.plantOperatingHours}
              </Text>
              <Text>
                Current electrical ammonia production:{" "}
                {parseFloat(generalValues.baselineDemand).toFixed(4)} pJ
              </Text>
              <div>
                <Text>
                  Electrical ammonia in target year:{" "}
                  {parseFloat(generalValues.finalDemand).toFixed(2)} pJ
                </Text>
              </div>
            </div>
          </div>
        </AccordionItem>

        <AccordionItem
          className="shadow-card rounded-[10px] mb-7 bg-grey-bg"
          key="2"
          aria-label="First Technology Inputs"
          indicator={<UpsideDownIcon />}
          title={
            <div className="justify-between flex flex-row">
              <Text textSize="sub3">{tech1Name} inputs</Text>
              <Button
                size="noPadding"
                color="transparent"
                onClick={() => setCurrStep(1)}
              >
                Edit
              </Button>
            </div>
          }
        >
          {elecValues.bottomUpCalc ? (
            <>
              <div className="grid grid-cols-2 pt-1 pb-4 px-6 gap-y-3 gap-x-10">
                <div>
                  <Text textSize="sub3">Direct costs</Text>
                  <Table aria-label="Direct costs table" isStriped>
                    <TableHeader>
                      <TableColumn>Name</TableColumn>
                      <TableColumn>Cost</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <>
                        {elecValues.directCosts.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="flex flex-shrink">
                                <div className="rounded-full bg-primary-50 flex items-center justify-center border-1 border-primary px-2">
                                  <Text color="primary" textSize="button-md">
                                    {item.name}
                                  </Text>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Text textSize="button-md">
                                $M {parseFloat(item.cost).toFixed(2)}
                              </Text>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow key={elecValues.indirectCosts.length}>
                          <TableCell>
                            <Text textSize="button-md">
                              <b>Total</b>
                            </Text>
                          </TableCell>
                          <TableCell>
                            <Text>
                              $M{" "}
                              {elecValues.directCosts
                                .reduce(
                                  (acc, item) => acc + parseFloat(item.cost),
                                  0,
                                )
                                .toFixed(2)}
                            </Text>
                          </TableCell>
                        </TableRow>
                      </>
                    </TableBody>
                  </Table>
                </div>
                <div>
                  <Text textSize="sub3">Indirect costs</Text>
                  <Table aria-label="Direct costs table" isStriped>
                    <TableHeader>
                      <TableColumn>Name</TableColumn>
                      <TableColumn>Cost</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <>
                        {elecValues.indirectCosts.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="flex flex-shrink">
                                <div className="rounded-full bg-primary-50 flex items-center justify-center border-1 border-primary px-2">
                                  <Text color="primary" textSize="button-md">
                                    {item.name}
                                  </Text>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Text textSize="button-md">
                                $M {parseFloat(item.cost).toFixed(2)}
                              </Text>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow key={elecValues.indirectCosts.length}>
                          <TableCell>
                            <Text textSize="button-md">
                              <b>Total</b>
                            </Text>
                          </TableCell>
                          <TableCell>
                            <Text>
                              $M{" "}
                              {elecValues.indirectCosts
                                .reduce(
                                  (acc, item) => acc + parseFloat(item.cost),
                                  0,
                                )
                                .toFixed(2)}
                            </Text>
                          </TableCell>
                        </TableRow>
                      </>
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="shadow-card rounded-[10px] border-1 border-grey bg-white py-4 mt-5 px-10">
                <div className="grid grid-cols-2 gap-y-3 gap-x-10">
                  <Text>
                    Working capital cost: $M{" "}
                    {parseFloat(elecValues.workingCapitalCost).toFixed(2)}
                  </Text>
                  <Text>
                    Installation cost: $M{" "}
                    {parseFloat(elecValues.installationCost).toFixed(2)}
                  </Text>
                  <Text>
                    Water requirement: {elecValues.waterRequirement} tH
                    <sub>2</sub>O/tNH<sub>3</sub>
                  </Text>
                  <Text>
                    Learning rate: {elecValues.bottomUpProcess.learningRate}%
                  </Text>
                  <Text>
                    Scaling factor: {elecValues.bottomUpProcess.scalingFactor}%
                  </Text>
                  <Text>
                    Installation factor:{" "}
                    {elecValues.bottomUpProcess.installationFactor}%
                  </Text>
                  <Text>
                    Efficiency: {elecValues.bottomUpProcess.efficiency}%
                  </Text>
                  <Text>
                    Energy requirement:{" "}
                    {elecValues.bottomUpProcess.energyRequirement} MW
                  </Text>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="shadow-card rounded-[10px] border-1 border-grey bg-white py-5 mb-5 px-10">
                <div className="grid grid-cols-3  gap-y-3">
                  <Text>
                    Direct cost factor: {elecValues.directCostFactor}%
                  </Text>
                  <Text>
                    Indirect cost factor: {elecValues.indirectCostFactor}%
                  </Text>
                  <Text>
                    Working capital cost factor:{" "}
                    {elecValues.workingCapitalFactor}%
                  </Text>
                  <Text>
                    Water requirement: {elecValues.waterRequirement} tH
                    <sub>2</sub>O/tNH<sub>3</sub>
                  </Text>
                </div>
              </div>
              <div className="px-6 mb-2">
                <Text textSize="sub4">Subprocess for {tech1Name}</Text>
              </div>
              <div className="grid grid-cols-1 gap-y-2">
                <Table
                  aria-label="Subprocess table"
                  classNames={{
                    th: "bg-primary-50 rounded-3px",
                    thead: "rounded-3px",
                  }}
                >
                  <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Baseline cost</TableColumn>
                    <TableColumn>Learning rate</TableColumn>
                    <TableColumn>Scaling factor</TableColumn>
                    <TableColumn>Installation factor</TableColumn>
                    <TableColumn>Efficiency</TableColumn>
                    <TableColumn>Energy requirement</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {elecSubProcesses.map((subProcess, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex flex-shrink">
                            <div className="rounded-full bg-primary-50 flex items-center justify-center border-1 border-primary px-2">
                              <Text color="primary">{subProcess.name}</Text>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          $M {subProcess.baseCost?.toFixed(4)}
                        </TableCell>
                        <TableCell>{subProcess.learningRate}%</TableCell>
                        <TableCell>{subProcess.scalingFactor}%</TableCell>
                        <TableCell>{subProcess.installationFactor}%</TableCell>
                        <TableCell>{subProcess.efficiency}%</TableCell>
                        <TableCell>
                          {subProcess.energyRequirement?.toFixed(3)} MW
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </AccordionItem>

        <AccordionItem
          className="shadow-card rounded-[10px] bg-grey-bg"
          key="3"
          aria-label="First Technology Inputs"
          indicator={<UpsideDownIcon />}
          title={
            <div className="justify-between flex flex-row">
              <Text textSize="sub3">{tech2Name} inputs</Text>
              <Button
                size="noPadding"
                color="transparent"
                onClick={() => setCurrStep(2)}
              >
                Edit
              </Button>
            </div>
          }
        >
          {conValues.bottomUpCalc ? (
            <>
              <div className="grid grid-cols-2 pt-1 pb-4 px-6 gap-y-3 gap-x-10">
                <div>
                  <Text textSize="sub3">Direct costs</Text>
                  <Table aria-label="Direct costs table" isStriped>
                    <TableHeader>
                      <TableColumn>Name</TableColumn>
                      <TableColumn>Cost</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <>
                        {conValues.directCosts.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="flex flex-shrink">
                                <div className="rounded-full bg-primary-50 flex items-center justify-center border-1 border-primary px-2">
                                  <Text color="primary" textSize="button-md">
                                    {item.name}
                                  </Text>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Text textSize="button-md">
                                $M {parseFloat(item.cost).toFixed(2)}
                              </Text>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow key={conValues.directCosts.length}>
                          <TableCell>
                            <Text textSize="button-md">
                              <b>Total</b>
                            </Text>
                          </TableCell>
                          <TableCell>
                            <Text>
                              $M{" "}
                              {conValues.directCosts
                                .reduce(
                                  (acc, item) => acc + parseFloat(item.cost),
                                  0,
                                )
                                .toFixed(2)}
                            </Text>
                          </TableCell>
                        </TableRow>
                      </>
                    </TableBody>
                  </Table>
                </div>
                <div>
                  <Text textSize="sub3">Indirect costs</Text>
                  <Table aria-label="Direct costs table" isStriped>
                    <TableHeader>
                      <TableColumn>Name</TableColumn>
                      <TableColumn>Cost</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <>
                        {conValues.indirectCosts.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="flex flex-shrink">
                                <div className="rounded-full bg-primary-50 flex items-center justify-center border-1 border-primary px-2">
                                  <Text color="primary" textSize="button-md">
                                    {item.name}
                                  </Text>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Text textSize="button-md">
                                $M {parseFloat(item.cost).toFixed(2)}
                              </Text>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow key={conValues.indirectCosts.length}>
                          <TableCell>
                            <Text textSize="button-md">
                              <b>Total</b>
                            </Text>
                          </TableCell>
                          <TableCell>
                            <Text>
                              $M{" "}
                              {conValues.indirectCosts
                                .reduce(
                                  (acc, item) => acc + parseFloat(item.cost),
                                  0,
                                )
                                .toFixed(2)}
                            </Text>
                          </TableCell>
                        </TableRow>
                      </>
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="shadow-card rounded-[10px] border-1 border-grey bg-white py-5 mt-5 px-10">
                <div className="grid grid-cols-2 gap-y-3 gap-x-10">
                  <Text>
                    Working capital cost: $M {conValues.workingCapitalCost}
                  </Text>
                  <Text>
                    Installation cost: $M {conValues.installationCost}
                  </Text>
                  <Text>
                    Water requirement: {conValues.waterRequirement} m³
                  </Text>
                  <Text>
                    Learning rate: {conValues.bottomUpProcess.learningRate}%
                  </Text>
                  <Text>
                    Scaling factor: {conValues.bottomUpProcess.scalingFactor}%
                  </Text>
                  <Text>
                    Installation factor:{" "}
                    {conValues.bottomUpProcess.installationFactor}%
                  </Text>
                  <Text>
                    Efficiency: {conValues.bottomUpProcess.efficiency}%
                  </Text>
                  <Text>
                    Energy requirement:{" "}
                    {conValues.bottomUpProcess.energyRequirement} MW
                  </Text>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="shadow-card rounded-[10px] border-1 border-grey bg-white py-5 mb-5 px-10">
                <div className="grid grid-cols-3 gap-y-3">
                  <Text>Direct cost factor: {conValues.directCostFactor}%</Text>
                  <Text>
                    Indirect cost factor: {conValues.indirectCostFactor}%
                  </Text>
                  <Text>
                    Working capital cost factor:{" "}
                    {conValues.workingCapitalFactor}%
                  </Text>
                  <Text>
                    Water requirement: {conValues.waterRequirement} tH
                    <sub>2</sub>
                    O/tNH<sub>3</sub>
                  </Text>
                  <Text>
                    Onsite emissions: {conValues.onsiteEmissions} kgCO
                    <sub>2</sub>
                    /kgH<sub>2</sub>
                  </Text>
                  <Text>
                    Upstream emissions: {conValues.upstreamEmissions} kgCO
                    <sub>2</sub>/kgNH<sub>3</sub>
                  </Text>
                  {analysisType == "phi" && (
                    <>
                      <Text>
                        Depreciation percent: {conValues.depreciationPercent}%
                      </Text>
                      <Text>Duration of use: {conValues.duration} years</Text>
                    </>
                  )}
                </div>
              </div>
              <div className="px-6 mb-2">
                <Text textSize="sub4">Subprocess for {tech2Name}</Text>
              </div>
              <div className="grid grid-cols-1 gap-y-2">
                <Table
                  aria-label="Subprocess table"
                  classNames={{
                    th: "bg-primary-50 rounded-3px",
                    thead: "rounded-3px",
                  }}
                >
                  <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Baseline cost</TableColumn>
                    <TableColumn>Learning rate</TableColumn>
                    <TableColumn>Scaling factor</TableColumn>
                    <TableColumn>Installation factor</TableColumn>
                    <TableColumn>Efficiency</TableColumn>
                    <TableColumn>Energy requirement</TableColumn>
                    <TableColumn>NG requirement</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {conSubProcesses.map((subProcess, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex flex-shrink">
                            <div className="rounded-full bg-primary-50 flex items-center justify-center border-1 border-primary px-2">
                              <Text color="primary">{subProcess.name}</Text>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          $M {subProcess.baseCost?.toFixed(4)}
                        </TableCell>
                        <TableCell>{subProcess.learningRate}%</TableCell>
                        <TableCell>{subProcess.scalingFactor}%</TableCell>
                        <TableCell>{subProcess.installationFactor}%</TableCell>
                        <TableCell>{subProcess.efficiency}%</TableCell>
                        <TableCell>
                          {subProcess.energyRequirement?.toFixed(3)} MW
                        </TableCell>
                        <TableCell>
                          {subProcess.ngReq?.toFixed(3) ?? 0} MW
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </AccordionItem>
      </Accordion>
      <div className="space-x-6 mt-32">
        <Button color="grey" onClick={() => setCurrStep(2)}>
          Back
        </Button>
        <Button color="primary" onClick={onSubmit}>
          Calculate
        </Button>
      </div>
    </div>
  );
};

export default Review;
