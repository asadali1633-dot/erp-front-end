import {
    FORGOT_PASS_DATA_START,
    FORGOT_PASS_DATA,
    FORGOT_PASS_ALL_DATA,
    FORGOT_PASS_DATA_END,
} from '../types'
import baseUrl from '../../../config.json'


export const EmailCall = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/password/forgotPassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const res = await response.json();
    if (res) {
        return res;
    } else {
        return res;
    }
}

export const ForgotPasswordCall = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/password/updatePassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const res = await response.json();
    if (res) {
        return res;
    } else {
        return res;
    }
}