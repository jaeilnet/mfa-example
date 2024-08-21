import React, { Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { appEduBasename, appPostingBasename } from "./constants/prefix";
import Layout from "./components/layout";
import Auth0ProviderWithNavigator from "./components/auth0-provider-with-navigator";

const AppPostingLazy = React.lazy(() => import("./components/app-posting"));
const AppEduLazy = React.lazy(() => import("./components/app-edu"));

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
        element: (
          <Suspense fallback={<div>loading</div>}>
            <AppPostingLazy />
          </Suspense>
        ),
      },
      {
        path: `${appEduBasename}`,
        element: (
          <Suspense fallback="Loading">
            <AppEduLazy />
          </Suspense>
        ),
      },
      {
        path: `${appEduBasename}/*`,
        element: (
          <Suspense fallback="Loading">
            <AppEduLazy />
          </Suspense>
        ),
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={browserRouter} />;
};

export default Router;
