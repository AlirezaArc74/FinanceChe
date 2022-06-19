import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import DashbourdLayout from "./pages/DashbourdLayout";
import NewPurchase from "./pages/NewPurchase";
import User from "./pages/User";
import Tags from "./pages/Tags";
import ExpanseChart from "./pages/ExpanseChart";
import Cookies from "universal-cookie";
import { useAllState } from "./UserContext";

const App = () => {
  // const cookies = new Cookies();
  // const token = cookies.get("ut");

  const { setLoginToken, loginToken } = useAllState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("ut");

    setLoginToken(token);
    setLoading(false);
  }, []);

  if (loading) return <h1>loading...</h1>;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashbourd" element={<DashbourdLayout />}>
        <Route path="newpurchase" element={<NewPurchase />} />
        <Route path="user" element={<User />} />
        <Route path="tags" element={<Tags />} />
        <Route path="charts" element={<ExpanseChart />} />
      </Route>
    </Routes>
  );
};

export default App;

//Information: the language of the app is persian

// Project color palette
// https://coolors.co/palette/d64550-aafac8-33658a-c7ffed-bbc8ca
