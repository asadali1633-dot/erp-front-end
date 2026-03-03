

import {
    DESIGNATOINS_DATA_START,
    DESIGNATOINS_DATA,
    DESIGNATOINS_SINGLE_DATA,
    DESIGNATOINS_DATA_END,
} from '../types'
import baseUrl from '../../../config.json'


export const CreateDesignationFun = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/createDesignation/ByAdmin`, {
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

export const GetAllDesignations = (accessToken) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DESIGNATOINS_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/GetAllDesignation/ByAdmin`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: DESIGNATOINS_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: DESIGNATOINS_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: DESIGNATOINS_DATA_END,
            payload: false,
            loading: false,
        });
    }
};
