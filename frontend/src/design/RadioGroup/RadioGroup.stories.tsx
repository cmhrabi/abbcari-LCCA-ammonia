import RadioGroup from "./RadioGroup";
import Radio from "./Radio";
import React from "react";

export default {
  title: "Components/RadioGroup",
};

const RadioGroupDemo = () => {
  return (
    <div className="grid grid-cols-3 gap-4 items-end">
      <RadioGroup label="Radio Label">
        <Radio label="Radio 1" value="1" />
        <Radio label="Radio 2" value="2" />
        <Radio label="Radio 3" value="3" />
      </RadioGroup>
      <RadioGroup label="Radio Label">
        <Radio label="Radio 1" description="Description of value 1" value="1" />
        <Radio label="Radio 2" description="Description of value 2" value="2" />
        <Radio label="Radio 3" description="Description of value 3" value="3" />
      </RadioGroup>
    </div>
  );
};

export const Variants = RadioGroupDemo.bind({});
