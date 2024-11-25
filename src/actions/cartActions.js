import axios from 'axios'

import {
    CART_ADD_ITEM_SUCCESS,
    CART_ADD_ITEM_REQUEST,
    CART_ADD_ITEM_FAIL,

    CART_CLEAR_REQUEST,
    CART_CLEAR_SUCCESS,
    CART_CLEAR_FAIL,

    CART_REMOVE_ITEM_REQUEST,
    CART_REMOVE_ITEM_SUCCESS,
    CART_REMOVE_ITEM_FAIL,

} from "../constants/index"

const isDevelopment = import.meta.env.MODE ==='development'
const API_URL =  isDevelopment ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_BASE_URL_DEPLOY


export const addToCart = (postId, quantity = 1, updateQuantity = false) => async (dispatch) => {
    try {
        dispatch({
            type: CART_ADD_ITEM_REQUEST,
            payload: { postId, quantity, updateQuantity },
        });

        const response = await axios.post(`${API_URL}/api/cart/`, {
            post_id: postId,
            quantity,
            update_quantity: updateQuantity,
        });

        console.log("API Response: ", response.data);

        const { cart, total_quantity, total_cost } = response.data;

        if (Array.isArray(cart)) {
            dispatch({
                type: CART_ADD_ITEM_SUCCESS,
                payload: {
                    items: cart.map((item) => ({
                        id: item.id,
                        title: item.title,
                        price: item.price,
                        quantity: item.quantity,
                        url: item.url,
                        total_price: item.total_price,
                        cover_photo: item.cover_photo,
                    })),
                    totalQuantity: total_quantity,
                    totalCost: total_cost,
                },
            });
            console.log("Updated Cart Items: ", cart);
        } else {
            throw new Error(
                `Invalid cart structure: ${JSON.stringify(response.data)}`
            );
        }
    } catch (error) {
        console.error("Error adding to cart: ", error.response ? error.response.data : error.message);
        dispatch({
            type: CART_ADD_ITEM_FAIL,
            payload: error.response ? error.response.data : error.message,
        });
    }
};

  
// export const removeFromCart = (postId) => async (dispatch, getState) => {
//     dispatch({ type: CART_REMOVE_ITEM_REQUEST });

//     try {
//         const response = await axios.delete(`${API_URL}/api/cart/`, {
//             data: { post_id: postId }
//         });
        
//         const updatedCartItems = response.data.cartItems || getState().cartReducer.cartItems.filter(item => item.id !== postId);

//         dispatch({
//             type: CART_REMOVE_ITEM_SUCCESS,
//             payload: updatedCartItems,
//         });
//     } catch (error) {
//         dispatch({
//             type: CART_REMOVE_ITEM_FAIL,
//             payload: error.response ? error.response.data : { message: error.message },
//         });
//     }
// };

export const removeFromCart = (postId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM_REQUEST });
    const { cartItems } = getState().cartReducer;

    // Filter out the item to be removed
    const updatedCartItems = cartItems.filter(item => item.id !== postId);

    // Dispatch the success action with the updated cart
    dispatch({
        type: CART_REMOVE_ITEM_SUCCESS,
        payload: updatedCartItems,
    });
};



export const clearCart = () => async(dispatch) => {
    try {
        dispatch({ type: CART_CLEAR_REQUEST })
        const { data } = await axios.put(`${API_URL}/api/cart/`
        )
        dispatch({
            type: CART_CLEAR_SUCCESS,
            payload: data,
            })
    } catch (error) {
        dispatch({
            type: CART_CLEAR_FAIL,
            payload: error.response.data,
            })
        }

}