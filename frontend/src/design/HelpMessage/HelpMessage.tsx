import React from "react";
import { cva } from "class-variance-authority";
import Text from "../Text/Text";
import CloseIcon from "../../assets/close.svg";

interface HelpMessageProps {
  children: string;
  type: "error" | "info";
  onSnooze?: () => void;
}

const HelpMessage: React.FC<HelpMessageProps> = ({
  children,
  type,
  onSnooze,
}) => {
  const variants = cva(["flex", "rounded-3px", "py-2", "px-3"], {
    variants: {
      type: {
        error: "bg-danger",
        info: "bg-tertiary",
      },
    },
  });

  const color = type == "error" ? "#D21C1C" : "#0172CB";

  return (
    <div>
      <div className="flex z-50">
        <div className={variants({ type: type })}>
          <Text color="white" textSize="input">
            {children}
          </Text>
          {type != "error" && (
            <img src={CloseIcon} onClick={onSnooze} width={20} height={20} className="cursor-pointer" />
          )}
        </div>
      </div>
      <div className="pl-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="4"
          viewBox="0 0 8 4"
          fill="none"
        >
          <path
            d="M4.70711 3.29289C4.31658 3.68342 3.68342 3.68342 3.29289 3.29289L8.26528e-07 -4.60964e-07L8 2.38419e-07L4.70711 3.29289Z"
            fill={color}
          />
        </svg>
      </div>
    </div>
  );
};

export default HelpMessage;
