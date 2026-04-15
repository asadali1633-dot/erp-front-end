

import {
    VENDORS_DATA_START,
    VENDORS_SIGNLE_DATA,
    VENDORS_LIST_DATA,
    VENDORS_GET_ALL_DATA,
    VENDORS_DATA_END,
} from '../types'
import baseUrl from '../../../config.json'




export const CreateVendorFun = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/vendor/create`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
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

export const GetVendorList = (accessToken) => async (dispatch, getState) => {
    try {
        dispatch({
            type: VENDORS_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/vendor/list`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: VENDORS_LIST_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: VENDORS_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: VENDORS_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const GetAllVendorWithPage = (body,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: VENDORS_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/vendor/list-paginated?page=${body?.page}&limit=${body?.pageSize}&search=${body?.search}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: VENDORS_GET_ALL_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: VENDORS_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: VENDORS_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const getVendorById = (id,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: VENDORS_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/vendor/get/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: VENDORS_SIGNLE_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: VENDORS_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: VENDORS_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const UpdateVendor = (id,body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/vendor/update/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
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

export const deleteVendors = (id,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/vendor/delete`, {
        method: "DELETE",
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
