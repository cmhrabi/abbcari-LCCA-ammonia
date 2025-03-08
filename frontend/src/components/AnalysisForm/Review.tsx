import React, { useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Text from "../../design/Text/Text";
import Button from "../../design/Button/Button";
import { useAppSelector } from "../../hooks";
import ProcessCard from "../ProcessCard/ProcessCard";
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

  const [disabled] = useState(true);
  const navigate = useNavigate();
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
      >
        <AccordionItem
          className="shadow-card rounded-[10px] mb-7 mt-8 bg-grey-bg"
          key="Upside-Down"
          aria-label="General Inputs"
          indicator={<UpsideDownIcon />}
          title={
            <div className="justify-between flex flex-row">
              <Text textSize="sub3">General Inputs</Text>
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
          <div className="grid grid-cols-4 pt-1 pb-4 px-8 gap-y-3">
            <Text>Start year: {generalValues.startYear}</Text>
            <Text>Target year: {generalValues.finalYear}</Text>
            <Text>Discount rate: {generalValues.discount}</Text>
            <Text>Electrical ammonia: {generalValues.electricalAmmonia}</Text>
            <div className="col-span-2">
              <Text>Province used in analysis: {generalValues.province}</Text>
            </div>
            <div className="col-span-2">
              <Text>
                Plant Operating Hours: {generalValues.plantOperatingHours}
              </Text>
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
              <Text textSize="sub3">{tech1Name} Inputs</Text>
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
          <div className="grid grid-cols-3 pt-1 pb-4 px-6 gap-y-3">
            <Text>Direct cost factor: {elecValues.directCostFactor}</Text>
            <Text>Indirect cost factor: {elecValues.indirectCostFactor}</Text>
            <Text>
              Working capital cost factor: {elecValues.workingCapitalFactor}
            </Text>
          </div>
          <div className="px-6 mb-2">
            <Text textSize="sub4">Subprocess for {tech1Name}</Text>
          </div>
          <div className="grid grid-cols-1 gap-y-2">
            {elecSubProcesses.map((subProcess, index) => (
              <ProcessCard
                key={index}
                info={{
                  baseCost: subProcess.baseCost,
                  learningRate: subProcess.learningRate,
                  scalingFactor: subProcess.scalingFactor,
                  installationFactor: subProcess.installationFactor,
                  energyRequirement: subProcess.energyRequirement,
                  efficiency: subProcess.efficiency,
                  name: subProcess.name,
                }}
              />
            ))}
          </div>
        </AccordionItem>

        <AccordionItem
          className="shadow-card rounded-[10px] bg-grey-bg"
          key="3"
          aria-label="First Technology Inputs"
          indicator={<UpsideDownIcon />}
          title={
            <div className="justify-between flex flex-row">
              <Text textSize="sub3">{tech2Name} Inputs</Text>
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
          <div className="grid grid-cols-3 pt-1 pb-4 px-6 gap-y-3">
            <Text>Direct cost factor: {conValues.directCostFactor}</Text>
            <Text>Indirect cost factor: {conValues.indirectCostFactor}</Text>
            <Text>
              Working capital cost factor: {conValues.workingCapitalFactor}
            </Text>
            {analysisType == "phi" && (
              <>
                <Text>
                  Depreciation percent: {conValues.depreciationPercent}
                </Text>
                <Text>Duration of use: {conValues.duration}</Text>
              </>
            )}
          </div>
          <div className="px-6 mb-2">
            <Text textSize="sub4">Subprocess for {tech2Name}</Text>
          </div>
          <div className="grid grid-cols-1 gap-y-2">
            {conSubProcesses.map((subProcess, index) => (
              <ProcessCard
                key={index}
                info={{
                  baseCost: subProcess.baseCost,
                  learningRate: subProcess.learningRate,
                  scalingFactor: subProcess.scalingFactor,
                  installationFactor: subProcess.installationFactor,
                  energyRequirement: subProcess.energyRequirement,
                  efficiency: subProcess.efficiency,
                  name: subProcess.name,
                }}
              />
            ))}
          </div>
        </AccordionItem>
      </Accordion>
      <div className="space-x-6 mt-32">
        <Button color="grey" onClick={() => setCurrStep(2)}>
          Back
        </Button>
        <Button 
          color="primary" 
          // disabled={disabled}
          onClick={() => navigate("/analysis/results")}
        >
          Calculate
        </Button>
      </div>
    </div>
  );
};

export default Review;
