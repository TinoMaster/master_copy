import Link from "next/link";

export const Logo = ({ name }: { name?: string }) => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {name ? (
        <>
          <div className="w-10 h-10 overflow-hidden rounded-full shadow bg-white p-1 border-2 border-primary"></div>
          <div className="flex ml-1 items-center gap-1 text-sm">
            <span className="text-2xl font-bold text-primary">{name}</span>
          </div>
        </>
      ) : (
        <Link
          href={"/"}
          className="text-2xl font-bold text-primary m-auto rounded px-2 py-1"
        >
          Copy Master
        </Link>
      )}
    </div>
  );
};
