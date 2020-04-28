import { useState, useEffect, createContext } from "react";

const appNameFromActivePath = (pathname, appsList) => {
  const all = pathname.split("/").filter(v => v !== "app");
  const app = appsList.find(app => {
    return all.some(v => app.name === v);
  });

  if (app) {
    return app.displayName;
  }

  return "Dashboard";
};

const PathContext = createContext({
  activePath: "",
  activeApp: "",
  appsList: {}
});

const useActivePath = (history, location, appsList) => {
  if (appsList === (void 0)) {
    throw new Error("Apps list object should be passed in");
  }
  const [ activePath, setActivePath ] = useState(location.pathname);
  const [ activeApp, setActiveApp ] = useState(
    appNameFromActivePath(location.pathname, appsList)
  );

  /* Set the active path on state changes. */
  useEffect(() => {
    const removeListener = history.listen((location) => {
      setActivePath(location.pathname);
      setActiveApp(appNameFromActivePath(location.pathname, appsList));
    });

    return () => {
      return removeListener();
    };
  }, []);

  return { activePath, activeApp };
};

export { PathContext, useActivePath };
