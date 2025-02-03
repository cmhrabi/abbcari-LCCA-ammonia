import React from "react";
import { cva } from "class-variance-authority";
import HelpMessage from "../HelpMessage/HelpMessage";
import HelpIcon from "../../assets/help_icons/help.svg";
import ErrorIcon from "../../assets/help_icons/error.svg";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helpMessage?: string;
  error?: string;
  options: { value: number | string; label: string }[];
  noIcon?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  helpMessage,
  error,
  options,
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
        {!noIcon && label && !error && (
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
      <select
        className={inputVariants({ focus: error ? "error" : "noError" })}
        onBlur={onBlur}
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
