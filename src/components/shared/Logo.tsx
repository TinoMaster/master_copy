export const Logo = ({
  withText = true,
  withProjectName = false,
  name,
}: {
  withText?: boolean;
  withProjectName?: boolean;
  name?: string;
}) => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="w-10 h-10 overflow-hidden rounded-full shadow bg-white p-1 border-2 border-primary"></div>

      {withText && (
        <div className="">
          <span className="text-2xl font-bold text-white">Copy Master</span>

          {withProjectName && (
            <div className="flex ml-1 items-center gap-1 text-sm">
              <span className="font-bold text-white">Proyecto:</span>
              <span className="font-bold text-white">{name}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
