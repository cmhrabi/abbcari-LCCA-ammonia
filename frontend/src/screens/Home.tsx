import React from "react";
import NavBar from "../components/NavBar/NavBar";
import TitleSlide from "../components/HomeSlides/TitleSlide";
import VisualizeSlide from "../components/HomeSlides/VisualizeSlide";
import AboutSlide from "../components/HomeSlides/AboutSlide";
import ClimateFactsSlide from "../components/HomeSlides/ClimateFactsSlide";

const Home = () => {
  return (
    <div className="overflow-visible">
      <NavBar title="COMPASS" type="home" />
      <TitleSlide />
      <VisualizeSlide />
      <AboutSlide />
      <ClimateFactsSlide />
    </div>
  );
};

export default Home;
