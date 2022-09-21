import { Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

import Layout from "@/layout";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="demo" replace /> },
      {
        path: "demo",
        children: [
          { index: true, element: "Home" },
          { path: "about", element: "About" },
          { path: "setting", element: "Setting" },
          { path: "puzzle", element: "Puzzle" },
        ],
      },
    ],
  },
  { path: "/login", element: "Login" },
  { path: "/404", element: "404" },
  { path: "*", element: <Navigate to="/404" replace /> },
];
