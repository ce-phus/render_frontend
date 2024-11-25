import {
    CART_ADD_ITEM_REQUEST,
    CART_ADD_ITEM_SUCCESS,
    CART_ADD_ITEM_FAIL,
    
    CART_REMOVE_ITEM_REQUEST,
    CART_REMOVE_ITEM_SUCCESS,
    CART_REMOVE_ITEM_FAIL,

    CART_CLEAR_REQUEST,
    CART_CLEAR_SUCCESS,
    CART_CLEAR_FAIL,

    CART_FETCH_REQUEST,
    CART_FETCH_SUCCESS,
    CART_FETCH_FAIL,
} from "../constants/index";

const initialState = {
    cartItems: [],
    loading: false,
    error: null,
    totalQuantity: 0,
    totalCost: 0,
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_FETCH_REQUEST:
        case CART_ADD_ITEM_REQUEST:
        case CART_REMOVE_ITEM_REQUEST:
        case CART_CLEAR_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

            case CART_ADD_ITEM_SUCCESS: {
                const newCartItems = action.payload.items; 
            
                const updatedCartItems = state.cartItems.map((item) => {
                    const newItem = newCartItems.find((i) => i.id === item.id);
                    return newItem ? { ...item, quantity: newItem.quantity } : item;
                });
            
                const finalCartItems = [...updatedCartItems];
            
                newCartItems.forEach((item) => {
                    if (!finalCartItems.find((i) => i.id === item.id)) {
                        finalCartItems.push(item);
                    }
                });
            
                return {
                    ...state,
                    loading: false,
                    cartItems: finalCartItems,
                };
            }
            
            
        case CART_REMOVE_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: action.payload,
            };
        ;

        case CART_CLEAR_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: [],
            };

        case CART_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: action.payload || [],
            };

            case CART_ADD_ITEM_FAIL:
            case CART_REMOVE_ITEM_FAIL:
            case CART_FETCH_FAIL:
            return {
            ...state,
            loading: false,
            error: action.payload.message || action.payload,
            };


        default:
            return state;
    }
};