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
}

interface ProcessCardProps {
  info: ProcessCardInfo;
  handleEdit?: () => void;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ info, handleEdit }) => {
  const {
    baseCost,
    learningRate,
    scalingFactor,
    installationFactor,
    energyRequirement,
    efficiency,
  } = info;

  return (
    <div className="shadow-card flex flex-row items-center justify-between rounded-[10px] px-6 py-5 border-1 border-grey">
      <div className="rounded-full bg-primary-50 flex items-center justify-center border-1 border-primary px-1">
        <Text color="primary" textSize="button-sm">
          PEM
        </Text>
      </div>
      <Text>Baseline cost: {baseCost}</Text>
      <Text>Learning rate: {learningRate}</Text>
      <Text>Scaling factor: {scalingFactor}</Text>
      <Text>Installation factor: {installationFactor}</Text>
      <Text>Energy requirement: {energyRequirement}</Text>
      <Text>Efficiency: {efficiency}</Text>
      <Button color="primary" size="small" onClick={handleEdit}>
        Edit
      </Button>
    </div>
  );
};

export default ProcessCard;
