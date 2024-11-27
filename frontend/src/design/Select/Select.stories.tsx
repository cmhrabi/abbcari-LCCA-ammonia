import Select from "./Select";
import React from "react";

export default {
  title: "Components/Select",
};

const SelectDemo = () => {
  const options = ["Calum", "Stuti", "Adnan"];

  return (
    <div className="grid grid-cols-3 gap-4 items-end">
      <Select options={options} />
      <Select
        options={options}
        label="Field Label"
        helpMessage="Help Message"
      />
      <Select options={options} label="Field Label" disabled />
      <Select options={options} error="Error Message" />
      <Select
        options={options}
        label="Field Label"
        error="Error Message"
        helpMessage="Help Message"
      />
      <Select
        options={options}
        label="Field Label"
        error="Error Message"
        disabled
      />
    </div>
  );
};

export const Variants = SelectDemo.bind({});
