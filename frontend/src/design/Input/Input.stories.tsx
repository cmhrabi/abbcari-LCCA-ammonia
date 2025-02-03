import Input from "./Input";
import React from "react";
import Text from "../Text/Text";

export default {
  title: "Design/Input",
};

const InputDemo = () => {
  return (
    <div className="grid grid-cols-3 gap-4 items-end">
      <Input
        placeholder="Placeholer"
        start={<Text color="grey-label">%</Text>}
        end={<Text color="grey-label">%</Text>}
      />
      <Input
        placeholder="Placeholer"
        label="Field Label"
        helpMessage="Help Message"
        end={<Text color="grey-label">%</Text>}
      />
      <Input placeholder="Placeholer" label="Field Label" disabled />
      <Input placeholder="Placeholer" error="Error Message" />
      <Input
        placeholder="Placeholer"
        label="Field Label"
        error="Error Message"
        helpMessage="Help Message"
      />
      <Input
        placeholder="Placeholer"
        label="Field Label"
        error="Error Message"
        disabled
      />
    </div>
  );
};

export const Variants = InputDemo.bind({});
