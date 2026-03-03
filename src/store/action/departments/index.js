

import {
    DEPART_DATA_START,
    DEPART_DATA,
    DEPART_SINGLE_DATA,
    DEPART_DATA_END,
} from '../types'
import baseUrl from '../../../config.json'


export const CreateDepartFun = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/hardware/CreateDepartment`, {
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

export const GetAllDepartments = (accessToken) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DEPART_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/get/GetAllDepartments`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: DEPART_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: DEPART_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: DEPART_DATA_END,
            payload: false,
            loading: false,
        });
    }
};
