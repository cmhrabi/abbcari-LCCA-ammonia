import React from "react";
import { cva } from "class-variance-authority";
import HelpMessage from "../HelpMessage/HelpMessage";
import HelpIcon from "../../assets/help_icons/help.svg";
import ErrorIcon from "../../assets/help_icons/error.svg";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  helpMessage?: string;
  error?: string;
  noIcon?: boolean;
  start?: React.ReactNode;
  end?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  helpMessage,
  error,
  noIcon = false,
  start,
  end,
  ...props
}) => {
  const inputVariants = cva(
    "block w-full p-3 border placeholder:text-input placeholder:text-grey-blue disabled:bg-grey rounded-3px shadow-sm",
    {
      variants: {
        focus: {
          error: "outline-none border-danger shadow-input",
          noError:
            "focus:outline-none focus:border-tertiary focus:shadow-input",
        },
        start: {
          true: "ps-11",
        },
        end: {
          true: "pe-9",
        },
      },
    },
  );
  const labelVariants = cva("block text-input");

  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const handleSnoozeHelp = () => setFocused(false);

  return (
    <div>
      <div className="pb-1">
        {helpMessage && focused && !error && (
          <div className="relative">
            <HelpMessage onSnooze={handleSnoozeHelp} type="info">
              {helpMessage}
            </HelpMessage>
          </div>
        )}
        {error && (
          <div className="relative">
            <HelpMessage type="error" onSnooze={handleSnoozeHelp}>
              {error}
            </HelpMessage>
          </div>
        )}
        <div className="flex flex-row space-x-1">
          {label && !noIcon && !error && (
            <img
              onClick={onFocus}
              alt="Help Icon"
              src={HelpIcon}
              width={16}
              height={16}
              className="cursor-pointer"
            />
          )}
          {label && error && (
            <img
              onClick={onFocus}
              alt="Help Icon"
              src={ErrorIcon}
              width={16}
              height={16}
            />
          )}
          {label && <label className={labelVariants({})}>{label}</label>}
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pe-3 pointer-events-none">
          {start}
        </div>
        <input
          className={inputVariants({
            focus: error ? "error" : "noError",
            start: start !== undefined,
            end: end !== undefined,
          })}
          onBlur={onBlur}
          {...props}
        />
        <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
          {end}
        </div>
      </div>
    </div>
  );
};

export default Input;
