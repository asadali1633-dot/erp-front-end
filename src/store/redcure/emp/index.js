import {
    EMP_DATA_START,
    EMP_DATA,
    EMP_SINGLE_DATA,
    EMP_SUPER_ADMIN_INFO,
    EMP_LOIGIN_TIME_USER,
    EMP_EMP_GENRATED_ID,
    EMP_DATA_END,
    EMP_MY_INFO,
    SUPER_ADMIN_GENRATED_ID
} from '../../action/types'

const initState = {
    GenratedEmpId: [],
    SuperAdminGenratedId: [],
    EmpData: [],
    myInfo: [],
    EmpSingleData: [],
    EmpSuperAdminMyInfo: [],
    GetUserLoginTime: [],
    loading: false,
}

const Red_Emp = (state = initState, action) => {
    switch (action.type) {
        case EMP_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case EMP_EMP_GENRATED_ID: {
            return {
                ...state,
                GenratedEmpId: action.payload,
                loading: action.loading,
            };
        }
        case EMP_DATA:
            return {
                ...state,
                EmpData: action.payload,
                loading: action.loading,
            };
        case EMP_SINGLE_DATA: 
            return {
                ...state,
                EmpSingleData: action.payload,
                loading : action.loading,
            }
        case EMP_MY_INFO: 
            return {
                ...state,
                myInfo: action.payload,
                loading : action.loading,
            }
        case SUPER_ADMIN_GENRATED_ID:{
            return {
                ...state,
                SuperAdminGenratedId: action.payload,
                loading : action.loading,
            }
        }
        case EMP_SUPER_ADMIN_INFO: 
            return {
                ...state,
                EmpSuperAdminMyInfo: action.payload,
                loading : action.loading,
            }
        case EMP_LOIGIN_TIME_USER: 
            return {
                ...state,
                GetUserLoginTime: action.payload,
                loading : action.loading,
            }
        case EMP_DATA_END:
            return {
                ...state,
                GenratedEmpId: action.payload,
                SuperAdminGenratedId: action.payload,
                EmpData: action.payload,
                EmpSingleData: action.payload,
                EmpSuperAdminMyInfo: action.payload,
                GetUserLoginTime: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Emp