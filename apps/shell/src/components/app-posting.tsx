import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { type InjectFuncType, useShellEvent } from "@career-up/shell-router";
import { appPostingBasename } from "../constants/prefix";
import { importRemote } from "@module-federation/utilities";

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

    isFirstRunRef.current = false;
    importRemote<{ default: InjectFuncType }>({
      url: "http://localhost:3001",
      scope: "posting",
      module: "injector",
      remoteEntryFileName: "remoteEntry.js",
    })
      .then(({ default: inject }) => {
        umountRef.current = inject({
          routerType: "memory",
          rootElement: wrapperRef.current!,
          basePath: location.pathname.replace(appPostingBasename, ""),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location]);

  useEffect(() => umountRef.current, []);

  return <div ref={wrapperRef} id="app-posting" />;
};

export default AppPosting;
