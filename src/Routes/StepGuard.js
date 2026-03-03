import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const StepGuard = ({ children }) => {
  const step = useSelector(state => state.Red_Auth.step);
  const isLoading = useSelector(state => state.Red_Auth.isLoading);
  const location = useLocation();

  // if (isLoading) return null;
// Cookies.remove("auth_step");
// Cookies.remove("refresh_token");
  const routeByStep = {
    login: "/",
    signup: "/",
    otp: "/user-verification",
    company: "/company-registration",
    dashboard: "/CustomerInfo",
  };

  const expectedPath = routeByStep[step];

  if (expectedPath && location.pathname !== expectedPath) {
    return <Navigate to={expectedPath} replace />;
  }

  return children;
};

export default StepGuard;
