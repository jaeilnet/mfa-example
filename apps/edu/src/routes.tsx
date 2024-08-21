import React from "react";
import { type RouteObject } from "react-router-dom";
import { AppRoutingManager } from "@career-up/shell-router";
import Auth0ClientProvider from "./providers/auth0-client-provider";
import PageList from "./pages/page-list";
import Layout from "./components/Layout";
import PageDetail from "./pages/page-detail";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Auth0ClientProvider>
        <Layout>
          <AppRoutingManager type="app-edu" />
        </Layout>
      </Auth0ClientProvider>
    ),
    errorElement: <div>App Edu Error</div>,
    children: [
      {
        index: true,
        element: <PageList />,
      },
      {
        path: ":id",
        element: <PageDetail />,
      },
    ],
  },
];
