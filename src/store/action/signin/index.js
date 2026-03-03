

import {
    SIGNIN_DATA_START,
    SIGNIN_DATA,
    SIGNIN_DATA_END
} from '../types'
import baseUrl from '../../../config.json'
import { setAccessToken } from '../auth/index'

export const SignIn = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/SignIn/User`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    const res = await response.json();
    if (res?.success) {
        dispatch(
            setAccessToken(res.accessToken, res.user)
        );
        return res;
    } else {
        return res;
    }
}
