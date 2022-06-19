import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useAllState, UserContext } from "./UserContext";



const PrivateRoute = ({ chidren }) => {
  const { loginToken } = useAllState()
  const cookies = new Cookies();
  const token = cookies.get("ut");
  // console.log(`ut ${token}`);

  return `ut ${token}` ? chidren : <Navigate to="/" />;
};

export default PrivateRoute;
