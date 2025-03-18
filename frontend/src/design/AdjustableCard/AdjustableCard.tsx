import React from "react";
import Text from "../Text/Text";
import Button from "../Button/Button";
import { Accordion, AccordionItem } from "@heroui/react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import Input from "../../design/Input/Input";
import Select from "../../design/Select/Select";
import { setDiscount, setProvince } from "../../Slices/generalSlice";

interface AdjustableCardProps {
  onClickAdjust: () => void;
}

const AdjustableCard: React.FC<AdjustableCardProps> = ({ onClickAdjust }) => {
  const generalValues = useAppSelector((state) => state.general.value);
  const dispatch = useAppDispatch();

  return (
    <div className="shadow-card bg-primary-50 rounded-3px py-9 px-8 h-full max-w-lg">
      <div className="flex flex-row items-center gap-x-4 pb-5">
        <Text textSize="sub3">Adjustable parameters</Text>
      </div>
      <Accordion className="bg-grey-bg">
        <AccordionItem
          title={
            <div className="flex flex-row justify-between px-4">
              <Text textSize="sub3">General</Text>
            </div>
          }
        >
          <div className="px-6">
            <Select
              label="Province used in analysis"
              onChange={(e) => dispatch(setProvince(e.target.value))}
              value={generalValues.province}
              options={[
                { value: "No Selection", label: "No Selection" },
                { value: "Alberta", label: "Alberta" },
                { value: "British Columbia", label: "British Columbia" },
                { value: "Manitoba", label: "Manitoba" },
                { value: "New Brunswick", label: "New Brunswick" },
                {
                  value: "Newfoundland and Labrador",
                  label: "Newfoundland and Labrador",
                },
                { value: "Nova Scotia", label: "Nova Scotia" },
                { value: "Ontario", label: "Ontario" },
                {
                  value: "Prince Edward Island",
                  label: "Prince Edward Island",
                },
                { value: "Quebec", label: "Quebec" },
                { value: "Saskatchewan", label: "Saskatchewan" },
              ]}
              helpMessage="The province you want to influence the projected cost based on its geographical location on the electricity grid."
            />

            <div className="pt-5">
              <Input
                label="Discount rate"
                onChange={(e) => dispatch(setDiscount(e.target.value))}
                value={generalValues.discount}
                placeholder="Value"
                helpMessage="The rate at which future costs are adjusted to reflect the present value."
                type="number"
                end={
                  <Text color="grey-blue" textSize="input">
                    %
                  </Text>
                }
              />
            </div>
          </div>
        </AccordionItem>

        <AccordionItem

          title={
            <div className="justify-between flex flex-row px-4">
              <Text textSize="sub3">CAPEX</Text>
            </div>
          }
        >
          <Input label="Name" />
          <Input label="Cost" />
        </AccordionItem>
        <AccordionItem
          title={
            <div className="justify-between flex flex-row px-4">
              <Text textSize="sub3">OPEX</Text>
            </div>
          }
        >
          <Input label="Name" />
          <Input label="Cost" />
        </AccordionItem>
        <AccordionItem
          title={
            <div className="justify-between flex flex-row px-4">
              <Text textSize="sub3">Import/Export</Text>
            </div>
          }
        >
          <Input label="Name" />
          <Input label="Cost" />
        </AccordionItem>
      </Accordion>

      <div className="flex justify-end pt-4">
        <Button color="primary" onClick={onClickAdjust}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default AdjustableCard;
