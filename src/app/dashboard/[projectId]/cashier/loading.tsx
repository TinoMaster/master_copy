export default function LoadingCashierPages() {
  return (
    <div className="max-w-720p mx-auto w-full">
      <div className="w-full h-[calc(100vh-280px)] rounded-md flex flex-col gap-4">
        <div className="w-full h-32 bg-black/5 rounded-md animate-pulse"></div>
        <div className="w-full grow bg-black/5 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
}
