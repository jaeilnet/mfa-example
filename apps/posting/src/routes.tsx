import React from "react";

import { AppRoutingManager } from "@career-up/shell-router";
import { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppRoutingManager type="app-posting" />,
    errorElement: <div>Error Posting</div>,
    children: [
      { index: true, element: <div>App Posting Root</div> },
      {
        path: "1",
        element: <div>App Posting Page 1</div>,
      },
    ],
  },
];
