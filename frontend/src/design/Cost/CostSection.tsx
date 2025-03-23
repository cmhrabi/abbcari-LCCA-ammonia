import React, { useEffect } from "react";
import { cva } from "class-variance-authority";
import HelpMessage from "../HelpMessage/HelpMessage";
import HelpIcon from "../../assets/help_icons/help.svg";
import ErrorIcon from "../../assets/help_icons/error.svg";
import Button from "../../design/Button/Button";
import { XCircleIcon } from "@heroicons/react/24/outline";
import DeleteCostModal from "../../components/DeleteCostModal/DeleteCostModal";
import { useDisclosure } from "@heroui/react";
import Text from "../Text/Text";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  helpMessage?: string;
  error?: string;
  noIcon?: boolean;
  name?: string;
  cost?: string;
  link?: string;
  addRow: () => void;
  rows: { name: string; cost: string; error?: string }[];
  editRow: (index: number, name: string, cost: string) => void;
  deleteRow: (index: number) => void;
  setError: (index: number, error: string) => void;
}

const CostInput: React.FC<InputProps> = ({
  label,
  helpMessage,
  error,
  addRow,
  deleteRow,
  editRow,
  rows,
  noIcon = false,
  setError,
  link,
}) => {
  const inputNameVariant = cva(
    "block w-full p-3 border placeholder:text-input placeholder:text-grey-blue disabled:bg-grey rounded rounded-3px shadow-sm",
    {
      variants: {
        background: {
          default: "bg-white",
          blue: "bg-primary-input",
        },
        focus: {
          error: "outline-none border-danger shadow-input",
          noError:
            "focus:outline-none focus:border-tertiary focus:shadow-input",
        },
        start: {
          true: "ps-9",
        },
      },
    },
  );
  const labelVariant = cva("block text-input");

  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);
  const handleSnoozeHelp = () => setFocused(false);
  const [currDeleteIndex, setCurrDeleteIndex] = React.useState<number | null>(
    null,
  );
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const handleDelete = (index: number) => {
    setCurrDeleteIndex(index);
    onOpen();
  };

  useEffect(() => {
    const negDirCosts = rows.reduce<number[]>((acc, row, index) => {
      if (parseFloat(row.cost) < 0) {
        acc.push(index);
      }
      return acc;
    }, []);
    if (negDirCosts.length > 0) {
      negDirCosts.forEach((index) =>
        setError(index, "Costs cannot be negative"),
      );
    } else {
      rows.forEach((row, i) => {
        if (row.error) setError(i, "");
      });
    }
  }, [rows]);

  return (
    <div>
      {helpMessage && focused && !error && (
        <div className="relative">
          <HelpMessage onSnooze={handleSnoozeHelp} link={link} type="info">
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
        <div
          key={index}
          className="flex flex-col flex-grow space-y-2 min-w-0 w-fit"
        >
          <div className="flex flex-shrink flex-grow gap-x-5 w-fit">
            <input
              className={inputNameVariant({
                background: "blue",
                focus: error ? "error" : "noError",
              })}
              value={row.name}
              onChange={(e) => editRow(index, e.target.value, row.cost)}
              placeholder="Name"
            />
            <div>
              {row.error && (
                <div className="relative">
                  <HelpMessage type="error" onSnooze={handleSnoozeHelp}>
                    {row.error}
                  </HelpMessage>
                </div>
              )}
              <div className="relative block w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <Text color="grey-label" textSize="sub3">
                    $M
                  </Text>
                </div>
                <input
                  className={inputNameVariant({
                    background: "default",
                    focus: row.error ? "error" : "noError",
                    start: true,
                  })}
                  type="number"
                  value={row.cost}
                  onChange={(e) => editRow(index, row.name, e.target.value)}
                />
              </div>
            </div>
            <Button
              isIconOnly
              color="transparent"
              onClick={() => handleDelete(index)}
              size="noPadding"
            >
              <XCircleIcon className="size-5 text-grey-blue" />
            </Button>
          </div>
          <div className="flex flex-row space-x-1 space-y-9">
            {label && !noIcon && error && (
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
          </div>
        </div>
      ))}

      <div className="flex flex-row space-x-1">
        {label && error && (
          <img
            onClick={onFocus}
            alt="Help Icon"
            src={ErrorIcon}
            width={16}
            height={16}
          />
        )}
        {/* {label && <label className={labelVariant({})}>{label}</label>} */}
      </div>

      <div className="mt-4">
        <Button color="transparent" onClick={addRow}>
          + Add a new cost
        </Button>
      </div>
      <DeleteCostModal
        deleteCost={() => deleteRow(currDeleteIndex as number)}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isLastCost={rows.length === 1}
      />
    </div>
  );
};

export default CostInput;
