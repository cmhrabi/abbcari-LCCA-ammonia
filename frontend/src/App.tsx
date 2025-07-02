import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import ViewOrCreate from "./screens/ViewOrCreate";
import Home from "./screens/Home";
import StartNew from "./screens/StartNew";
import Analysis from "./screens/Analysis";
import Results from "./screens/Results";
import About from "./screens/About";
import { useAuth0 } from "@auth0/auth0-react";
import { postSignup } from "./api";
import { addToast } from "@heroui/react";

const routes = [
  {
    path: "/analysis",
    children: [
      {
        element: <ViewOrCreate />,
        index: true,
      },
      {
        path: "start",
        element: <StartNew />,
      },
      {
        path: "main",
        element: <Analysis />,
      },
      {
        path: "results",
        element: <Results />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
];

const App = () => {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user?.sub) {
        postSignup(user.sub.replace(/^auth0\|/, ""))
          .then((response) => {
            if (response.error) {
              addToast({
                title: "Error in analysis",
                description: response.error,
                classNames: {
                  base: "bg-danger-bg rounded-3px border-danger",
                  description: "text-grey-dark",
                  icon: "text-danger",
                },
                severity: "danger",
              });
            } else if (response.signedUp) {
              addToast({
                title: "User signed up successfully",
                description: "You can now use the application.",
                classNames: {
                  base: "bg-success-bg rounded-3px border-success",
                  description: "text-grey-dark",
                  icon: "text-success",
                },
                severity: "success",
              });
            }
          })
          .catch((error) => {
            addToast({
              title: "Error in login",
              description: error,
              classNames: {
                base: "bg-danger-bg rounded-3px border-danger",
                description: "text-grey-dark",
                icon: "text-danger",
              },
              severity: "danger",
            });
          });
      }
    }
  }, [isAuthenticated, user]);

  const appRoutes = useRoutes(routes);
  return appRoutes;
};

export default App;
