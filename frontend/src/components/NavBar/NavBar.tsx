import React from "react";
import logo from "../../assets/logo.svg";
import Button from "../../design/Button/Button";
import Text from "../../design/Text/Text";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  title: string;
  type?: "home" | "default";
}

const NavBar: React.FC<NavBarProps> = ({ type = "default" }) => {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

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
              <Button size="medium" onClick={() => navigate("/analysis")}>
                Launch Compass
              </Button>
            )}
          </div>
        </div>
        {type === "default" && (
          <div className="flex flex-row items-right align-items-center space-x-10">
            <div
              className="flex flex-row items-center cursor-pointer"
              onClick={() => {
                window.open(
                  "https://fifth-nautilus-f96.notion.site/User-Manual-1b65baf055248030ac08e9dc0cad11d4",
                );
              }}
            >
              <Text textSize="input">Help</Text>
            </div>
            {isAuthenticated ? (
              <Button
                size="medium"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Logout
              </Button>
            ) : (
              <Button size="medium" onClick={() => loginWithRedirect()}>
                Login
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
