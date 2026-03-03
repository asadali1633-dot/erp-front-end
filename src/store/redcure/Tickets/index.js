import {
    TICKETS_DATA_START,
    TICKETS_DATA,
    TICKETS_SINGLE_DATA,
    TICKETS_ALL_DATA,
    TICKETS_DATA_END
} from '../../action/types'

const initState = {
  basicInfo: [],
  Tickets_Data: [],
  loading: false,
}

const Red_Tickets = (state = initState, action) => {
    switch (action.type) {
        case TICKETS_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case TICKETS_DATA:
            return {
                ...state,
                basicInfo: action.payload,
                loading: action.loading,
            };
        case TICKETS_ALL_DATA:
            return {
                ...state,
                Tickets_Data: action.payload,
                loading: action.loading,
            };
        case TICKETS_DATA_END:
            return {
                ...state,
                basicInfo: action.payload,
                Tickets_Data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Tickets