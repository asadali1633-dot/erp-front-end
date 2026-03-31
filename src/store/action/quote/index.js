

import {
    QUOTE_DATA_START,
    QUOTE_SIGNLE_DATA,
    QUOTE_GET_ALL_DATA,
    QUOTE_DATA_END
} from '../types'
import baseUrl from '../../../config.json'



export const CreateQuoteFun = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/quotation/create`, {
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

export const GetAllQuotewithPage = (body,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: QUOTE_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/quotation/all/get-all-with-pagination?page=${body?.page}&limit=${body?.pageSize}&search=${body?.search}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: QUOTE_GET_ALL_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: QUOTE_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: QUOTE_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const getQuoteById = (id,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: QUOTE_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/quotation/get/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: QUOTE_SIGNLE_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: QUOTE_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: QUOTE_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const UpdateQuote = (id,body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/quotation/update/${id}`, {
        method: "PUT",
        headers: {
             "Authorization": "Bearer " + accessToken,
        },
        body: body
    });
    const res = await response.json();
    if (res) {
        return res;
    } else {
        return res;
    }
}
