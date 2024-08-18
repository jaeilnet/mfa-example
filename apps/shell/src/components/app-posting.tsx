import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { useShellEvent } from "@career-up/shell-router";
import { appPostingBasename } from "../constants/prefix";

import inject from "posting/injector";

const AppPosting = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useShellEvent("app-posting", appPostingBasename);

  const isFirstRunRef = useRef<boolean>(true);

  const umountRef = useRef(() => {});

  useEffect(() => {
    if (!isFirstRunRef.current) {
      return;
    }

    umountRef.current = inject({
      routerType: "memory",
      rootElement: wrapperRef.current!,
      basePath: location.pathname.replace(appPostingBasename, ""),
    });

    isFirstRunRef.current = false;
  }, [location]);

  useEffect(() => umountRef.current, []);

  return <div ref={wrapperRef} id="app-posting" />;
};

export default AppPosting;
