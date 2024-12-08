import NoLoginModal from "./NoLoginModal";
import { BrowserRouter } from "react-router-dom";
import React from "react";

export default {
  title: "Components/NoLoginModal",
};

const NoLoginModalDemo = () => {
  return (
    <BrowserRouter>
      <div>
        <NoLoginModal isOpen={true} onOpenChange={() => false} />
      </div>
    </BrowserRouter>
  );
};

export const Variants = NoLoginModalDemo.bind({});
