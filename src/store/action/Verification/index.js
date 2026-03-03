import {
    VERIFICATION_DATA_START,
    VERIFICATION_DATA,
    VERIFICATION_DATA_END
} from '../../action/types'
import baseUrl from '../../../config.json'

export const Verification = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/resendOtp/User`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });
    const res = await response.json();
    if (res) {
        return res;
    } else {
        return res;
    }
}

export const Verification_check = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/verifyOtp/User`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });
    const res = await response.json();
    if (res) {
        return res;
    } else {
        return res;
    }
}