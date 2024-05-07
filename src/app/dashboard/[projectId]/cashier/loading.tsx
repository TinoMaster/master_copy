export default function LoadingCashierPages() {
  return (
    <div className="flex flex-col items-center w-screen h-screen animate-pulse">
      {/* Skeleton del banner que ocupa el 60% de la altura visible (vh) */}
      <div className="container h-[60vh] mb-4 flex flex-col gap-2 justify-center items-center">
        <p className="max-w-720p w-[200px] h-5 rounded-full bg-white/20"></p>
        <p className="max-w-720p w-full mx-4 h-10 rounded-full bg-white/20"></p>
      </div>
    </div>
  );
}
