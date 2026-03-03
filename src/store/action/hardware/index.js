

import {
    ASSETS_DATA_START,
    HARDWARE_ASSETS_DATA,
    ASSETS_DATA_END,
    USERS_ASSETS_DATA,
    BRANDSMANUFACTURER_ASSETS_DATA,
    HARDWARE_SINGLE_DATA,
    ASSETS_DEPARTMENTS_DATA,
    ASSETS_BAR_CODE
} from '../types'
import baseUrl from '../../../config.json'


export const getBarCode = (accessToken) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ASSETS_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/assests/barcode/unique`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: ASSETS_BAR_CODE,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: ASSETS_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: ASSETS_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const CreateAssetsFun = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/assests/create-assets`, {
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

export const CreateBrandFun = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/hardware/CreateBrand`, {
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

export const CreateDepartFun = (body,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/hardware/CreateDepartment`, {
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

export const UpdateAssets = (body,accessToken,id) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/assets/update/${id}`, {
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

export const GetAllEmpList = (accessToken) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ASSETS_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/GetAllUsers`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: USERS_ASSETS_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: ASSETS_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: ASSETS_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const GetAllBrandsManufacturer = (accessToken) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ASSETS_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/GetAllBrandsManufacturer`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: BRANDSMANUFACTURER_ASSETS_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: ASSETS_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: ASSETS_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const GetAllHardware = (body,accessToken) => async (dispatch, getState) => {
    try {
        // ?page=${body?.page}&limit=${body?.pageSize}&search=${body?.search}
        dispatch({
            type: ASSETS_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/assets/getAll/assets`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: HARDWARE_ASSETS_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: ASSETS_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: ASSETS_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const HardwareGetByid = (id,accessToken) => async (dispatch, getState) => {
    try{
        
        dispatch({
            type: ASSETS_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/get/all/assets/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: HARDWARE_SINGLE_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: ASSETS_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: ASSETS_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const GetAllDepartments = (accessToken) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ASSETS_DATA_START,
            payload: true,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/api/get/GetAllDepartments`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: ASSETS_DEPARTMENTS_DATA,
                payload: [res],
                loading: false,
            });
        } else {
            const res = await response.json();
            dispatch({
                type: ASSETS_DATA_END,
                payload: [res],
                loading: false,
            });
        }

    } catch (error) {
        dispatch({
            type: ASSETS_DATA_END,
            payload: false,
            loading: false,
        });
    }
};

export const DeleteHardware = (id,accessToken) => async (dispatch) => {
    const response = await fetch(`${baseUrl.baseUrl}/api/Hardware/DeleteHardware`, {
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