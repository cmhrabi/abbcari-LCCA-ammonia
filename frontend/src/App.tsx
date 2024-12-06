import React from "react";
import { useRoutes } from "react-router-dom";
import Analysis from "./screens/Analysis";
import Home from "./screens/Home";
import StartNew from "./screens/StartNew";

const routes = [
  {
    path: "/analysis",
    children: [
      {
        element: <Analysis />,
        index: true,
      },
      {
        path: "start",
        element: <StartNew />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
];

const App = () => {
  const appRoutes = useRoutes(routes);
  return appRoutes;
};

export default App;
