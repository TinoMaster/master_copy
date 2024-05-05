import { Profits } from "./Profits";
import { SellsStatistics } from "./SellsStatistics";

export const FirstBox = () => {
  return (
    <div className="grid xl:grid-rows-2 gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Profits />
        <SellsStatistics />
      </div>
      <div className="bg-green-500/10"></div>
    </div>
  );
};
