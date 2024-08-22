import React from "react";
import { type RouteObject } from "react-router-dom";
import {
  AppRoutingManager,
  Auth0ClientProvider,
} from "@career-up/shell-router";

import PageList from "./pages/page-list";
import Layout from "./components/Layout";
import PageDetail from "./pages/page-detail";

const domain = process.env.REACT_APP_AUTH0_DOMAIN!;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID!;
const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL!;

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Auth0ClientProvider options={{ clientId, domain, redirectUri }}>
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
