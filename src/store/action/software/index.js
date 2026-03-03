

import {
    SOFTWARE_DATA_START,
    SOFTWARE_DATA,
    SOFTWARE_SINGLE_DATA,
    SOFTWARE_DATA_END,
} from '../types'
import baseUrl from '../../../config.json'


export const CreateSoftwareFun = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/software/CreateSoftware`, {
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

export const GetAllSoftware = (body,accessToken) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SOFTWARE_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/software/getAllsoftwareByPage/?page=${body?.page}&limit=${body?.pageSize}&search=${body?.search}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: SOFTWARE_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: SOFTWARE_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: SOFTWARE_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const SoftwareGetByid = (id,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: SOFTWARE_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/software/all/getsoftware/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: SOFTWARE_SINGLE_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: SOFTWARE_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: SOFTWARE_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const UpdateSoftware = (body,accessToken,id) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/software/UpdateSoftware/${id}`, {
        method: "PUT",
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

export const DeleteSoftware = (id,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/Software/DeleteSoftware`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken,
        },
        body: JSON.stringify({ids:id}),
    });
    const res = await response.json();
    if (res) {
        return res;
    } else {
        return res;
    }
}
