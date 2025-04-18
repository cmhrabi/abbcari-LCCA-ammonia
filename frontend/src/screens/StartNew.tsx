import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Text from "../design/Text/Text";
import Input from "../design/Input/Input";
import Radio from "../design/RadioGroup/Radio";
import RadioGroup from "../design/RadioGroup/RadioGroup";
import Button from "../design/Button/Button";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../design/Breadcumbs/Breadcrumbs";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  setAnalysisName,
  setTech1Name,
  setTech2Name,
  setType,
} from "../Slices/nameSlice";

const descriptionText = `
  A dynamic modeling tool that allows you to analyze strategies and scenarios to reduce carbon emissions for ammonia production process for the upcoming decades. Levelized cost of carbon abatement (LCCA) is a new time-dependent parameter that can be used to inform decision-making practices.
`;

const StartNew = () => {
  const nameValues = useAppSelector((state) => state.name.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (
      nameValues.analysisName &&
      nameValues.tech1Name &&
      nameValues.tech2Name &&
      nameValues.type
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [nameValues]);

  return (
    <>
      <NavBar title="COMPASS" />
      <div className="py-11 max-w-6xl m-auto">
        <Breadcrumbs
          items={[
            { label: "LCCA Analysis", link: "/" },
            { label: "Start New", link: "" },
          ]}
        />
        <div className="grid grid-cols-1 gap-y-10">
          <div>
            <div className="pb-3">
              <Text color="secondary" textSize="h2">
                Start a new analysis
              </Text>
            </div>
            <Text textSize="sub2">{descriptionText}</Text>
          </div>
          <div className="max-w-sm">
            <Input
              value={nameValues.analysisName}
              onChange={(e) => dispatch(setAnalysisName(e.target.value))}
              label={<Text textSize="sub3">Enter a name for your project</Text>}
              placeholder="Name"
              noIcon
            />
          </div>
          <RadioGroup
            onChange={(e) => dispatch(setType(e.target.value))}
            value={nameValues.type}
            label="What type of LCCA Analysis will you be performing?"
          >
            <Radio
              value="phi"
              label="Replace an existing plant"
              description="There is an existing chemical plant to produce ammonia and you are looking to replace it."
            />
            <Radio
              value="psi"
              label="Build a new plant"
              description="There is no existing chemical plant to produce ammonia. You are interested in comparing two chemical processes."
            />
          </RadioGroup>
          <div className="grid grid-cols-1 gap-y-14">
            <div className="max-w-xl">
              <Input
                value={nameValues.tech1Name}
                onChange={(e) => dispatch(setTech1Name(e.target.value))}
                label={
                  <Text textSize="sub3">
                    What is the name of the electrified process you would like
                    to compare?
                  </Text>
                }
                placeholder="E.g. Power to Ammonia"
                noIcon
              />
            </div>
            <div className="max-w-xl overflow-visible text-nowrap">
              <Input
                value={nameValues.tech2Name}
                onChange={(e) => dispatch(setTech2Name(e.target.value))}
                label={
                  <Text textSize="sub3">
                    What is the name of the conventional natural gas process you
                    would like to compare?
                  </Text>
                }
                placeholder="E.g. Grey"
                noIcon
              />
            </div>
          </div>
          <div className="space-x-6">
            <Button color="grey" onClick={() => navigate("/")}>
              Cancel
            </Button>
            <Button
              color="primary"
              disabled={disabled}
              onClick={() => navigate("/analysis/main")}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartNew;
