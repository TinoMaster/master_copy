import { FaFilter } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="grid xl:grid-cols-2 grid-rows-2 gap-4 w-full h-screen">
      <div className="grid xl:grid-rows-2 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-white/5 rounded-md">
            <div className="flex justify-between items-center">
              <h4 className="mini-title">Ganancias</h4>
              <FaFilter />
            </div>
            <div></div>
            <div></div>
          </div>
          <div className="bg-gray-500/10"></div>
        </div>
        <div className="bg-green-500/10"></div>
      </div>
      <div className="bg-blue-500/10"></div>
      <div className="bg-green-500/10"></div>
      <div className="bg-yellow-500/10"></div>
    </div>
  );
};

export default HomePage;
