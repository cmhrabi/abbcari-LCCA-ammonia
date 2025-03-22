import React from "react";
import Button from "../../design/Button/Button";
import Text from "../../design/Text/Text";
import { cva } from "class-variance-authority";

export interface ProcessCardInfo {
  baseCost: number;
  learningRate: number;
  scalingFactor: number;
  installationFactor: number;
  energyRequirement: number;
  efficiency: number;
  name: string;
  ngReq?: number;
}

interface ProcessCardProps {
  info?: ProcessCardInfo;
  handleEdit?: () => void;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ info, handleEdit }) => {
  const cardVariants = cva(
    "shadow-card flex flex-row grow items-center justify-between rounded-[10px] border-1 border-grey bg-white",
    {
      variants: {
        padding: {
          small: "py-2 pl-3 pr-6",
          large: "py-5 px-6",
        },
      },
    },
  );

  if (!info) {
    return (
      <div className="shadow-card flex flex-row items-center grow justify-center rounded-[10px] px-6 py-5 border-1 border-grey bg-white">
        <Text color="secondary" textSize="sub3">
          Please Add a Sub Process
        </Text>
      </div>
    );
  } else {
    return (
      <div
        className={cardVariants({ padding: handleEdit ? "large" : "small" })}
      >
        <div className="rounded-full bg-primary-50 flex items-center justify-center border-1 border-primary px-1">
          <Text color="primary" textSize="button-sm">
            {info?.name}
          </Text>
        </div>
        <Text>
          Baseline cost:
          <br />${info?.baseCost.toFixed(4)}
        </Text>
        <Text>
          Learning rate:
          <br />
          {info?.learningRate}%
        </Text>
        <Text>
          Scaling factor:
          <br />
          {info?.scalingFactor}%
        </Text>
        <Text>
          Installation factor:
          <br />
          {info?.installationFactor}%
        </Text>
        <Text>
          Efficiency:
          <br />
          {info?.efficiency}%
        </Text>
        <Text>
          Energy requirement:
          <br />
          {info?.energyRequirement.toFixed(3)} MW
        </Text>
        {info.ngReq && info?.ngReq > 0 && (
          <Text>
            NG requirement:
            <br />
            {info?.ngReq.toFixed(3)} MW
          </Text>
        )}
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
