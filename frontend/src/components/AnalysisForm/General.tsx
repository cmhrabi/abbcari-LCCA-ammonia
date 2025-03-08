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

  useEffect(() => {
    if (generalValues.startYear >= generalValues.finalYear) {
      setYearError({
        startYear: "Final year must be greater than start year.",
        finalYear: "",
      });
    } else {
      setYearError({ startYear: "", finalYear: "" });
    }
  }, [generalValues.startYear]);

  useEffect(() => {
    if (generalValues.startYear >= generalValues.finalYear) {
      setYearError({
        startYear: "",
        finalYear: "Final year must be greater than start year.",
      });
    } else {
      setYearError({ startYear: "", finalYear: "" });
    }
  }, [generalValues.finalYear]);

  const [yearError, setYearError] = useState({ startYear: "", finalYear: "" });

  const years = Array.from({ length: 26 }, (_, i) => 2025 + i);
  return (
    <>
      <div className="py-2.5">
        <Text color="secondary" textSize="sub3">
          General inputs
        </Text>
      </div>
      <div className="grid grid-cols-1 gap-y-10">
        <div className="grid grid-cols-4 gap-x-14 gap-y-12 max-w-4xl">
          <Select
            label="Start year"
            onChange={(e) => dispatch(setStartYear(parseInt(e.target.value)))}
            value={generalValues.startYear}
            options={years.map((year) => ({
              value: year,
              label: year.toString(),
            }))}
            error={yearError.startYear}
            noIcon
          />
          <Select
            label="Final year"
            onChange={(e) => dispatch(setFinalYear(parseInt(e.target.value)))}
            value={generalValues.finalYear}
            options={years.map((year) => ({
              value: year,
              label: year.toString(),
            }))}
            error={yearError.finalYear}
            noIcon
          />
          <div className="col-span-2">
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
          </div>
          <Input
            label="Discount rate"
            onChange={(e) => dispatch(setDiscount(e.target.value))}
            value={generalValues.discount}
            placeholder="Value"
            helpMessage="The rate at which future costs are adjusted to reflect the present value."
            end={
              <Text color="grey-blue" textSize="input">
                %
              </Text>
            }
            type="number"
          />
          <Input
            label="Plant operating hours"
            onChange={(e) =>
              dispatch(setPlantOperatingHours(parseInt(e.target.value)))
            }
            value={generalValues.plantOperatingHours}
            type="number"
            helpMessage="The number of hours a plant operates in a year. This value will be used to calculate the operating cost for a plant constructed in a year."
            end={
              <Text color="grey-blue" textSize="input">
                /year
              </Text>
            }
          />
          <div className="text-nowrap overflow-visible">
            <Input
              label="Electrical ammonia demand in target year"
              onChange={(e) => dispatch(setElectricalAmmonia(e.target.value))}
              value={generalValues.electricalAmmonia}
              placeholder="Value"
              helpMessage="The amount of electricity that is required to generate ammonia. This value will be used to derive the installed and purchased costs."
              end={
                <Text color="grey-blue" textSize="input">
                  pJ
                </Text>
              }
              type="number"
            />
          </div>
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
