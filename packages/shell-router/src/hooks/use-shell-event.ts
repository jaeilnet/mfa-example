import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useShellEvent = (type: string, basename: string) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const appNavigatedEventHandler = (event: Event) => {
      const pathname = (event as CustomEvent<string>).detail;
      const newPathname =
        pathname === "/" ? basename : `${basename}${pathname}`;

      if (newPathname === location.pathname) {
        return;
      }

      navigate(newPathname);
    };

    window.addEventListener(`[${type}] navigated`, appNavigatedEventHandler);

    return () => {
      window.removeEventListener(
        `[${type}] navigated`,
        appNavigatedEventHandler
      );
    };
  }, [basename, location.pathname, navigate, type]);

  useEffect(() => {
    if (location.pathname.startsWith(basename)) {
      window.dispatchEvent(
        new CustomEvent("[app-shell] navigated", {
          detail: location.pathname.replace(basename, ""),
        })
      );
    }
  }, [basename, location.pathname]);
};

export default useShellEvent;
