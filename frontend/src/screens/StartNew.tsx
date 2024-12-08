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

const StartNew = () => {
  const analysisName = useAppSelector((state) => state.name.value.analysisName);
  const tech1Name = useAppSelector((state) => state.name.value.tech1Name);
  const tech2Name = useAppSelector((state) => state.name.value.tech2Name);
  const type = useAppSelector((state) => state.name.value.type);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (analysisName && tech1Name && tech2Name && type) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [analysisName, tech1Name, tech2Name, type]);

  return (
    <>
      <NavBar title="LCCA" />
      <div className="py-11 max-w-6xl m-auto">
        <Breadcrumbs
          items={[
            { label: "LCCA Analysis", link: "/analysis" },
            { label: "Start New", link: "" },
          ]}
        />
        <div className="grid grid-cols-1 gap-y-14">
          <Text color="secondary" textSize="h2">
            Start a new analysis
          </Text>
          <div className="w-1/3">
            <Input
              value={analysisName}
              onChange={(e) => dispatch(setAnalysisName(e.target.value))}
              label={<Text textSize="sub3">Enter a name for your project</Text>}
              placeholder="Name"
              noIcon
            />
          </div>
          <RadioGroup
            onChange={(e) => dispatch(setType(e.target.value))}
            value={type}
            label="What type of LCCA Analysis will you be performing?"
          >
            <Radio
              value="phi"
              label="There is existing infrastructure"
              description="Are you replacing an existing technology?"
            />
            <Radio
              value="psi"
              label="There is no existing infrastructure"
              description="Are you deciding between which technologies to start implementing?"
            />
          </RadioGroup>
          {type && analysisName && (
            <div className="grid grid-cols-1 gap-y-14">
              <div className="w-1/2">
                <Input
                  value={tech1Name}
                  onChange={(e) => dispatch(setTech1Name(e.target.value))}
                  label={
                    <Text textSize="sub3">
                      What is the name of the first technology you would like to
                      compare?
                    </Text>
                  }
                  noIcon
                />
              </div>
              <div className="w-1/2">
                <Input
                  value={tech2Name}
                  onChange={(e) => dispatch(setTech2Name(e.target.value))}
                  label={
                    <Text textSize="sub3">
                      What is the name of the second technology you would like
                      to compare?
                    </Text>
                  }
                  noIcon
                />
              </div>
            </div>
          )}
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

export default StartNew;
