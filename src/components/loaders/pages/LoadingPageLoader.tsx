export const LoadingPageLoader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-5 items-center p-2 lg:p-8 sm:max-w-md rounded-lg w-full sm:bg-black/10 sm:shadow-lg z-10 animate-pulse">
        <div className="w-1/2 m-auto h-8 bg-white/5 rounded-md my-3" />
        <div className="w-36 m-auto h-36 bg-white/5 rounded-full my-3" />
        <div className="w-full h-10 bg-white/5 rounded-md my-3" />
        <div className="w-full h-10 bg-white/5 rounded-md my-3" />
        <div className="w-full h-10 bg-white/5 rounded-md my-3" />
      </div>
    </div>
  );
};
