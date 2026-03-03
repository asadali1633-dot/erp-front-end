

import {
    ROLE_DATA_START,
    ROLE_DATA,
    ROLE_SINGLE_DATA,
    ROLE_DATA_END,
} from '../types'
import baseUrl from '../../../config.json'


export const CreateRoleFun = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/createRole/ByAdmin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken,
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

export const GetAllRoles = (accessToken) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ROLE_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/GetAllRole/ByAdmin`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: ROLE_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: ROLE_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: ROLE_DATA_END,
            payload: false,
            loading: false,
        });
    }
};
