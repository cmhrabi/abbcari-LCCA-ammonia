import HelpMessage from "./HelpMessage";
import React from "react";

export default {
  title: "Components/HelpMessage",
};

const HelpMessageDemo = () => {
  return (
    <div>
      <HelpMessage type={"info"}>Help Message</HelpMessage>
    </div>
  );
};

export const Variants = HelpMessageDemo.bind({});
