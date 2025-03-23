import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Button from "../design/Button/Button";
import MeetTheTeam from "../components/AboutPage/MeetTheTeam";
import { useNavigate } from "react-router-dom";
import TitleSlide from "../components/HomeSlides/TitleSlide";
import Text from "../design/Text/Text";
import logo from "../assets/logo.svg";
import team from "../assets/team.svg";


const About = () => {
  const navigate = useNavigate();
    
  return (
    <div className="overflow-visible">
      <NavBar title="COMPASS" type="home" />
          <div className="py-24 max-w-6xl m-auto flex items-center">
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
          </div>
          </div>
          <div className="space-y-8">
              <MeetTheTeam />
          </div>
          <div className="py-24 max-w-6xl m-auto flex items-center">
              <div className="pb-9 grid gap-y-4">
                <Text textSize="h1" color="secondary">
                    Our goal
                </Text>
                <Text textSize="sub2">
                    The goal of the students was to bring this model to life by developing a web application consisting of a front-end user interface connected to a back-end consisting of the computing module and necessary datasets. With access to such a model, experts across various sectors can use this information to create impactful policies to help reduce greenhouse gas emissions globally. 
                </Text>
              </div>
          </div>
          
    </div>
    
  );
};

export default About;