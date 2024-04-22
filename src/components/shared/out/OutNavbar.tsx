import React from "react";
import { OutProfile } from "./OutProfile";
import { NavBarMobile } from "./NavBarMobile";
import { navLinksOut } from "@/constants";
import { NavbarLink } from "./NavbarLink";

export const OutNavbar = () => {
  return (
    <div className="flex items-center justify-end gap-2 lg:gap-4 relative">
      <ul className="gap-5 hidden lg:flex items-center">
        {navLinksOut?.map((link) => (
          <NavbarLink key={link.title} link={link} />
        ))}
      </ul>
      <OutProfile />
      <NavBarMobile links={navLinksOut} />
    </div>
  );
};
