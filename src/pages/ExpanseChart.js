import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import BarChart from "../components/charts/BarChart";
import { useContext } from "react";
import { useAllState, UserContext } from "../UserContext";
import PieChart from "../components/charts/PieChart";
import Radar from "../components/charts/Radar";

const EXPANSE_QUERY = gql`
  query Query {
    getMyExpenses {
      _id
      amount
      tags {
        name
        color
        _id
      }
      geo {
        lat
        lon
      }
      date
    }
  }
`;

const ExpanseChart = () => {
  const { mapData, setMapData } = useAllState()

  const { error, loading, data, refetch } = useQuery(EXPANSE_QUERY);

  useEffect(() => {
    refetch();
    setMapData(data?.getMyExpenses);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // console.log(mapData);

  return (
    <>
      <div className="-red-400 ">
        {/* <div
          className="ml-8"
          style={{
            backgroundColor: "#ffffff",
            width: "19rem ",
            height: "20rem",
          }}
        >
          <PieChart />
        </div> */}
        <div
        className="ml-[6rem] "
          style={{
            backgroundColor: "#ffffff",
            width: "40rem ",
            height: "20rem",
          }}
        >
          <BarChart />
        </div>
        {/* <div
          style={{
            backgroundColor: "#ffffff",
            width: "18rem ",
            height: "20rem",
          }}
        >
          <Radar />
        </div> */}
      </div>
    </>
  );
};

export default ExpanseChart;
