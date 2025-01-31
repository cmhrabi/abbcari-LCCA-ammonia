import React from "react";
import { cva } from "class-variance-authority";
import HelpMessage from "../HelpMessage/HelpMessage";
import HelpIcon from "../../assets/help_icons/help.svg";
import ErrorIcon from "../../assets/help_icons/error.svg";
import Button from "../../design/Button/Button";
import { XCircleIcon } from "@heroicons/react/24/outline";
import DeleteCostModal from "../../components/DeleteCostModal/DeleteCostModal";
import { useDisclosure } from "@nextui-org/react";
import Text from "../Text/Text";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  helpMessage?: string;
  error?: string;
  noIcon?: boolean;
  name?: string;
  cost?: string;
  addRow: () => void;
  rows: { name: string; cost: string }[];
  editRow: (index: number, name: string, cost: string) => void;
  deleteRow: (index: number) => void;
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
          true: "ps-7",
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
            <div className="flex gap-x-5 gap-y-10 w-100">
              <input
                className={inputNameVariant({
                  background: "default",
                  focus: error ? "error" : "noError",
                })}
                type="text"
                value={row.name}
                onChange={(e) => editRow(index, e.target.value, row.cost)}
                placeholder="Name"
              />
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <Text color="grey-label" textSize="sub3">
                    $
                  </Text>
                </div>
                <input
                  className={inputNameVariant({
                    background: "blue",
                    focus: error ? "error" : "noError",
                    start: true,
                  })}
                  type="number"
                  value={row.cost}
                  onChange={(e) => editRow(index, row.name, e.target.value)}
                  placeholder="Cost"
                />
              </div>
              <Button
                isIconOnly
                color="transparent"
                onClick={() => handleDelete(index)}
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
        </div>
      ))}

      <div className="mt-4">
        <Button color="transparent" onClick={addRow}>
          + Add a new cost
        </Button>
      </div>
      <DeleteCostModal
        deleteCost={() => deleteRow(currDeleteIndex as number)}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
};

export default CostInput;
