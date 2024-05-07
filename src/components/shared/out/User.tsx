"use client";
import { useEffect, useState } from "react";
import { UserOptions } from "./UserOptions";
import { useSession } from "next-auth/react";

export const User = () => {
  const { data: session } = useSession();

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

  if (!session) return null;

  return (
    <div>
      <button
        onClick={(e) => toggleMenu(e)}
        className="w-10 h-10 text-gray-500 flex justify-center items-center font-bold text-2xl bg-primary/10 rounded-full"
      >
        {session.user.username[0].toUpperCase()}
      </button>

      {menuProfile && (
        <div className="bg-gradient-to-r from-gray-100 to-white text-darkMode absolute z-20 top-[48px] right-2 lg:right-0 p-4 lg:flex flex-col justify-center gap-2 rounded-lg hidden">
          <UserOptions />
        </div>
      )}
    </div>
  );
};
