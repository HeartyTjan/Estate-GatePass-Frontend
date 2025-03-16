import { createBrowserRouter } from "react-router-dom";
import Signin from "../auth/signin/Signin";
import Signup from "../auth/signup/SignUP";
import OtpGenerator from "../component/generateOTP/OtpGenerator";
import SignupSecurity from "../auth/signup/SignupSecurity";
import ValidateOtp from "../component/validateOtp/ValidateOtp";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <OtpGenerator />,
    element: <Signin />,
  },

  {
    path: "/signin",
    element: <Signin />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signup-security",
    element: <SignupSecurity />,
  },
  {
    path: "/home",
    element: <OtpGenerator />,
  },
  {
    path: "/validate",
    element: <ValidateOtp />,
  },
]);

export default router;
