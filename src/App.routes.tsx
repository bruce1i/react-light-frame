import { useRoutes, Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

import Layout from "@/layout";

const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="demo" replace /> },
      {
        path: "demo",
        children: [
          { index: true, element: <Navigate to="home" replace /> },
          { path: "home", element: "Home" },
          { path: "about", element: "About" },
        ],
      },
    ],
  },
  { path: "/login", element: "Login" },
  { path: "/404", element: "404" },
  { path: "*", element: <Navigate to="/404" replace /> },
];

function AppRoutes() {
  return useRoutes(appRoutes);
}

export default AppRoutes;
