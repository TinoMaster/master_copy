"use client";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { UserOptions } from "./UserOptions";

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
        <div className="bg-gradient-to-r from-gray-100 to-white text-darkMode absolute z-20 top-[48px] right-2 lg:right-0 p-4 lg:flex flex-col justify-center gap-2 rounded-lg hidden">
          <UserOptions business={session.user.business ?? ""} />
        </div>
      )}
    </div>
  );
};
