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
}

const Input: React.FC<InputProps> = ({
  label,
  helpMessage,
  error,
  noIcon = false,
  ...props
}) => {
  const inputVariants = cva(
    "block w-full p-3 border placeholder:text-input placeholder:text-grey-blue disabled:bg-grey rounded-3px shadow-sm ",
    {
      variants: {
        focus: {
          error: "outline-none border-danger shadow-input",
          noError:
            "focus:outline-none focus:border-tertiary focus:shadow-input",
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
      {helpMessage && focused && !error && (
        <div>
        <HelpMessage onSnooze={handleSnoozeHelp} type="info">
          {helpMessage}
        </HelpMessage>
        </div>
      )}
      {error && (
        <HelpMessage type="error" onSnooze={handleSnoozeHelp}>
          {error}
        </HelpMessage>
      )}
      <div className="flex flex-row space-x-1">
        {label && !noIcon && !error && (
          <img
            onClick={onFocus}
            alt="Error Icon"
            src={HelpIcon}
            width={16}
            height={16}
            className="cursor-pointer"
          />
        )}
        {label && error && (
          <img
            onClick={onFocus}
            alt="Error Icon"
            src={ErrorIcon}
            width={16}
            height={16}
          />
        )}
        {label && <label className={labelVariants({})}>{label}</label>}
      </div>
      <input
        className={inputVariants({ focus: error ? "error" : "noError" })}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
    </div>
  );
};

export default Input;
