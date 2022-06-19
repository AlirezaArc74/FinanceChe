import { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import SuccessToast from "./SuccessToast";
import ErrorToast from "./ErrorToast";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Toaster } from "react-hot-toast";
import { useAllState, UserContext } from "../UserContext";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const SIGN_UP_MUTATION = gql`
  mutation Mutation($name: String!, $username: String!, $password: String!) {
    signup(name: $name, username: $username, password: $password) {
      token
    }
  }
`;

const SignUp = () => {
  const [inputName, setInputName] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState();
  const [visiblePassword, setVisiblePassword] = useState(true);

  const { setSignupToken, signUpModal, setSignUpModal } =
    useAllState()

  const [send_signup_mutation] = useMutation(SIGN_UP_MUTATION);

  const cookies = new Cookies();
  const navigate = useNavigate();

  const signUpDataSubmit = async () => {
    try {
      const { data } = await send_signup_mutation({
        variables: {
          name: inputName,
          username: inputUsername,
          password: inputPassword,
        },
      });
      const token = data.signup.token;
      setSignupToken(token);
      cookies.set("ut", token);
      SuccessToast("You Sign Up Successfully");

      setTimeout(() => {
        setSignUpModal(false);
      }, 1000);
    } catch (error) {
      if (error) return ErrorToast("Error");
      console.log(error);
    }
  };

  const makePasswordVisibleClick = () => {
    setVisiblePassword(!visiblePassword);
  };

  const closeSignUpModal = () => {
    setSignUpModal(false);
  };

  return (
    <>
      {signUpModal ? (
        <>
          <Toaster />
          <div
            onClick={() => closeSignUpModal()}
            className="bg-[#ffffff] w-screen h-screen absolute z-40 opacity-80"
          ></div>
          <div className="absolute  w-[20rem]  h-[25rem] z-50 ml-[2.5rem] md:ml-[19rem] lg:ml-[26rem] top-[5rem] lg:top-[8rem] md:top-[8rem] bg-[#ffffff] drop-shadow-md rounded-md ">
            <div className="ml-[1rem] mt-[.5rem] ">
              <h1 className="font-bold text-[24px]  "> Sign Up </h1>
              <p className="text-[#606770] text-[12px] ">it's quick and easy</p>
            </div>
            <div className="absolute right-2 top-2  ">
              <CloseIcon onClick={() => closeSignUpModal()} />
            </div>
            <hr className="mt-[.5rem] " />

            <div>
              <input
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="bg-[#f5f6f7] outline-none border m-4 p-1 rounded-md w-[18rem] "
                placeholder="name"
                type="text"
              />
              <input
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                className="bg-[#f5f6f7] outline-none border m-4 p-1 rounded-md w-[18rem] "
                placeholder="username"
                type="text"
              />
              <div className=" w-[19rem] flex ">
                <input
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  className="bg-[#f5f6f7] outline-none border m-4 p-1 rounded-md w-[16rem]  "
                  placeholder="password"
                  type={visiblePassword ? "password" : "text"}
                />
                <RemoveRedEyeIcon
                  onClick={() => makePasswordVisibleClick()}
                  className="mt-[1.3rem] cursor-pointer "
                />
              </div>

              <button
                onClick={() => signUpDataSubmit()}
                className="p-2 font-bold bg-[#05a302] hover:bg-[#0b6d09] text-[#ffffff] rounded-md w-[12rem] ml-[4rem] mt-[2rem] "
              >
                Sign Up
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default SignUp;
