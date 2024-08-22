import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { useShellEvent } from "@career-up/shell-router";
import { appNetworkBasename } from "../constants/prefix";

import inject from "network/injector";

const AppNetWork = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useShellEvent("app-network", appNetworkBasename);

  const isFirstRunRef = useRef<boolean>(true);

  const umountRef = useRef(() => {});

  useEffect(() => {
    if (!isFirstRunRef.current) {
      return;
    }

    umountRef.current = inject({
      routerType: "memory",
      rootElement: wrapperRef.current!,
      basePath: location.pathname.replace(appNetworkBasename, ""),
    });

    isFirstRunRef.current = false;
  }, [location]);

  useEffect(() => umountRef.current, []);

  return <div ref={wrapperRef} id="app-network" />;
};

export default AppNetWork;
