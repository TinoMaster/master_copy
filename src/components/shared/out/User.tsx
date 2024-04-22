"use client";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";

export const User = ({ session }: { session: Session }) => {
  const [menuProfile, setMenuProfile] = useState(false);

  useEffect(() => {
    if (menuProfile) {
      window.addEventListener("click", () => {
        setMenuProfile(false);
      });
    }

    return () => {
      window.removeEventListener("click", () => {
        setMenuProfile(false);
      });
    };
  }, [menuProfile]);

  console.log(menuProfile);
  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMenuProfile((prev) => !prev);
  };

  return (
    <div>
      <button
        onClick={(e) => toggleMenu(e)}
        className="w-10 h-10 text-gray-700 flex justify-center items-center font-bold text-2xl bg-white rounded-full"
      >
        {session.user.username[0].toUpperCase()}
      </button>

      {menuProfile && (
        <div className="bg-gradient-to-r from-gray-100 to-white text-darkMode absolute z-20 top-[48px] right-2 lg:right-0 p-4 flex flex-col justify-center gap-2 rounded-lg">
          {/* {linksLogoProfile.map(({ title, href }, idx) => (
                  <Link
                     key={title}
                     href={href}
                     className="flex items-center gap-1 p-2 rounded-lg hover:bg-white/90 hover:text-gray-800 transition-colors duration-150"
                  >
                     {}
                     <span className="capitalize text-sm">{title}</span>
                  </Link>
               ))} */}
          <button
            onClick={() => signOut()}
            className="flex items-center gap-1 p-2 rounded-lg hover:bg-white/90 hover:text-gray-800 transition-colors duration-150"
          >
            <RiLogoutCircleLine className="text-lg" />
            <span className="capitalize text-sm">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};
