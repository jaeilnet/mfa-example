import React, { Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { appPostingBasename } from "./constants/prefix";
import Layout from "./components/layout";

const AppPostingLazy = React.lazy(() => import("./components/app-posting"));

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={browserRouter} />;
};

export default Router;
