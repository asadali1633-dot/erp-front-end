import Cookies from "js-cookie";
import { SET_STEP } from "../store/action/types";

const STEP_KEY = "auth_step";

export const STEPS = {
  LOGIN: "login",
  SIGNUP: "signup",
  OTP: "otp",
  COMPANY: "company",
  SUBSCRIPTIONS: "subscriptions",
  DASHBOARD: "dashboard",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  EMAIL: "email_screen"

};


export const setStepCookie = (step) => {
  Cookies.set(STEP_KEY, step, { expires: 1 });
};


export const getStepCookie = () => {
  return Cookies.get(STEP_KEY) || null;
};

export const clearStepCookie = () => {
  Cookies.remove(STEP_KEY);
  Cookies.remove("refresh_token");
};
