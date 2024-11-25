import { 
    GET_ALL_ORDERS_REQUEST,
    GET_ALL_ORDERS_SUCCESS,
    GET_ALL_ORDERS_FAIL,
} from "../constants/index"


export const getAllOrdersReducer = (state = {orders: []}, action) => {
    switch(action.type) {
        case GET_ALL_ORDERS_REQUEST:
            return {
                ...state, 
                loading: true,
                orders: [],
                error: ""
            }
        case GET_ALL_ORDERS_SUCCESS:
            return {
                ...state, 
                loading: false,
                orders: action.payload,
                error: ""
            }
        case GET_ALL_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                orders: [],
                error: action.payload
            }
        default:
            return state
    }
}