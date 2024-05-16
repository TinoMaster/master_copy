"use client";
import React, { useState, useContext, createContext, useMemo } from "react";

type NavState = {
  menuIsOpen: boolean;
  setMenuIsOpen(menu: boolean): void;
  changedProjectName: boolean;
  updateProjectNameState(): void;
};

const NavContext = createContext<NavState | null>(null);

const useNav = (): NavState => {
  const context = useContext(NavContext);
  if (!context) throw new Error("Please use ThemeProvider in parent component");
  return context;
};

export const NavProvider = ({ children }: { children: React.ReactNode }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [changedProjectName, setChangedProjectName] = useState(false);

  const updateProjectNameState = useMemo(
    () => () => {
      setChangedProjectName((prev) => !prev);
    },
    [setChangedProjectName]
  );

  const data = useMemo(
    () => ({
      menuIsOpen,
      setMenuIsOpen,
      changedProjectName,
      updateProjectNameState,
    }),
    [menuIsOpen, setMenuIsOpen, changedProjectName, updateProjectNameState]
  );
  return <NavContext.Provider value={data}>{children}</NavContext.Provider>;
};

export default useNav;
