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
import { VscSend } from "react-icons/vsc";

const CashierLayout = ({ children }: { children: React.ReactNode }) => {
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
            className="gap-1 text-lg text-white bg-green-500/80 hover:bg-green-500"
          >
            <VscSend className="" />
            <span className="">Resumen</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CashierLayout;
