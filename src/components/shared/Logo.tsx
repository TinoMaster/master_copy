import Image from "next/image";
import React from "react";

export const Logo = ({ withText = true }: { withText?: boolean }) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="w-10 h-10 overflow-hidden rounded-full shadow bg-white p-1 border-2 border-primary">
        <Image
          src="/assets/images/suennovirtual-logo.jpg"
          alt="logo"
          width={152}
          height={23}
          className="object-cover"
        />
      </div>

      {withText && (
        <span className="text-2xl font-bold text-white">Sueño Virtual</span>
      )}
    </div>
  );
};
