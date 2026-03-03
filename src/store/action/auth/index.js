import {
  SET_ACCESS_TOKEN,
  CLEAR_AUTH,
  SET_LOADING,
  SET_STEP,
  CLEAR_STEP
} from "../types";
import baseUrl from '../../../config.json'
import Cookies from "js-cookie";
import {setStepCookie,clearStepCookie} from '../../../Routes/stepCookie'
import { Navigate } from "react-router-dom";

export const setAccessToken = (accessToken) => {
  return {
    type: SET_ACCESS_TOKEN,
    payload: { accessToken },
  };
};

export const clearAuth = () => ({
  type: CLEAR_AUTH,
});

export const setLoading = (value) => ({
  type: SET_LOADING,
  payload: value,
});


export const setStep = (step) => (dispatch) => {
  setStepCookie(step);
  dispatch({
    type: SET_STEP,
    payload: step,
  });
};

export const clearStep = () => (dispatch) => {
  clearStepCookie();
  dispatch({ type: CLEAR_STEP });
};

export const refreshToken = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await fetch(`${baseUrl.baseUrl}/api/token/refreshToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: Cookies.get("refresh_token") })
    });
    const data = await res.json();
    if (data?.accessToken) {
      dispatch(setAccessToken(data.accessToken));
      Cookies.set("refresh_token", data.refreshToken, { expires: 1 });
    }
    else{
      Cookies.remove("refresh_token")
      Cookies.remove("domain")
      dispatch({ type: CLEAR_STEP });
    }
  } catch (err) {
    console.error("Token refresh error:", err);
  }
  dispatch(setLoading(false));
};