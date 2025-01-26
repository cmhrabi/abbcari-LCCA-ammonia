import React, { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Text from "../design/Text/Text";
import Breadcrumbs from "../design/Breadcumbs/Breadcrumbs";
import { useAppSelector } from "../hooks";
import Wizard from "../design/Wizard/Wizard";
import General from "../components/AnalysisForm/General";
import FirstTechnology from "../components/AnalysisForm/FirstTechnology";
import Review from "./Review";

const Analysis = () => {
  const analysisName = useAppSelector((state) => state.name.value.analysisName);
  const tech1Name = useAppSelector((state) => state.name.value.tech1Name);
  const tech2Name = useAppSelector((state) => state.name.value.tech2Name);
  const [currStep, setCurrStep] = useState(0);

  return (
    <>
      <NavBar title="COMPASS" />
      <div className="py-11 max-w-6xl m-auto">
        <Breadcrumbs
          items={[
            { label: "LCCA Analysis", link: "/analysis" },
            { label: "Start New", link: "/analysis/start" },
            { label: `${analysisName} analysis`, link: "" },
          ]}
        />
        <div className="grid grid-cols-1 gap-y-10">
          <Text color="secondary" textSize="h2">
            “{tech1Name} vs. {tech2Name}” Project
          </Text>
          <Wizard
            defaultStep={0}
            currentStep={currStep}
            steps={[
              {
                title: "General",
              },
              {
                title: "Electrified Process",
              },
              {
                title: "Conventional Natural Gas Process",
              },
              {
                title: "Review",
              },
            ]}
          />
        </div>
        {currStep === 0 && <General setCurrStep={setCurrStep} />}
        {currStep === 1 && <FirstTechnology setCurrStep={setCurrStep} />}
        {currStep === 3 && <Review setCurrStep={setCurrStep} />}
      </div>
    </>
  );
};

export default Analysis;
