import {
    QUA_DATA_START,
    QUA_DATA_END,

    QUA_SINGLE_DATA,

    QUA_MY_DATA,

    QUA_SUPER_ADMIN,
    QUA_SINGLE_SUPER_ADMIN,

    QUA_EMP_DATA,
} from '../../action/types'

const initState = {
    superAdminQuaData: [],
    SinglesuperAdminQuaData: [],
    QuaMyData: [],
    QuaSingleData: [],
    QuaEmpData: [],

    loading: false,
}

const Red_Qualification = (state = initState, action) => {
    switch (action.type) {
        case QUA_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case QUA_SUPER_ADMIN: 
            return {
                ...state,
                superAdminQuaData: action.payload,
                loading: action.loading,
            }
        case QUA_SINGLE_SUPER_ADMIN: 
            return {
                ...state,
                SinglesuperAdminQuaData: action.payload,
                loading: action.loading,
            }
        case QUA_SINGLE_DATA: 
            return {
                ...state,
                QuaSingleData:action.payload,
                loading: action.loading,
            }
        case QUA_MY_DATA: 
            return {
                ...state,
                QuaMyData :  action.payload,
                loading: action.loading,
                
            }
        case QUA_EMP_DATA: 
            return {
                ...state,
                QuaEmpData: action.payload,
                loading: action.loading,
                
            }
        case QUA_DATA_END:
            return {
                ...state,
                superAdminQuaData: action.payload,
                SinglesuperAdminQuaData: action.payload,
                QuaMyData :  action.payload,
                QuaSingleData:action.payload,
                QuaEmpData: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Qualification