import React from "react";
import Text from "../Text/Text";
import { cva } from "class-variance-authority";

interface ResultsCardProps {
  title?: React.ReactNode;
  value: React.ReactNode;
  caption?: React.ReactNode;
  //   variant?: "home" | "primary";
  variant?: "default";
}

const ResultsCard: React.FC<ResultsCardProps> = ({
  title,
  value,
  caption,
  variant = "default",
}) => {
  const variants = cva("card rounded-5px bg-grey-bg", {
    variants: {
      variant: {
        default: "",
      },
    },
  });

  let component = <></>;
  if (variant == "default") {
    component = (
      <div className="py-9 px-5">
        <Text textSize="alert-title">{title}</Text>
        <div className="flex flex-row items-center gap-x-4 pt-5">
          <Text textSize="value" color="primary">
            {value}
          </Text>
        </div>
        <div className="pt-2">
          <Text textSize="button-md">{caption}</Text>
        </div>
      </div>
    );
  }

  return <div className={variants({ variant: variant })}>{component}</div>;
};

export default ResultsCard;
