import React from "react";
import Button from "../../design/Button/Button";
import Text from "../../design/Text/Text";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

const TitleSlide: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[linear-gradient(115deg,_white_50%,_transparent_50%)]">
      <div className="py-32 max-w-6xl m-auto flex items-center ">
        <div className="w-1/2">
          <div className="pb-9 grid gap-y-4">
            <div className="flex flex-row items-center gap-x-2">
              <Text textSize="h1" color="secondary">
                COMPASS
              </Text>
              <img src={logo} alt="logo" />
            </div>
            <Text textSize="sub1" color="secondary">
              Levelized cost of carbon abatement (LCCA) model
            </Text>
          </div>
          <Button size="large" onClick={() => navigate("/analysis")}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TitleSlide;
