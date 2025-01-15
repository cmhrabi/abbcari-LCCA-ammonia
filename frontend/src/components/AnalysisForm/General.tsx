import React, { useEffect, useState } from "react";
import Text from "../../design/Text/Text";
import Button from "../../design/Button/Button";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks";
import Input from "../../design/Input/Input";
import Select from "../../design/Select/Select";
import {
  setDiscount,
  setProvince,
  setElectricalAmmonia,
  setEfficiency,
  setBaseAmmonia,
  setPlantOperatingHours,
  setStartYear,
  setFinalYear,
} from "../../Slices/generalSlice";

interface GeneralProps {
  setCurrStep: (arg0: number) => void;
}

const General: React.FC<GeneralProps> = ({ setCurrStep }) => {
  const generalValues = useAppSelector((state) => state.general.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (
      generalValues.discount &&
      generalValues.electricalAmmonia &&
      generalValues.efficiency &&
      generalValues.baseAmmonia &&
      generalValues.plantOperatingHours &&
      !generalValues.province.includes("No Selection") &&
      generalValues.startYear &&
      generalValues.finalYear
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [generalValues]);

  return (
    <>
      <div className="py-2.5">
        <Text color="secondary" textSize="sub3">
          General inputs
        </Text>
      </div>
      <div className="grid grid-cols-1 gap-y-10">
        <div className="grid grid-cols-2 gap-x-24 gap-y-12 max-w-md">
          <Input
            label="Start year"
            onChange={(e) => dispatch(setStartYear(parseInt(e.target.value)))}
            value={generalValues.startYear}
            noIcon
            type="number"
          />
          <Input
            label="Final year"
            onChange={(e) => dispatch(setFinalYear(parseInt(e.target.value)))}
            value={generalValues.finalYear}
            noIcon
            type="number"
          />
        </div>
        <div className="grid grid-cols-2 gap-x-24 gap-y-12 max-w-screen-lg">
          <Input
            label="Discount rate"
            onChange={(e) => dispatch(setDiscount(e.target.value))}
            value={generalValues.discount}
            placeholder="Value"
            helpMessage="The rate at which future costs are adjusted to reflect the present value."
          />
          <Select
            label="Province(s) used in analysis"
            onChange={(e) => dispatch(setProvince(e.target.value))}
            value={generalValues.province}
            options={[
              "No Selection",
              "Alberta",
              "British Columbia",
              "Manitoba",
              "New Brunswick",
              "Newfoundland and Labrador",
              "Nova Scotia",
              "Ontario",
              "Prince Edward Island",
              "Quebec",
              "Saskatchewan",
            ]}
            helpMessage="The province(s) you want to influence the projected cost based on its geographical location on the electricity grid."
          />
          <Input
            label="Electrical ammonia demand in target year (in petajoules)"
            onChange={(e) => dispatch(setElectricalAmmonia(e.target.value))}
            value={generalValues.electricalAmmonia}
            placeholder="Value"
            helpMessage="The amount of electricity that is required to generate ammonia. This value will be used to derive the installed and purchased costs."
          />
          <Input
            label="Efficiency of the technology"
            onChange={(e) => dispatch(setEfficiency(e.target.value))}
            value={generalValues.efficiency}
            placeholder="Value"
            helpMessage="The effectiveness of the technology performing its intended function relative to the carbon emission produced."
          />
          <Input
            label="Base electrical ammonia production rate (in petajoules)"
            onChange={(e) => dispatch(setBaseAmmonia(e.target.value))}
            value={generalValues.baseAmmonia}
            placeholder="Value"
            helpMessage="The current amount of ammonia that can be produced by your new technology. It will be used to calculate future production rates as the technology advances."
          />
          <Input
            label="Plant operating hours"
            onChange={(e) =>
              dispatch(setPlantOperatingHours(parseInt(e.target.value)))
            }
            value={generalValues.plantOperatingHours}
            type="number"
            helpMessage="The number of hours a plant operates in a year. This value will be used to calculate the operating cost for a plant constructed in a year."
          />
        </div>
        <div className="space-x-6">
          <Button color="grey" onClick={() => navigate("/analysis/start")}>
            Back
          </Button>
          <Button
            color="primary"
            disabled={disabled}
            onClick={() => setCurrStep(1)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default General;
