import { useContext, useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import ErrorToast from "../components/ErrorToast";
import SuccessToast from "../components/SuccessToast";
import { Toaster } from "react-hot-toast";
import Cookies from "universal-cookie";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import bgLogin from "../img/forexChart.jpeg";
import SignUp from "../components/SignUp";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useAllState } from "../UserContext";

const LOGIN_MUTATION = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [inputLoginUsername, setInputLoginUsername] = useState("");
  const [inputLoginPassword, setInputLoginPassword] = useState("");
  const [loginData, setLoginData] = useState("");


  const { setLoginToken, setSignUpModal } = useAllState()

  const cookies = new Cookies();
  const navigate = useNavigate();

  const [send_login_mutation] = useMutation(LOGIN_MUTATION);


  useEffect(() => {
    if (cookies.get("ut")) return navigate("/dashbourd")
  }, []);
  

  const loginDataSubmit = async () => {
    console.log("login");
    try {
      const { data } = await send_login_mutation({
        variables: {
          username: inputLoginUsername,
          password: inputLoginPassword,
        },
      });
      // console.log(data);

      const token = data?.login?.token;
      setLoginToken(token);
      setLoginData(data);
      cookies.set("ut", token);
      SuccessToast("خوش آمدید");
      setTimeout(() => {
        navigate("/dashbourd");
      }, 2000);
    } catch (error) {
      if (error) return ErrorToast("Please first sign up");
      console.log(error);
    }
  };

  const openSignUpModal = () => {
    console.log("Modal is working");
    setSignUpModal(true);
  };

  const makePasswordVisibleClick = () => {
    setVisiblePassword(!visiblePassword);
  };

  // loginToken ? <div> lol </div> : null
  // if(loginToken)
  // if(LoginData) return (<div>sorry</div>)

  // {data ? navigate("/dashbourd") : null}

  // console.log(loginToken);

  return (
    <>
      <Toaster />
      <div
        style={{
          backgroundImage: `url(${bgLogin})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100vw",
          height: "100vh",
        }}
        className=" "
      >
        <SignUp />

        <div className=" bg-blue-  md:flex md:relative md:top-[9rem]   ">
          <div className="text-center text-[#ffffff]  relative top-[1rem] ml-[3rem] bg-red- w-[19rem] sm:ml-[14rem] md:ml-[1rem] lg:ml-[12rem]  ">
            <h1 className="text-[40px] font-bold   -red-500 md:w-[13rem] lg:text-[50px] ">
              financeche
            </h1>
            <p className="text-[20px] font-medium leading-6  md:text-left md:ml-[0rem] -red-400 md:w-[20rem]   ">
              FinanceChe helps you to manage your balance.
            </p>
          </div>

          <div className="drop-shadow-md rounded-md  bg-[#ffffff] w-[20rem]  h-[18rem]  mt-[2.5rem] ml-[2.5rem] sm:ml-[14rem]  md:mt-[-3rem] md:ml-[5rem] ">
            <input
              value={inputLoginUsername}
              onChange={(e) => setInputLoginUsername(e.target.value)}
              className="border  m-4 w-[18rem] outline-[#33658A] p-2 rounded-md "
              placeholder="Email address or phone number"
              type="text"
            />
            <div className=" w-[19rem] flex ">
              <input
                value={inputLoginPassword}
                onChange={(e) => setInputLoginPassword(e.target.value)}
                className="border border-1 m-4 outline-[#33658A] mt-0 w-[16rem] p-2 rounded-md "
                placeholder="Password"
                type={visiblePassword ? "password" : "text"}
              />
              <RemoveRedEyeIcon
                onClick={() => makePasswordVisibleClick()}
                className="mt-[.5rem] cursor-pointer "
              />
            </div>
            <button
              onClick={() => loginDataSubmit()}
              className="bg-[#1a77f2] hover:bg-[#1369db] text-[#ffffff] font-bold duration-500 w-[18rem] p-2 rounded-md m-4 mt-0 "
            >
              Log In
            </button>

            <h6 className="text-center text-[#1a77f2] hover:underline cursor-pointer text-[10px] font-bold mt-[-.2rem]  divide-y ">
              Forgotten password?
            </h6>
            <hr className="w-[18rem] ml-[1rem] mt-[1rem] " />

            <button
              onClick={() => openSignUpModal()}
              className="text-[14px]  bg-[#43b72a] p-2 font-bold text-[#ffffff] m-4 ml-[5rem] rounded-md hover:bg-[#369424] duration-500  "
            >
              Create New Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
