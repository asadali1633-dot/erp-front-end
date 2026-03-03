

import {
    COMPANY_DATA_START,
    COMPANY_DATA,
    COMPANY_DATA_END
} from '../types'
import baseUrl from '../../../config.json'

export const companyRegistration = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/company/registerCompany`, {
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

export const GetCompany = (accessToken) => async (dispatch, getState) => {
    try {
        dispatch({
            type: COMPANY_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/company/GetById`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: COMPANY_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: COMPANY_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: COMPANY_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const UpdateCompany = (body,accessToken) => async (dispatch, getState) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/company/UpdateCompany`, {
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

