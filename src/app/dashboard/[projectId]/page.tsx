import { FirstBox } from "@/components/pages/Home/first-box";

const HomePage = () => {
  return (
    <div className="grid 2xl:grid-cols-2 lg:grid-rows-2 gap-4 w-full h-screen">
      <FirstBox />
      {/* Second Box */}
      <div className="bg-blue-500/10"></div>
      {/* Third Box */}
      <div className="bg-green-500/10"></div>
      {/* Fourth Box */}
      <div className="bg-yellow-500/10"></div>
    </div>
  );
};

export default HomePage;
