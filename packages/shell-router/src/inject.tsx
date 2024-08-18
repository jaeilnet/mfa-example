import { RouteObject, RouterProvider } from "react-router-dom";
import { createRouter } from "./router";
import { RouterType } from "./types";
import { createRoot } from "react-dom/client";

export interface InjectFactoryProps {
  rootElement: HTMLElement;
  basePath?: string;
  routerType: RouterType;
}

export const injectFactory = ({ routes }: { routes: RouteObject[] }) => {
  return ({ rootElement, basePath, routerType }: InjectFactoryProps) => {
    const router = createRouter({
      type: routerType,
      routes,
      basePath,
    });

    const root = createRoot(rootElement);
    root.render(<RouterProvider router={router} />);

    return () => queueMicrotask(() => root.unmount());
  };
};
