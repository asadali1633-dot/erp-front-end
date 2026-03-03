

import {
    EDU_DATA_START,
    EDU_DATA_END,
    EDU_SINGLE_DATA,
    EDU_MY_DATA,
    EDU_EMP_DATA,
    // =====================
    EDU_SUPER_ADMIN,
    EDU_SINGLE_SUPER_ADMIN,
} from '../types'
import baseUrl from '../../../config.json'



export const SuperAdminCreateEducation = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/super-admin/addEducation`, {
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

export const getSuperAdminEducation = (accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: EDU_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/super-admin/getEducation`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: EDU_SUPER_ADMIN,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: EDU_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: EDU_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const getSuperAdminEducationById = (id,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: EDU_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/super-admin/getEducation/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: EDU_SINGLE_SUPER_ADMIN,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: EDU_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: EDU_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const SuperAdminUpdateEducation = (id,body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/super-admin/Update/education/${id}`, {
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


// ==========================

export const EmployeeCreateEducation = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/employee/addEducation`, {
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

export const getMyEdu = (id,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: EDU_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/employee/geteducation/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: EDU_MY_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: EDU_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: EDU_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const getEmpEdu = (id,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: EDU_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/employee/geteducation/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: EDU_EMP_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: EDU_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: EDU_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const getEduById = (id,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: EDU_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/employee/geteducationbyId/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: EDU_SINGLE_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: EDU_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: EDU_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const EmployeeUpdateEducation = (id,body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/employee/update/education/${id}`, {
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