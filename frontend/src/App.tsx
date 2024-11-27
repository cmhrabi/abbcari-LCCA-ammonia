import React from "react";
import { useRoutes } from "react-router-dom";
import Analysis from "./screens/Analysis";
import Home from "./screens/Home";

const routes = [
  {
    path: "/analysis",
    element: <Analysis />,
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
