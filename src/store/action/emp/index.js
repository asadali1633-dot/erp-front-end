

import {
    EMP_DATA_START,
    EMP_DATA,
    EMP_SUPER_ADMIN_INFO,
    EMP_SINGLE_DATA,
    EMP_MY_INFO,
    EMP_LOIGIN_TIME_USER,
    EMP_EMP_GENRATED_ID,
    EMP_DATA_END,
    SUPER_ADMIN_GENRATED_ID
} from '../types'
import baseUrl from '../../../config.json'


export const CreatePeopleFun = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/emp/create-emp`, {
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

export const CreateSuperAdmin = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/create/create-super-admin`, {
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

export const GetGenratedEmpId = (accessToken) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EMP_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/emp-next-id`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: EMP_EMP_GENRATED_ID,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: EMP_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: EMP_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const GetPeopleDataWithPage = (body,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: EMP_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/GetEmpByIdSearchWithPagination?page=${body?.page}&limit=${body?.pageSize}&search=${body?.search}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: EMP_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: EMP_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: EMP_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const deleteUser = (id,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/DeleteUser`, {
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

export const EmpGetByid = (id,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: EMP_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/getEmpolyee/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: EMP_SINGLE_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: EMP_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: EMP_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const GetMyInfo = (id,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: EMP_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/getEmpolyee/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: EMP_MY_INFO,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: EMP_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: EMP_DATA_END,
            payload: false,
            loading: false,
        });
    }
};


export const GetGenratedSuperAdminId = (accessToken) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EMP_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/super-admin-next-id`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: SUPER_ADMIN_GENRATED_ID,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: EMP_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: EMP_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const GetSuperAdminInfo = (id,accessToken) => async (dispatch, getState) => {
    try{
        dispatch({
            type: EMP_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/GetSuperAdminById/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: EMP_SUPER_ADMIN_INFO,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: EMP_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: EMP_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const handleUpdateEmp = (body,accessToken,id) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/updateEmp/${id}`, {
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

export const handleUpdateSuperAmdin = (body,accessToken,id) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/UpdateSuperAdmin/${id}`, {
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

export const deleteEmp = (id,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/DeleteEmp`, {
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

export const getUserLoginTime = (accessToken) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EMP_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/user/user`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: EMP_LOIGIN_TIME_USER,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: EMP_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: EMP_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const UploadSuperAdminProfile = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/super-admin/profile/Image`, {
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

export const UploadUserProfile = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/profile/Image`, {
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