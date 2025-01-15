import Button from "./Button";
import glyph from "../../../public/glyph.svg";
import React from "react";

export default {
  title: "Design/Button",
};

const ButtonDemo = () => {
  return (
    <div className="space-y-3">
      <div className="space-x-3">
        <Button size="small" color="primary">
          Small Button
        </Button>
        <Button size="medium" color="primary">
          Medium Button
        </Button>
        <Button size="large" color="primary">
          Large Button
        </Button>
      </div>
      <div className="space-x-3">
        <Button size="small" start={<img src={glyph} />} color="primary">
          Start
        </Button>
        <Button
          size="medium"
          start={<img src={glyph} />}
          end={<img src={glyph} />}
          color="primary"
        >
          Both
        </Button>
        <Button
          size="large"
          start={<img src={glyph} />}
          end={<img src={glyph} />}
          color="primary"
        >
          End
        </Button>
        <Button size="small" isIconOnly color="primary">
          <img src={glyph} />
        </Button>
      </div>
    </div>
  );
};

export const Variants = ButtonDemo.bind({});
