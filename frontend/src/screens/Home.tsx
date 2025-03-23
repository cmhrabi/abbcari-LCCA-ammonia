import React from "react";
import NavBar from "../components/NavBar/NavBar";
import TitleSlide from "../components/HomeSlides/TitleSlide";
import VisualizeSlide from "../components/HomeSlides/VisualizeSlide";
import AboutSlide from "../components/HomeSlides/AboutSlide";
import ClimateFactsSlide from "../components/HomeSlides/ClimateFactsSlide";
import AcknowledgementSlide from "../components/HomeSlides/AcknowledgementSlide";

const Home = () => {
  return (
    <div className="overflow-visible bg-home-bg">
      <NavBar title="COMPASS" type="home" />
      <TitleSlide />
      <VisualizeSlide />
      <AboutSlide />
      <ClimateFactsSlide />
      <AcknowledgementSlide />
    </div>
  );
};

export default Home;
