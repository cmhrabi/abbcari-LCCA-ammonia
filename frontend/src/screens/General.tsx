import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Text from "../design/Text/Text";
import Button from "../design/Button/Button";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../design/Breadcumbs/Breadcrumbs";
import { useAppSelector, useAppDispatch } from "../hooks";
import Input from "../design/Input/Input";
import Select from "../design/Select/Select";
import {
  setDiscount,
  setProvince,
  setElectricalAmmonia,
  setEfficiency,
  setBaseAmmonia,
  setPlantOperatingHours,
} from "../Slices/generalSlice";

const General = () => {
  const analysisName = useAppSelector((state) => state.name.value.analysisName);  
  const discount = useAppSelector((state) => state.general.value.discount);
  const province = useAppSelector((state) => state.general.value.province);
  const electricalAmmonia = useAppSelector((state) => state.general.value.electricalAmmonia);
  const efficiency = useAppSelector((state) => state.general.value.efficiency);
  const baseAmmonia = useAppSelector((state) => state.general.value.baseAmmonia);
  const plantOperatingHours = useAppSelector((state) => state.general.value.plantOperatingHours);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (analysisName && discount && province && electricalAmmonia && efficiency && baseAmmonia && plantOperatingHours) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [analysisName, discount, province, electricalAmmonia, efficiency, baseAmmonia, plantOperatingHours]);

  return (
    <>
      <NavBar title="LCCA" />
      <div className="py-11 max-w-6xl m-auto">
        <Breadcrumbs
          items={[
            { label: "LCCA Analysis", link: "/analysis" },
            { label: "Start New", link: "/analysis/start" },
            { label: `${analysisName} analysis`, link: "" },
          ]}
        />
        <div className="grid grid-cols-1 gap-y-14">
          <Text color="secondary" textSize="h2">
            “P2A vs. HB Analysis” Project
          </Text>
          <Text color="secondary" textSize="sub3">
            General inputs
          </Text>
          <div className="grid grid-cols-2 gap-x-24 gap-y-12 max-w-md">
            <Input
              label="Start year"
              onChange={() => {}}
              placeholder="2024"
              noIcon
            />
            <Input
              label="Final year"
              onChange={() => {}}
              placeholder="2034"
              noIcon
            />
          </div>
          <div className="grid grid-cols-2 gap-x-24 gap-y-12 max-w-screen-lg">
            <Input
              label="Discount rate"
              onChange={(e) => dispatch(setDiscount(e.target.value))}
              value={discount}
              placeholder="Value"
              helpMessage="The rate at which future costs are adjusted to reflect the present value."
            />
            <Select
              label="Province(s) used in analysis"
              onChange={(e) => dispatch(setProvince([e.target.value]))}
              value={province}
              options={["No Selection", "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan"]}
              helpMessage="The province(s) you want to influence the projected cost based on its geographical location on the electricity grid."
            />
            <Input
              label="Electrical ammonia demand in target year (in petajoules)"
              onChange={(e) => dispatch(setElectricalAmmonia(e.target.value))}
              value={electricalAmmonia}
              placeholder="Value"
              helpMessage="The amount of electricity that is required to generate ammonia. This value will be used to derive the installed and purchased costs."
            />
            <Input
              label="Efficiency of the technology"
              onChange={(e) => dispatch(setEfficiency(e.target.value))}
              value={efficiency}
              placeholder="Value"
              helpMessage="The effectiveness of the technology performing its intended function relative to the carbon emission produced."
            />
            <Input
              label="Base electrical ammonia production rate (in petajoules)"
              onChange={(e) => dispatch(setBaseAmmonia(e.target.value))}
              value={baseAmmonia}
              placeholder="Value"
              helpMessage="The current amount of ammonia that can be produced by your new technology. It will be used to calculate future production rates as the technology advances."
            />
            <Input
              label="Plant operating hours"
              onChange={(e) => dispatch(setPlantOperatingHours(e.target.value))}
              value={plantOperatingHours}
              placeholder="8000"
              helpMessage="The number of hours a plant operates in a year. This value will be used to calculate the operating cost for a plant constructed in a year."
            />
          </div>
          <div className="space-x-6">
            <Button color="grey" onClick={() => navigate("/analysis")}>
              Cancel
            </Button>
            <Button color="primary" disabled={disabled}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default General;
