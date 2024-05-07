"use client";
import { LoaderPages } from "@/components/loaders/LoaderPages";
import { MenuInfinite } from "@/components/shared/MenuInfinite";
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
import { linksCashierPanel } from "@/constants";
import { useSession } from "next-auth/react";
import { VscSend } from "react-icons/vsc";

const CashierLayout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  if (status === "loading") {
    return <LoaderPages />;
  }
  return (
    <div className="relative flex flex-col justify-between min-h-[calc(100vh-80px)]">
      <div>
        <MenuInfinite
          links={linksCashierPanel}
          cutPath={[3, 5]}
          position="right"
        />
        <h3 className="absolute -top-6 uppercase text-xs px-2 rounded-md lg:hidden">
          Registro de ventas
        </h3>
        {children}
      </div>
      <Drawer>
        <DrawerTrigger className="w-full flex justify-end pr-6">
          <Button
            variant="outline"
            className="gap-1 text-lg text-white bg-pri-900/80 hover:bg-pri-900"
          >
            <VscSend className="" />
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
          <div className="">
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
    </div>
  );
};

export default CashierLayout;
