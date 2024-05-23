"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { dailyBalanceStore } from "@/store/dailyBalance";
import { useSession } from "next-auth/react";
import { CgNotes } from "react-icons/cg";
import { FirstBox } from "./firstBox";

export const Resume = () => {
  const { status } = useSession();
  const stateBalance = dailyBalanceStore((state) => state);
  if (status === "loading")
    return (
      <div className="w-full h-10 bg-black/5 rounded-md animate-pulse"></div>
    );
  return (
    <Drawer>
      <DrawerTrigger className="w-full flex justify-end">
        <Button
          variant="outline"
          className="gap-1 text-white bg-pri-900/80 hover:bg-pri-900 w-full"
        >
          <CgNotes className="" />
          <span className="">Resumen</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full flex flex-col justify-center items-center">
        <DrawerHeader className="w-full flex flex-col justify-center items-center">
          <DrawerTitle>Resumen del Cuadre</DrawerTitle>
          <DrawerDescription>
            Resumen general de la venta del dia
          </DrawerDescription>
        </DrawerHeader>
        <div className="container">
          <div className="grid grid-cols-2 gap-4 py-2">
            <FirstBox balance={stateBalance} />
          </div>
        </div>
        <DrawerFooter>
          <div className="w-full flex justify-end gap-2">
            <Button className="w-20">Guardar</Button>
            <Button className="w-20 bg-green-500/30 text-gray-800">
              Imprimir
            </Button>
            <Button className="w-20 bg-gray-500/30 text-gray-800">
              Reiniciar
            </Button>
            <DrawerClose className="w-20">
              <Button variant="outline" className="bg-red-500/30 text-gray-800">
                Cerrar
              </Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
