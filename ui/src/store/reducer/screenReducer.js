import * as actionTypes from "../screenActionType";
const initalstore = {
    screens: [],
    singlescreen: {},
    loading: false,
    error: "",
}

const store = (state = initalstore, action) => {
    switch (action.type) {
        case actionTypes.INIT_FETCH_SCREEN:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_SCREEN_SUCCESS:
            return {
                ...state,
                loading: false,
                screens: action.screens
            }

        case actionTypes.FETCH_SCREEN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        case actionTypes.INIT_ADD_SCREEN:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.ADD_SCREEN_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case actionTypes.ADD_SCREEN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.INIT_DELETE_SCREEN:
            return {
                ...state,
                loading: true,

            };
        case actionTypes.DELETE_SCREEN_SUCCESS:
            let screensTemp = state.screens.filter(screen => screen._id !== action.id);
            return {
                ...state,
                loading: false,
                screens: screensTemp,
            }
        case actionTypes.DELETE_SCREEN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.INIT_SINGLE_SCREEN:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.SINGLE_SCREEN_SUCCESS:
            console.log(action.singlescreen)
            return {
                ...state,
                loading: false,
                singlescreen: action.singlescreen
            }
        case actionTypes.SINGLE_SCREEN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.INIT_UPDATE_SCREEN:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.UPDATE_SCREEN_SUCCESS:
            console.log(action.screens);
            let screensTemp1 = [...state.screens];
            screensTemp1.map(order => {
                if (order._id === action.screens._id) {
                        order.screen_name = action.screens.screen_name;
                        order.rows = action.screens.rows;
                        order.cols = action.screens.cols;
                }
            });
            return {
                ...state,
                loading: false,
                screens: screensTemp1
            }
        case actionTypes.UPDATE_SCREEN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default store;