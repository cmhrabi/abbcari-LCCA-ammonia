import React from "react";
import Button from "../../design/Button/Button";
import Text from "../../design/Text/Text";

export interface ProcessCardInfo {
  baseCost: number;
  learningRate: number;
  scalingFactor: number;
  installationFactor: number;
  energyRequirement: number;
  efficiency: number;
  name: string;
}

interface ProcessCardProps {
  info?: ProcessCardInfo;
  handleEdit?: () => void;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ info, handleEdit }) => {
  if (!info) {
    return (
      <div className="shadow-card flex flex-row items-center justify-center rounded-[10px] px-6 py-5 border-1 border-grey">
        <Text color="secondary" textSize="sub3">
          Please Add a Sub Process
        </Text>
      </div>
    );
  } else {
    return (
      <div className="shadow-card flex flex-row items-center justify-between rounded-[10px] px-6 py-5 border-1 border-grey">
        <div className="rounded-full bg-primary-50 flex items-center justify-center border-1 border-primary px-1">
          <Text color="primary" textSize="button-sm">
            {info?.name}
          </Text>
        </div>
        <Text>Baseline cost: {info?.baseCost}</Text>
        <Text>Learning rate: {info?.learningRate}</Text>
        <Text>Scaling factor: {info?.scalingFactor}</Text>
        <Text>Installation factor: {info?.installationFactor}</Text>
        <Text>Energy requirement: {info?.energyRequirement}</Text>
        <Text>Efficiency: {info?.efficiency}</Text>
        {handleEdit && (
          <Button color="transparent" size="small" onClick={handleEdit}>
            Edit
          </Button>
        )}
      </div>
    );
  }
};

export default ProcessCard;
