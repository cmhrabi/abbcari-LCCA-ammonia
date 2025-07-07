import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Text from "../design/Text/Text";
import Card from "../design/Card/Card";
import { ChartBarSquareIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const Saved = () => {
  const navigate = useNavigate();
  const mockAnalyses = [
    {
      id: 1,
      title: "Analysis 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      title: "Analysis 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 3,
      title: "Analysis 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 4,
      title: "Analysis 4",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 5,
      title: "Analysis 5",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 6,
      title: "Analysis 6",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  return (
    <>
      <NavBar title="COMPASS" />
      <div className="py-16 max-w-6xl m-auto">
        <div className="pb-7">
          <Text color="secondary" textSize="h2">
            Your LCCA Analyses
          </Text>
        </div>
        <div className=" grid grid-cols-3 gap-x-24 gap-y-12">
          {mockAnalyses.map((analysis) => (
            <div key={analysis.id} onClick={() => navigate("/analysis/start")}>
              <Card
                variant="primary"
                description={analysis.description}
                icon={<ChartBarSquareIcon className="size-11 text-primary" />}
              >
                {analysis.title}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Saved;
