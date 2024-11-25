import logout from './userActions';
import { 
    GET_ALL_ORDERS_REQUEST,
    GET_ALL_ORDERS_SUCCESS,
    GET_ALL_ORDERS_FAIL,
} from "../constants/index"

import axios from 'axios'

const isDevelopment = import.meta.env.MODE ==='development'
const API_URL =  isDevelopment ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_BASE_URL_DEPLOY

export const getOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ALL_ORDERS_REQUEST,
        })

        const {
            userLoginReducer: { userInfo },
        } = getState()
        

        const config  = {
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.get(
            `${API_URL}/api/order/orders-list/`, config
        )
        console.log("Order details: ", data)

        dispatch({
            type: GET_ALL_ORDERS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_ORDERS_FAIL,
            payload: error.response && error.response.data.details ? error.response.data.details : error.message
        });
        if (error.response.data.detail === "Given token not valid for any token type") {
            console.log("error response: ",error.response.data.detail)
            dispatch(logout());
            
          }
    }
}