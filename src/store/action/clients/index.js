

import {
    CLIENTS_DATA_START,
    CLIENTS_SINGLE_DATA,
    CLIENTS_DATA_END,
    CLIENTS_UNIQUE_IDENTIFIER,
    GET_ALL_CLIENTS_LIST,
    GET_ALL_CLIENTS
} from '../types'
import baseUrl from '../../../config.json'


export const getBarCode = (accessToken) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CLIENTS_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/client/id/unique`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: CLIENTS_UNIQUE_IDENTIFIER,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: CLIENTS_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: CLIENTS_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const CreateClientFun = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/client/client-create`, {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + accessToken,
        },
        body: body,
    });
    const res = await response.json();
    if (res) {
        return res;
    } else {
        return res;
    }
}

export const GetClientList = (accessToken) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CLIENTS_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/client/get-all`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_ALL_CLIENTS_LIST,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: CLIENTS_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: CLIENTS_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const GetAllClientithPage = (body,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: CLIENTS_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/client/get-all-with-pagination?page=${body?.page}&limit=${body?.pageSize}&search=${body?.search}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_ALL_CLIENTS,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: CLIENTS_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: CLIENTS_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

