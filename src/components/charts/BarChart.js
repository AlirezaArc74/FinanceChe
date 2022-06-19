import { useContext, useEffect } from "react";
import { useAllState, UserContext } from "../../UserContext";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "نمودار مخارج",
    },
  },
};

const BarChart = () => {
  const { mapData } = useAllState()

  const labels = mapData?.map((item) => item.date);

  const data = {
    labels,
    datasets: [
      {
        label: "مقدار",
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        data: mapData?.map((item) => item.amount),
        backgroundColor: "blue",
      },
      // {
      //   label: "Dataset 2",
      //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
    ],
  };

  return (
    <>
      <div className="m-[3rem] ml-[5rem] w-20rem">
        <Bar options={options} data={data} />
      </div>
    </>
  );
};

export default BarChart;
