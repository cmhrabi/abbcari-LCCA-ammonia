import Select from "./Select";
import React from "react";

export default {
  title: "Design/Select",
};

const SelectDemo = () => {
  const options = [
    { value: "Calum", label: "Calum" },
    { value: "Stuti", label: "Stuti" },
    { value: "Adnan", label: "Adnan" },
  ];

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
