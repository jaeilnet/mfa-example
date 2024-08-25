import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { type InjectFuncType, useShellEvent } from "@career-up/shell-router";
import { appNetworkBasename } from "../constants/prefix";

import { importRemote } from "@module-federation/utilities";

const AppNetWork = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useShellEvent("app-network", appNetworkBasename);

  const isFirstRunRef = useRef<boolean>(true);

  const unmountRef = useRef(() => {});

  useEffect(() => {
    if (!isFirstRunRef.current) {
      return;
    }
    isFirstRunRef.current = false;
    importRemote<{ default: InjectFuncType }>({
      url: "http://localhost:3003",
      scope: "network",
      module: "injector",
      remoteEntryFileName: "remoteEntry.js",
    })
      .then(({ default: inject }) => {
        unmountRef.current = inject({
          routerType: "memory",
          rootElement: wrapperRef.current!,
          basePath: location.pathname.replace(appNetworkBasename, ""),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location]);

  useEffect(() => unmountRef.current, []);

  return <div ref={wrapperRef} id="app-network" />;
};

export default AppNetWork;
