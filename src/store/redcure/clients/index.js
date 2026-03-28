import {
    CLIENTS_DATA_START,
    CLIENTS_SINGLE_DATA,
    CLIENTS_DATA_END,
    CLIENTS_UNIQUE_IDENTIFIER,
    GET_ALL_CLIENTS_LIST,
    GET_ALL_CLIENTS,
    GET_SINGLE_CLIENT
} from '../../action/types'

const initState = {
    identifier: [],
    ClientList: [],
    GetAllClient: [],
    SingleClient: []

}

const Red_Clients = (state = initState, action) => {
    switch (action.type) {
        case CLIENTS_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case CLIENTS_UNIQUE_IDENTIFIER:
            return {
                ...state,
                identifier: action.payload,
                loading: action.loading,
            };
        case GET_ALL_CLIENTS_LIST:
            return {
                ...state,
                ClientList: action.payload,
                loading: action.loading
            }
        case GET_ALL_CLIENTS:
            return {
                ...state,
                GetAllClient: action.payload,
                loading: action.loading
            }
        case GET_SINGLE_CLIENT: 
            return {
                ...state,
                SingleClient: action.payload,
                loading: action.loading
            }
        case CLIENTS_DATA_END:
            return {
                ...state,
                identifier: action.payload,
                ClientList: action.payload,
                GetAllClient: action.payload,
                SingleClient: action.payload,
            };
        default:
            return state;
    }
};

export default Red_Clients