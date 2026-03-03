

import {
    TICKETS_DATA_START,
    TICKETS_DATA,
    TICKETS_SINGLE_DATA,
    TICKETS_ALL_DATA,
    TICKETS_DATA_END
} from '../types'
import baseUrl from '../../../config.json'


export const OverviewCall = (accessToken) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TICKETS_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/company/Overview`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: TICKETS_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: TICKETS_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: TICKETS_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const createTicket = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/Tickets/createTicket`, {
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

export const GetAllTickets = (body,accessToken) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TICKETS_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/Tickets/GetAllTickets?page=${body?.page}&limit=${body?.pageSize}&search=${body?.search}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: TICKETS_ALL_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: TICKETS_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: TICKETS_DATA_END,
            payload: false,
            loading: false,
        });
    }
};