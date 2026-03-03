

import {
    SIGNUP_DATA_START,
    SIGNUP_DATA,
    SINGUP_DATA_END
} from '../../action/types'
import baseUrl from '../../../config.json'
import { setAccessToken } from '../auth/index'

export const SignUp = (body) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/signupWithCompany/User`, {
        method: "POST",
        // headers: {
        //     'Content-Type': 'application/json',
        // },
        body: body
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
