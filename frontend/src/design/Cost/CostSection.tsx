import React from "react";
import { cva } from "class-variance-authority";
import HelpMessage from "../HelpMessage/HelpMessage";
import HelpIcon from "../../assets/help_icons/help.svg";
import ErrorIcon from "../../assets/help_icons/error.svg";
import Button from "../../design/Button/Button";
import { XCircleIcon } from "@heroicons/react/24/outline";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  helpMessage?: string;
  error?: string;
  noIcon?: boolean;
  name?: string;
  cost?: string;
}

const CostInput: React.FC<InputProps> = ({
  label,
  helpMessage,
  error,
  noIcon = false,
}) => {
  const inputNameVariant = cva(
    "block w-full p-3 border placeholder:text-input placeholder:text-grey-blue disabled:bg-grey rounded rounded-3px shadow-sm",
    {
      variants: {
        background: {
          default: "bg-white",
          //   secondary: "bg-grey-light",
          blue: "bg-primary-input",
        },
        focus: {
          error: "outline-none border-danger shadow-input",
          noError:
            "focus:outline-none focus:border-tertiary focus:shadow-input",
        },
      },
    },
  );
  const labelVariant = cva("block text-input");

  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const handleSnoozeHelp = () => setFocused(false);

  const [rows, setRows] = React.useState([{ name: "", cost: "", error: "" }]);

  const addRow = () => {
    setRows([...rows, { name: "", cost: "", error: "" }]);
  };

  return (
    <div>
      {helpMessage && focused && !error && (
        <div className="relative">
          <HelpMessage onSnooze={handleSnoozeHelp} type="info">
            {helpMessage}
          </HelpMessage>
        </div>
      )}
      <div className="flex flex-row space-x-1 mb-2">
        {label && (
          <img
            onClick={onFocus}
            alt="Error Icon"
            src={HelpIcon}
            width={16}
            height={16}
            className="cursor-pointer"
          />
        )}
        {label && <label className={`${labelVariant({})}`}>{label}</label>}
      </div>
      {rows.map((row, index) => (
        <div key={index} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <div className="flex gap-x-5 gap-y-10 w-80">
              <input
                className={inputNameVariant({
                  background: "default",
                  focus: row.error ? "error" : "noError",
                })}
                placeholder="Name"
              />

              <input
                className={inputNameVariant({
                  background: "blue",
                  focus: row.error ? "error" : "noError",
                })}
                placeholder="Cost"
              />
              <Button
                isIconOnly
                color="transparent"
              >
                <XCircleIcon className="size-5 text-grey-blue" />
              </Button>
            </div>
            <div className="flex flex-row space-x-1 space-y-9">
              {label && !noIcon && row.error && (
                <img
                  onClick={onFocus}
                  alt="Error Icon"
                  src={HelpIcon}
                  width={16}
                  height={16}
                  className="cursor-pointer"
                />
              )}
              {label && row.error && (
                <img
                  onClick={onFocus}
                  alt="Error Icon"
                  src={ErrorIcon}
                  width={16}
                  height={16}
                />
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="mt-4">
        <Button color="transparent" onClick={addRow}>
          + Add a new cost
        </Button>
      </div>
    </div>
  );
};

export default CostInput;
