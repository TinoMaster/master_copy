import React from "react";
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
import { Button } from "@/components/ui/button";
import { CgNotes } from "react-icons/cg";


export const Resume = () => {
  return (
    <Drawer>
      <DrawerTrigger className="w-full flex justify-end pr-6">
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
