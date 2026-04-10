

import {
    INVOICE_DATA_START,
    INVOICE_SIGNLE_DATA,
    INVOICE_GET_ALL_DATA,
    INVOICE_DATA_END,
    INVOICE_SIMPLE_LIST_DATA
} from '../types'
import baseUrl from '../../../config.json'



export const CreateInvoiceFun = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/invoice/create`, {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + accessToken,
            'Content-Type': 'application/json',
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


export const GetAllInVoiceWithPage = (body,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: INVOICE_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/invoice/get-all?page=${body?.page}&limit=${body?.pageSize}&search=${body?.search}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: INVOICE_GET_ALL_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: INVOICE_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: INVOICE_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const getInvoiceById = (id,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: INVOICE_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/invoice/get/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: INVOICE_SIGNLE_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: INVOICE_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: INVOICE_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const UpdateInvoice = (id,body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/invoice/update/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + accessToken,
            'Content-Type': 'application/json',
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

export const deleteInvoice = (id,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/invoice/delete`, {
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