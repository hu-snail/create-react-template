import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";

import LayoutPage from "@/layout";

const Home = lazy(() => import("@/views/index"));
const TempDetail = lazy(() => import("@/views/detail"));

const routeList = [
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "detail",
        element: <TempDetail />,
      },
    ],
  },
];

const RenderRouter = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
