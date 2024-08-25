import React, { Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import {
  appEduBasename,
  appJobBasename,
  appNetworkBasename,
  appPostingBasename,
} from "./constants/prefix";
import Layout from "./components/layout";
import Auth0ProviderWithNavigator from "./components/auth0-provider-with-navigator";

import AppEdu from "./components/app-edu";
import AppPosting from "./components/app-posting";
import AppNetwork from "./components/app-network";
import AppJob from "./components/app-job";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Auth0ProviderWithNavigator>
        <Layout />
      </Auth0ProviderWithNavigator>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={appPostingBasename} />,
      },
      {
        path: `${appPostingBasename}/*`,
        element: <AppPosting />,
      },
      {
        path: `${appEduBasename}/*`,
        element: <AppEdu />,
      },
      {
        path: `${appNetworkBasename}/*`,
        element: <AppNetwork />,
      },
      {
        path: `${appJobBasename}/*`,
        element: <AppJob />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={browserRouter} />;
};

export default Router;
