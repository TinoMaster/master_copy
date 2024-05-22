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
import { useSession } from "next-auth/react";
import { CgNotes } from "react-icons/cg";

export const Resume = () => {
  const { status } = useSession();
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
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Reprehenderit similique neque quidem numquam, optio, ullam
            voluptates doloremque ipsa in asperiores ab, amet nostrum! Quas
            molestias earum iusto in! Ipsum, dignissimos?
          </p>
        </div>
        <DrawerFooter>
          <div className="w-full flex justify-end gap-2">
            <Button className="w-20">Guardar</Button>
            <DrawerClose className="w-20">
              <Button variant="outline">Cerrar</Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
