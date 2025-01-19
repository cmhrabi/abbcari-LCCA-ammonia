import React, { useState } from "react";
import Text from "../../design/Text/Text";
import Button from "../../design/Button/Button";
import { useAppSelector } from "../../hooks";
import Input from "../../design/Input/Input";
import ProcessCard from "../ProcessCard/ProcessCard";
import CostSection from "../../design/Cost/CostSection";

interface FirstTechnologyProps {
  setCurrStep: (arg0: number) => void;
}

const FirstTechnology: React.FC<FirstTechnologyProps> = ({ setCurrStep }) => {
  const tech1Name = useAppSelector((state) => state.name.value.tech1Name);

  const [disabled, setDisabled] = useState(true);

  return (
    <>
      <div className="py-2.5">
        <Text color="secondary" textSize="sub3">
          Inputs for the &quot;{tech1Name}&quot; technology
        </Text>
      </div>
      <div className="grid grid-cols-1 gap-y-14">
        <div className="grid grid-cols-2 gap-x-11 gap-y-12 shadow-card rounded-[10px] border-1 border-grey py-5 px-10">
          <CostSection
            type="text"
            label="Direct costs"
            onChange={() => {}}
            helpMessage="Test"
          />

          <CostSection
            type="number"
            label="Indirect costs"
            onChange={() => {}}
            helpMessage="Test"
          />
          {/* <Input
            type="number"
            label="Direct cost factor"
            onChange={() => {}}
            placeholder="Value"
            helpMessage="The direct cost factor includes expenses directly tied to the physical creation of a project. This includes, but is not limited to:"
          />
          <Input
            type="number"
            label="Indirect cost factor"
            onChange={() => {}}
            placeholder="Value"
            helpMessage="The indirect cost factor includes expenses not directly linked to production but necessary for project completion. This includes, but is not limited to:"
          />
          <Input
            type="number"
            label="Working capital cost"
            onChange={() => {}}
            placeholder="Value"
            helpMessage="The worker capital cost are the costs associated with labor and employee-related expenses."
          />
          <Input
            label="Depreciation percentage"
            onChange={() => {}}
            placeholder="Value"
            helpMessage="The depreciation percentage is an indication of how quickly your technology will lose its productive value over time. An accurate representation is required to estimate the net capital expenditure."
          />
          <Input
            label="Duration of use (hours)"
            onChange={() => {}}
            placeholder="Value"
            helpMessage="The depreciation percentage is an indication of how quickly your technology will lose its productive value over time. An accurate representation is required to estimate the net capital expenditure."
          /> */}
        </div>
        <div>
          <div className="flex flex-row justify-between items-end pb-2">
            <Text color="secondary" textSize="sub3">
              Subprocesses
            </Text>
            <Button>+ Add Subprocess</Button>
          </div>
          <ProcessCard
            info={{
              baseCost: 1000,
              learningRate: 4,
              scalingFactor: 2,
              installationFactor: 2,
              energyRequirement: 100,
              efficiency: 0.7,
            }}
            handleEdit={() => {}}
          />
        </div>
        <div className="space-x-6">
          <Button color="grey" onClick={() => setCurrStep(0)}>
            Back
          </Button>
          <Button color="primary" disabled={disabled}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default FirstTechnology;
