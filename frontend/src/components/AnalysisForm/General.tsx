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
  setFinalDemand,
  setPlantOperatingHours,
  setStartYear,
  setFinalYear,
  setBaselineDemand,
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
    const hasNegativeValues =
      generalValues.discount.includes("-") ||
      generalValues.baselineDemand.includes("-") ||
      generalValues.finalDemand.includes("-");

    const incorrectStartYear =
      generalValues.startYear >= generalValues.finalYear;
    const incorrectFinalYear =
      generalValues.finalYear <= generalValues.startYear;
    const discount = Number(generalValues.discount);
    const isDiscountTooHigh = discount > 100;

    if (
      generalValues.discount &&
      generalValues.finalDemand &&
      generalValues.baselineDemand &&
      generalValues.plantOperatingHours &&
      !generalValues.province.includes("No Selection") &&
      generalValues.startYear &&
      generalValues.finalYear &&
      !hasNegativeValues &&
      !isDiscountTooHigh &&
      !incorrectStartYear &&
      !incorrectFinalYear
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
  const [discountStringError, setDiscountStringError] = useState("");
  const [demandStringError, setDemandStringError] = useState("");
  const [finalDemandStringError, setFinalDemandStringError] = useState("");
  const [plantHoursError, setPlantHoursError] = useState("");
  const [provinceError, setProvinceError] = useState("");

  useEffect(() => {
    const discountStr = generalValues.discount || "";
    const discountValue = parseFloat(discountStr);

    if (discountStr.includes("-")) {
      setDiscountStringError("Discount rate must be positive.");
    } else if (discountValue > 100) {
      setDiscountStringError("Discount rate must be less than 100%.");
    } else {
      setDiscountStringError("");
    }
  }, [generalValues.discount]);

  useEffect(() => {
    if (generalValues.baselineDemand.includes("-")) {
      setDemandStringError(
        "Current electrical ammonia production must be positive.",
      );
    } else {
      setDemandStringError("");
    }
  }, [generalValues.baselineDemand]);

  useEffect(() => {
    if (generalValues.finalDemand.includes("-")) {
      setFinalDemandStringError(
        "Electrical ammonia demand in target year must be positive.",
      );
    } else {
      setFinalDemandStringError("");
    }
  }, [generalValues.finalDemand]);

  useEffect(() => {
    if (generalValues.plantOperatingHours <= 0) {
      setPlantHoursError("Plant operating hours must be positive.");
    } else {
      setPlantHoursError("");
    }
  }, [generalValues.plantOperatingHours]);

  useEffect(() => {
    if (generalValues.province.includes("No Selection")) {
      setProvinceError("Please select a province.");
    } else {
      setProvinceError("");
    }
  }, [generalValues.province]);

  const years = Array.from({ length: 25 }, (_, i) => 2026 + i);
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
              label="Province or territory used in analysis"
              error={provinceError}
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
                {
                  value: "Northwest Territories",
                  label: "Northwest Territories",
                },
                { value: "Yukon", label: "Yukon" },
              ]}
              helpMessage="The province you want to influence the projected cost based on its geographical location on the electricity grid."
              link="https://www.notion.so/User-Manual-1b65baf055248030ac08e9dc0cad11d4?pvs=4#1b85baf0552480a69553ccb1c616b57f"
            />
          </div>
          <div className="text-nowrap overflow-visible col-span-2">
            <Input
              label="Current electrical ammonia production"
              onChange={(e) => dispatch(setBaselineDemand(e.target.value))}
              value={generalValues.baselineDemand}
              placeholder="Value"
              helpMessage="The amount of electricity that is required to generate ammonia. This value will be used to derive the installed and purchased costs."
              end={
                <Text color="grey-blue" textSize="input">
                  pJ
                </Text>
              }
              type="number"
              error={demandStringError}
              // noIcon
            />
          </div>
          <div className="text-nowrap overflow-visible col-span-2">
            <Input
              label="Electrical ammonia demand in target year"
              onChange={(e) => dispatch(setFinalDemand(e.target.value))}
              value={generalValues.finalDemand}
              placeholder="Value"
              helpMessage="The amount of electricity that is required to generate ammonia. This value will be used to derive the installed and purchased costs."
              end={
                <Text color="grey-blue" textSize="input">
                  pJ
                </Text>
              }
              type="number"
              error={finalDemandStringError}
              link="Some"
              // noIcon
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
            error={discountStringError}
            // noIcon
          />
          <Input
            label="Plant operating hours"
            error={plantHoursError}
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
