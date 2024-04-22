"use client";
import React, { useState, useContext, createContext, useMemo } from "react";

type NavState = {
  menuIsOpen: boolean;
  setMenuIsOpen(menu: boolean): void;
};

const NavContext = createContext<NavState | null>(null);

const useNav = (): NavState => {
  const context = useContext(NavContext);
  if (!context) throw new Error("Please use ThemeProvider in parent component");
  return context;
};

export const NavProvider = ({ children }: { children: React.ReactNode }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const data = useMemo(
    () => ({ menuIsOpen, setMenuIsOpen }),
    [menuIsOpen, setMenuIsOpen]
  );
  return <NavContext.Provider value={data}>{children}</NavContext.Provider>;
};

export default useNav;
