

import {
    QUA_DATA_START,
    QUA_DATA_END,

    QUA_SINGLE_DATA,

    QUA_MY_DATA,

    QUA_SUPER_ADMIN,
    QUA_SINGLE_SUPER_ADMIN,

    QUA_EMP_DATA,
} from '../types'
import baseUrl from '../../../config.json'


export const SuperAdminCreateQualification = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/super-admin/addQulification`, {
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

export const getSuperAdminQua = (accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: QUA_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/super-admin/getQua`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: QUA_SUPER_ADMIN,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: QUA_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: QUA_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const getSuperAdminQuaById = (id,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: QUA_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/super-admin/getQua/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: QUA_SINGLE_SUPER_ADMIN,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: QUA_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: QUA_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const SuperAdminUpdateQua = (id,body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/super-admin/Update/qualification/${id}`, {
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

export const EmployeeCreateQua = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/employee/addQua`, {
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

export const getMyQua = (id,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: QUA_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/employee/getqua/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: QUA_MY_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: QUA_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: QUA_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const getQuaById = (id,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: QUA_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/employee/getQuaById/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: QUA_SINGLE_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: QUA_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: QUA_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const getEmpQua = (id,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: QUA_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/employee/getqua/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: QUA_EMP_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: QUA_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: QUA_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const EmployeeUpdateQua = (id,body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/employee/update/qualification/${id}`, {
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