

import {
    EXPER_DATA_START,
    EXPER_DATA_END,
    // ======================
    EXPER_SUPER_ADMIN,
    EXPER_SINGLE_SUPER_ADMIN,
    // =======================
    EXPER_SINGLE_DATA,
    EXPER_MY_DATA,
    EXPER_EMP_DATA
} from '../types'
import baseUrl from '../../../config.json'


export const SuperAdminCreateExper = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/super-admin/addExperiance`, {
        method: "POST",
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

export const getSuperAdminExper = (accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: EXPER_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/super-admin/getExper`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: EXPER_SUPER_ADMIN,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: EXPER_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: EXPER_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const getSuperAdminExperById = (id,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: EXPER_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/super-admin/getExper/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: EXPER_SINGLE_SUPER_ADMIN,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: EXPER_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: EXPER_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const SuperAdminUpdateExper = (id,body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/super-admin/Update/Experiance/${id}`, {
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



// =========================================================

export const EmployeeCreateExper = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/employee/addExper`, {
        method: "POST",
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

export const getMyExper = (id,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: EXPER_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/employee/getExper/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: EXPER_MY_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: EXPER_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: EXPER_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const getExperById = (id,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: EXPER_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/employee/getExperById/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: EXPER_SINGLE_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: EXPER_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: EXPER_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const getEmpExper = (id,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: EXPER_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/employee/getExper/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: EXPER_EMP_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: EXPER_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: EXPER_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const EmployeeUpdateExper = (id,body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/employee/update/experiance/${id}`, {
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
