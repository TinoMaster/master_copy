import { IBalanceStore } from "@/types/dailyBalance";
import { useState } from "react";

export const WorkerAccordion = ({
  worker,
}: {
  worker: IBalanceStore["workers"][0];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full text-left py-2 px-4 focus:outline-none focus:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <span className="text-gray-700">{worker.name}</span>
          <svg
            className={`w-6 h-6 transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="px-4 pb-2">
          <p className="text-gray-700">Salary: ${worker.salary}</p>
          <p className="text-gray-700">
            Discount: {worker.discount.percentage}% / ${worker.discount.fixed}
          </p>
          <p className="text-gray-700">
            Salary Type: {worker.salaryType.percentage}% / $
            {worker.salaryType.fixed}
          </p>
        </div>
      )}
    </div>
  );
};
