import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {  red } from "@mui/material/colors";
import toast from "react-hot-toast";

const ErrorToast = (msg) =>
  toast(msg, {
    duration: 4000,
    position: "top-right",
    style: {
      background: "#FB8377",
    },
    icon: <ErrorOutlineIcon sx={{ color: red[800] }} />,
  });

export default ErrorToast;
