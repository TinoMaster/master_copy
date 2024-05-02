"use client";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";

export const ButtonDeleteProject = () => {
  return (
    <Button className="flex items-center justify-center gap-2 p-3 mt-2 font-medium text-sm text-center text-white bg-red-500/70 hover:bg-red-500 active:bg-red-700 rounded-lg sm:mt-0">
      <FaTrash />
      Eliminar 
    </Button>
  );
};
