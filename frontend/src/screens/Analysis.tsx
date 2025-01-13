import React, { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Text from "../design/Text/Text";
import Alert from "../design/Alert/Alert";
import Card from "../design/Card/Card";
import {
  MagnifyingGlassCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import NoLoginModal from "../components/NoLoginModal/NoLoginModal";
import { useDisclosure } from "@nextui-org/react";

const descriptionText = `
  A dynamic modeling tool that allows you to analyze strategies and scenarios to reduce carbon emissions for hydrogen production for the upcoming decades. Levelized cost of carbon abatement (LCCA) is a new time-dependent parameter that can be used to inform decision-making practices.
`;

const Analysis = () => {
  const [alertOpen, setAlertOpen] = useState(true);
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <NavBar title="COMPASS" />
      <div className="py-16 max-w-6xl m-auto">
        <div className="pb-7">
          <Text color="secondary" textSize="h2">
            LCCA Analysis
          </Text>
        </div>
        <div className="pb-6">
          <Text textSize="sub2">{descriptionText}</Text>
        </div>
        {alertOpen && (
          <Alert
            title="Log in to explore without limits"
            message="You can perform your analysis without logging in, but to save and revisit your analysis later, please log in or create an account. Don't worry, you can still export a PDF to your computer at any time without logging in."
            action={onOpen}
            actionLabel="Log In"
            secondaryAction={() => {
              setAlertOpen(false);
            }}
            secondaryLabel="Close"
          />
        )}
        <div className="justify-self-center grid grid-cols-2 w-3/4 gap-x-24">
          <div onClick={() => navigate("/analysis/start")}>
            <Card
              variant="primary"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              icon={<PlusCircleIcon className="size-11 text-primary" />}
            >
              Start a new analysis
            </Card>
          </div>
          <div onClick={onOpen}>
            <Card
              variant="primary"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              icon={
                <MagnifyingGlassCircleIcon className="size-11 text-primary" />
              }
            >
              View saved analyses
            </Card>
          </div>
        </div>
      </div>
      <NoLoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default Analysis;
