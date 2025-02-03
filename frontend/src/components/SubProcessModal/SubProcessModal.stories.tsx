import SubProcessModal from "./SubProcessModal";
import { BrowserRouter } from "react-router-dom";
import React from "react";

export default {
  title: "Components/SubProcessModal",
};

const SubProcessModalDemo = () => {
  return (
    <BrowserRouter>
      <div>
        <SubProcessModal isOpen={true} onOpenChange={() => false} />
      </div>
    </BrowserRouter>
  );
};

export const Variants = SubProcessModalDemo.bind({});
