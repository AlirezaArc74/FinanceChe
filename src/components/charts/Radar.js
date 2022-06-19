import { useContext } from "react";
import { useAllState, UserContext } from "../../UserContext";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = () => {

  const { mapData } = useAllState()

  const tag = mapData?.map((tags) => tags.tags )
  const tagName = tag?.flat().map((tag) => tag.name)
  const amount = mapData?.map((amount) => amount.amount)
  // console.log(amount)
  const data = {
    labels: tagName,
    datasets: [
      {
        label: '# of Votes',
        data: amount,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],

  };
  return (
    <>
      <div>
        <Radar data={data} />
      </div>
    </>
  );
};

export default RadarChart;
