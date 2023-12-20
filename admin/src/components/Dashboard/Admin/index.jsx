import {
  faChartArea,
  faChartColumn,
  faChartLine,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  BarElement,
  Legend
);
export default function DashboardAdmin() {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: ["123", "142", 123, 66, 34, 123, 123],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [34, 534, 555, 43, 675, 4, 23, 656],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-5">
        <div className="flex bg-[#f3f6f9] rounded-lg justify-between items-center p-5">
          {" "}
          <FontAwesomeIcon
            className="text-5xl text-blue-500"
            icon={faChartLine}
          />{" "}
          <div>
            <p className="text-lg font-semibold text-gray-400 m-0">
              Today sale
            </p>
            <p className="my-3 font-bold">$345</p>
          </div>
        </div>
        <div className="flex bg-[#f3f6f9] rounded-lg justify-between items-center p-5">
          {" "}
          <FontAwesomeIcon
            className="text-5xl text-blue-500"
            icon={faChartColumn}
          />{" "}
          <div>
            <p className="text-lg font-semibold text-gray-400 m-0">
              Total sale
            </p>
            <p className="my-3 font-bold">$345</p>
          </div>
        </div>
        <div className="flex bg-[#f3f6f9] rounded-lg justify-between items-center p-5">
          {" "}
          <FontAwesomeIcon
            className="text-5xl text-blue-500"
            icon={faChartArea}
          />{" "}
          <div>
            <p className="text-lg font-semibold text-gray-400 m-0">
              Today revenue
            </p>
            <p className="my-3 font-bold">$345</p>
          </div>
        </div>
        <div className="flex bg-[#f3f6f9] rounded-lg justify-between items-center p-5">
          {" "}
          <FontAwesomeIcon
            className="text-5xl text-blue-500"
            icon={faChartPie}
          />{" "}
          <div>
            <p className="text-lg font-semibold text-gray-400 m-0">
              Total revenue
            </p>
            <p className="my-3 font-bold">$345</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-5 gap-5">
        <div className="bg-[#f3f6f9] rounded-lg p-5">
          <Line data={data} />
        </div>
        <div className="bg-[#f3f6f9] rounded-lg p-5">
          <Bar data={data} />
        </div>
      </div>
    </div>
  );
}
