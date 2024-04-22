import { OutNavbar } from "@/components/shared/out/OutNavbar";
import Link from "next/link";

const layoutOut = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <header className="w-full flex justify-between items-center text-slate-200 py-3 fixed z-30 lg:pr-5 lg:pl-10 px-3 h-[70px] select-none bg-darkMode">
        <Link href={"/"} className="flex flex-col items-center">
          <h1 className="text-2xl lg:text-3xl text-white font-serif font-extrabold">
            Copy Manager
          </h1>
        </Link>
        <OutNavbar />
      </header>
      <div className="min-h-screen">{children}</div>
    </div>
  );
};

export default layoutOut;
