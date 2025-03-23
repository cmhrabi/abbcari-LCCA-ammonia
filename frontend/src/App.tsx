import React from "react";
import { useRoutes } from "react-router-dom";
import ViewOrCreate from "./screens/ViewOrCreate";
import Home from "./screens/Home";
import StartNew from "./screens/StartNew";
import Analysis from "./screens/Analysis";
import Results from "./screens/Results";
import About from "./screens/About";

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
  const appRoutes = useRoutes(routes);
  return appRoutes;
};

export default App;
