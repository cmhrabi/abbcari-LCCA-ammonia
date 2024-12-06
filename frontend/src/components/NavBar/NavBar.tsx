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

const NavBar: React.FC<NavBarProps> = ({ title, type = "default" }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex flex-row justify-between items-center shadow-nav-bar py-2.5 px-9 bg-white">
      <div className="flex flex-row items-center">
        <div
          className="flex flex-row items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" />
          <Text color="primary" textSize="nav-title" font="josefin">
            {title}
          </Text>
        </div>
        <div className="pl-6">
          {/* TODO: Change to text link */}
          {type === "home" && <Text textSize="sub2">About</Text>}
        </div>
      </div>
      <div>
        {type === "home" && (
          <Button size="small" onClick={() => navigate("/analysis")}>
            Launch LCCA
          </Button>
        )}
        {type === "default" && (
          /* TODO: Change to text link */
          <div className="flex flex-row items-center space-x-3">
            <Text textSize="input">Help</Text>
            <Bars3Icon onClick={() => {}} className="size-6 cursor-pointer" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
