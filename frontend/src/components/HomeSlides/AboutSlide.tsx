import React from "react";
import Button from "../../design/Button/Button";
import Text from "../../design/Text/Text";
import { useNavigate } from "react-router-dom";

const AboutSlide: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
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
              The Levelized Cost of Carbon Abatement (LCCA) is a metric that measures the amount of CO2 reduced by using a cleaner technology. Compass is a dynamic modelling tool leveraging the LCCA to specifically analyze ammonia production strategies to reduce emissions over the upcoming decades.
            </Text>
          </div>
          <Button size="small" onClick={() => {window.open("https://fifth-nautilus-f96.notion.site/User-Manual-1b65baf055248030ac08e9dc0cad11d4")}}>
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutSlide;
