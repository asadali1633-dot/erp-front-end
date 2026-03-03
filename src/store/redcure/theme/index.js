import {
    THEME_DATA_START,
    THEME_DATA,
    THEME_DATA_END,
} from '../../action/types'

const initState = {
    ThemeData: [],
    loading: false,
}

const Red_Theme = (state = initState, action) => {
    switch (action.type) {
        case THEME_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case THEME_DATA:
            return {
                ...state,
                ThemeData: action.payload,
                loading: action.loading,
            };
        case THEME_DATA_END:
            return {
                ...state,
                ThemeData: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Theme