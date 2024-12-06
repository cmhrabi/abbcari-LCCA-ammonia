import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Text from "../design/Text/Text";
import Input from "../design/Input/Input";
import Radio from "../design/RadioGroup/Radio";
import RadioGroup from "../design/RadioGroup/RadioGroup";
import Button from "../design/Button/Button";

const StartNew = () => {
  return (
    <>
      <NavBar title="LCCA" />
      <div className="py-16 max-w-6xl m-auto content-stretch">
        <div className="grid grid-cols-1 gap-y-14">
          <Text color="secondary" textSize="h2">
            Start a new analysis
          </Text>
          <div className="w-1/3">
            <Input
              label={<Text textSize="sub3">Enter a name for your project</Text>}
              placeholder="Name"
              noIcon
            />
          </div>
          <RadioGroup label="What type of LCCA Analysis will you be performing?">
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
        </div>
        <div className="align-end">
          <Button color="secondary" disabled>
            Cancel
          </Button>
          <Button color="primary" disabled>
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default StartNew;
