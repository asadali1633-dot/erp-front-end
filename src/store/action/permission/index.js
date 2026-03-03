import {
    PERMISSION_DATA_START,
    PERMISSION_DATA,
    PERMISSION_ALL_DATA,
    PERMISSION_DATA_END
} from '../../action/types'
import baseUrl from '../../../config.json'

export const SavePermCall = (body,accessToken) => async (dispatch, getState) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/permissions/save/byAdmin`, {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + accessToken,
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

export const GetAllPerm = (body, accessToken) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PERMISSION_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/permissions_view/byAdmin?page=${body?.page}&limit=${body?.pageSize}&search=${body?.search}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: PERMISSION_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: PERMISSION_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: PERMISSION_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

