import { Outlet, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import bgDashbourd from "../img/forexDashbourd.jpeg";
import Cookies from "universal-cookie";
import SuccessToast from "../components/SuccessToast";
import { Toaster } from "react-hot-toast";
import logo from "../img/logo.png";
import { gql, useQuery } from "@apollo/client";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Test from "../components/Test";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import UploadImage from "../components/UploadImage";
import useLocalStorage from "use-local-storage";
import "../App.css";
import { useAllState } from "../UserContext";
const GET_ME_QUERY = gql`
  query Query {
    me {
      _id
      name
      username
      img
    }
  }
`;

const DashbourdLayout = () => {
  const [hiddenDashbourd, setHiddenDashbourd] = useState(false);

  const { setLoginToken } = useAllState();

  const [theme, setTheme] = useState(false);

  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("ut");

  const { error, loading, data, refetch } = useQuery(GET_ME_QUERY);

  const switchTheme = () => {
    setTheme(!theme);
  };

  useEffect(() => {
    refetch();
    if (!token) return navigate("/");
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p> errorvvvvv; </p>;
  }

  // console.log(data);

  const openDashbourd = () => {
    setHiddenDashbourd(true);
  };

  const closeDashbourd = () => {
    setHiddenDashbourd(false);
  };

  const openDashbourdClick = () => {
    setHiddenDashbourd(!hiddenDashbourd);
  };

  const removeCookieClick = () => {
    cookies.remove(`ut`, { path: "/" });
    setLoginToken("")
    SuccessToast("You successfully loged out");
    // refetch();
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  // console.log(loginToken)

  return (
    <>
      {/* <Test /> */}
      <div
        style={{
          backgroundImage: `url(${bgDashbourd})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
          // opacity: .8,
        }}
        className={` ${theme ? "themeAll" : ""} w-screen h-screen`}
      >
        <div className="w-screen  h-[5rem] bg-[#BBC8CA] ">
          <div className="absolute right-[8rem] top-[.5rem] ">
            <img
              // onClick={() => navigate("/")}
              className="w-[15rem]  cursor-pointer    "
              src={logo}
              alt="image of logo"
            />
            <p className="text-right text-[13px] mt-[-.5rem] ">
              نرم افزار مدیریت دارایی
            </p>
          </div>
          <MenuIcon
            onClick={() => openDashbourdClick()}
            className="absolute right-[2rem] top-[3rem]  cursor-pointer "
            sx={{ color: blue[900] }}
          />

          <button
            className="absolute right-[2rem] top-[1rem]"
            onClick={switchTheme}
          >
            theme
          </button>

          <div className="flex justify-between absolute top-[1rem] left-[1rem] w-[14rem] -red-500 ">
            <div>
              <img
                className="rounded-full w-[4rem] h-[4rem] mt-[-.3rem] "
                src={`${UploadImage.domain}/${data?.me?.img}`}
              />
              {/* <AccountCircleIcon fontSize="large" /> */}
            </div>
            <div>
              {data.me.name}
              {token ? (
                <div className="w-[6rem] bg-[#479b61]  text-[12px] text-[#ffffff] mt-[.5rem] p-1 rounded-md ">
                  احراز هویت شده
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div
          onMouseEnter={() => openDashbourd()}
          className="bg-[#BBC8CA]   fixed right-0 w-[3rem] -0 h-fit  drop-shadow-lg scale-x-100	 "
        >
          <PersonIcon
            className="mt-[2rem] ml-[.7rem] "
            sx={{ color: blue[900] }}
          />

          <ShoppingCartIcon
            className="mt-[4rem] ml-[.7rem] "
            sx={{ color: blue[900] }}
          />

          <LocalOfferIcon
            className="mt-[4rem] ml-[.7rem] "
            sx={{ color: blue[900] }}
          />

          <InsertChartIcon
            className="mt-[4rem] ml-[.7rem] "
            sx={{ color: blue[900] }}
          />

          <PowerSettingsNewIcon
            className="mt-[24.7rem] ml-[.7rem]  "
            sx={{ color: blue[900] }}
          />
        </div>
        <div
          onMouseLeave={() => closeDashbourd()}
          style={{ zIndex: 999 }}
          className="bg-[#BBC8CA] fixed z-40   right-[0rem] w-[9rem] h-fit  "
          style={{
            transform: hiddenDashbourd ? "translateX(0)" : "translateX(1000px)",
            transition: "all .2s",
          }}
        >
          <div
            onClick={() => navigate("/dashbourd/user")}
            className="flex justify-between cursor-pointer items-center hover:bg-[#e0eff3] mt-[2rem] bg   h-[3rem]  "
          >
            <h1 className="font-bold ml-[.5rem] text-center text-[13px] bg-red- w-[10rem]  ">
              حساب کاربری
            </h1>
            <PersonIcon className=" mr-[.7rem]" sx={{ color: blue[900] }} />
          </div>

          <div
            onClick={() => navigate("/dashbourd/newpurchase")}
            className="flex justify-between cursor-pointer items-center hover:bg-[#e0eff3] mt-[2rem] h-[3rem]"
          >
            <h1 className="font-bold ml-[2.5rem] text-center text-[13px] bg-red- w-[10rem]">
              ثبت خرید
            </h1>
            <ShoppingCartIcon
              className="  mr-[1rem] "
              sx={{ color: blue[900] }}
            />
          </div>
          <div
            onClick={() => navigate("/dashbourd/tags")}
            className="flex justify-between cursor-pointer mt-[2rem] items-center hover:bg-[#e0eff3] h-[3rem]"
          >
            <h1 className="font-bold ml-[2.5rem] text-center text-[13px] bg-red- w-[10rem] ">
              ثبت تیکت
            </h1>
            <LocalOfferIcon
              className="  mr-[1rem] "
              sx={{ color: blue[900] }}
            />
          </div>

          <div
            onClick={() => navigate("/dashbourd/charts")}
            className="flex justify-between cursor-pointer mt-[2rem] items-center hover:bg-[#e0eff3] h-[3rem]"
          >
            <h1 className="font-bold ml-[2.5rem] text-center text-[13px] bg-red- w-[10rem] ">
              نمودار
            </h1>
            <InsertChartIcon
              className="  mr-[1rem] "
              sx={{ color: blue[900] }}
            />
          </div>

          <div
            onClick={() => removeCookieClick()}
            className="flex justify-between cursor-pointer bg-red- mt-[23.3rem] items-center hover:bg-[#e0eff3]  h-[3rem] "
          >
            <h1 className="font-bold ml-[4rem] text-center text-[13px] bg-red- w-[10rem]">
              خروج
            </h1>
            <PowerSettingsNewIcon
              className=" mr-[1rem] "
              sx={{ color: blue[900] }}
            />
          </div>
        </div>
        <Toaster />

        <Outlet />

        <Test />
      </div>
    </>
  );
};

export default DashbourdLayout;
