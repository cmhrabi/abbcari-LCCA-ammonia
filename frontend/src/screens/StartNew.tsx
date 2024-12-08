import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Text from "../design/Text/Text";
import Input from "../design/Input/Input";
import Radio from "../design/RadioGroup/Radio";
import RadioGroup from "../design/RadioGroup/RadioGroup";
import Button from "../design/Button/Button";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../design/Breadcumbs/Breadcrumbs";

const StartNew = () => {
  const [radioVal, setRadioVal] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState("");
  const [tech1, setTech1] = useState("");
  const [tech2, setTech2] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (radioVal && name && tech1 && tech2) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, radioVal, tech1, tech2]);

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
              value={name}
              onChange={(e) => setName(e.target.value)}
              label={<Text textSize="sub3">Enter a name for your project</Text>}
              placeholder="Name"
              noIcon
            />
          </div>
          <RadioGroup
            onChange={(e) => setRadioVal(e.target.value)}
            value={radioVal}
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
          {radioVal && name && (
            <div className="grid grid-cols-1 gap-y-14">
              <div className="w-1/2">
                <Input
                  value={tech1}
                  onChange={(e) => setTech1(e.target.value)}
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
                  value={tech2}
                  onChange={(e) => setTech2(e.target.value)}
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
