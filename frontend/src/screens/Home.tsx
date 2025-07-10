import React, { useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import TitleSlide from "../components/HomeSlides/TitleSlide";
import VisualizeSlide from "../components/HomeSlides/VisualizeSlide";
import AboutSlide from "../components/HomeSlides/AboutSlide";
import ClimateFactsSlide from "../components/HomeSlides/ClimateFactsSlide";
import AcknowledgementSlide from "../components/HomeSlides/AcknowledgementSlide";
import { resetState as resetNameState } from "../Slices/nameSlice";
import { resetState as resetGeneralState } from "../Slices/generalSlice";
import { resetState as resetElectrifiedState } from "../Slices/electrifiedSlice";
import { resetState as resetConventionalState } from "../Slices/conventionalSlice";
import { useAppDispatch } from "../hooks";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetConventionalState());
    dispatch(resetElectrifiedState());
    dispatch(resetGeneralState());
    dispatch(resetNameState());
  }, []);

  return (
    <div>
      <NavBar title="COMPASS" type="home" />
      <div className="overflow-visible bg-home-bg">
        <TitleSlide />
        <VisualizeSlide />
        <AboutSlide />
        <ClimateFactsSlide />
        <AcknowledgementSlide />
      </div>
    </div>
  );
};

export default Home;
