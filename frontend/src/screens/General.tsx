import React, { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Text from "../design/Text/Text";
import Button from "../design/Button/Button";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../design/Breadcumbs/Breadcrumbs";
import { useAppSelector } from "../hooks";
import Input from "../design/Input/Input";

const General = () => {
  const analysisName = useAppSelector((state) => state.name.value.analysisName);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [disabled, setDisabled] = useState(true);

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
              label="Analysis name"
              value={analysisName}
              onChange={() => {}}
              placeholder="2024"
              noIcon
            />
            <Input
              label="Analysis name"
              value={analysisName}
              onChange={() => {}}
              placeholder="2034"
              noIcon
            />
          </div>
          <div className="grid grid-cols-2 gap-x-24 gap-y-12 max-w-screen-lg">
            <Input
              label="Analysis name"
              value={analysisName}
              onChange={() => {}}
              placeholder="Name"
            />
            <Input
              label="Analysis name"
              value={analysisName}
              onChange={() => {}}
              placeholder="Name"
            />
            <Input
              label="Analysis name"
              value={analysisName}
              onChange={() => {}}
              placeholder="Name"
            />
            <Input
              label="Analysis name"
              value={analysisName}
              onChange={() => {}}
              placeholder="Name"
            />
            <Input
              label="Analysis name"
              value={analysisName}
              onChange={() => {}}
              placeholder="Name"
            />
            <Input
              label="Analysis name"
              value={analysisName}
              onChange={() => {}}
              placeholder="Name"
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
