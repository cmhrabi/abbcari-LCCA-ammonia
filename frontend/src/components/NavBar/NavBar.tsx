import React from "react";
import logo from "../../assets/logo.svg";
import Button from "../../design/Button/Button";
import Text from "../../design/Text/Text";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  title: string;
  type?: "home" | "default";
}

const NavBar: React.FC<NavBarProps> = ({ type = "default" }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex flex-row justify-between items-center shadow-nav-bar py-2.5 px-20 bg-white">
      <div className="flex flex-row items-center">
        <div
          className="flex flex-row items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div>
        <div className="flex flex-row items-right align-items-center space-x-10">
          {type === "home" && (
            <Button
              color="transparent"
              size="medium"
              onClick={() => navigate("/about")}
            >
              About
            </Button>
          )}
          <div className="align-items-center">
            {type === "home" && (
              <Button size="medium" onClick={() => navigate("/analysis/start")}>
                Launch Compass
              </Button>
            )}
          </div>
        </div>
        {type === "default" && (
          /* TODO: Change to text link */
          <div className="flex flex-row items-center space-x-3">
            <Text textSize="input">Help</Text>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
