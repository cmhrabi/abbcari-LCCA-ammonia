import React from "react";
import Button from "../../design/Button/Button";
import Text from "../../design/Text/Text";
import { useNavigate } from "react-router-dom";

const AboutSlide: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[linear-gradient(-115deg,_white_50%,_transparent_50%)]">
      <div className="py-16 max-w-6xl m-auto flex justify-end">
        <div className="w-5/12">
          <div className="pb-6 grid gap-y-4 grid-cols-1">
            <Text textSize="sub1" color="primary">
              INTRODUCTION
            </Text>
            <Text textSize="h2" color="secondary">
              What is Compass?
            </Text>
            <Text textSize="sub2">
              A dynamic modeling tool that allows you to analyze strategies and
              scenarios to reduce carbon emissions for ammonia production for
              the upcoming decades.
            </Text>
          </div>
          <Button size="small" onClick={() => navigate("/")}>
            Learn more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutSlide;
