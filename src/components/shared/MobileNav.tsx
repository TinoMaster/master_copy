"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import {
  checkRolePermission,
  cutPathnameByPieces,
  initialRoute,
} from "@/libs/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSettingsOutline } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";
import { Logo } from "./Logo";
import { Profile } from "./Profile";
import { useEffect, useState } from "react";
import { Role, Roles } from "@/services/validators/user.zod";
import { getProject } from "@/services/actions/project.actions";
import { LoaderPageLogo } from "../loaders/LoaderPageLogo";
import useNav from "@/context/navContext";

const MobileNav = () => {
  const [projectName, setProjectName] = useState("");
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const route = cutPathnameByPieces(pathname, 3, 4);
  const initialPath = initialRoute(pathname);
  const { changedProjectName } = useNav();

  useEffect(() => {
    getProject(session?.user?.project as string).then((res) => {
      if (res) {
        setProjectName(res.name);
      }
    });
  }, [session, changedProjectName]);

  return (
    <header className="flex justify-between items-center fixed lg:w-[calc(100%-305px)] xl:w-[calc(100%-337px)] h-16 w-full p-5 bg-gray-50 border-b z-40">
      {status === "loading" || !projectName ? (
        <LoaderPageLogo />
      ) : (
        <Logo name={projectName} />
      )}
      <nav className="flex gap-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <RiMenu3Fill className="text-3xl text-primary lg:hidden" />
          </SheetTrigger>
          <SheetContent
            onClick={() => setOpen(false)}
            className="sheet-content sm:w-64 bg-gray-50"
          >
            <>
              <Logo />
              <ul className="header-nav_elements">
                {navLinks.map((link) => {
                  const isActive = link.route === route;

                  return (
                    <li
                      key={link.route}
                      className={`sidebar-nav_element group ${
                        isActive
                          ? "bg-primary text-gray-100"
                          : "hover:bg-primary/10"
                      } p-18 flex whitespace-nowrap text-dark-700`}
                    >
                      <Link
                        className="sidebar-link cursor-pointer"
                        href={`${initialPath}${link.route}`}
                      >
                        {link.icon && <link.icon className="text-2xl" />}
                        {link.title}
                      </Link>
                    </li>
                  );
                })}
                {checkRolePermission(
                  session?.user?.role as Role,
                  Roles.ADMIN
                ) ? (
                  <li
                    className={`sidebar-nav_element group ${
                      route === "/admin"
                        ? "bg-gray-50 text-gray-700"
                        : "hover:bg-primary/10"
                    } p-18 flex whitespace-nowrap text-dark-700`}
                  >
                    <Link
                      className="sidebar-link cursor-pointer"
                      href={`${initialPath}/admin`}
                    >
                      <IoSettingsOutline className="text-2xl" />
                      Panel Administrador
                    </Link>
                  </li>
                ) : null}
              </ul>
              <button
                onClick={(e) => e.stopPropagation()}
                className="sidebar-nav_element group flex justify-center items-center cursor-pointer gap-2 p-4 bg-gradient-to-tr w-full rounded-full mt-3"
              >
                <Profile />
              </button>
            </>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default MobileNav;
