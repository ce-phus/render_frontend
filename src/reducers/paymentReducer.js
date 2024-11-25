import { 
    INITIATE_PAYMENT_REQUEST,
    INITIATE_PAYMENT_SUCCESS,
    INITIATE_PAYMENT_FAIL,
    VERIFY_PAYMENT_REQUEST,
    VERIFY_PAYMENT_SUCCESS,
    VERIFY_PAYMENT_FAIL,
} from "../constants/index";

export const initiatePaymentReducer = (state = {}, action) => {
    switch (action.type) {
        case INITIATE_PAYMENT_REQUEST:
            return { loading: true };
        case INITIATE_PAYMENT_SUCCESS:
            return { loading: false, paymentData: action.payload };
        case INITIATE_PAYMENT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const verifyPaymentReducer = (state = {}, action) => {
    switch (action.type) {
        case VERIFY_PAYMENT_REQUEST:
            return { loading: true };
        case VERIFY_PAYMENT_SUCCESS:
            return { loading: false, verificationData: action.payload };
        case VERIFY_PAYMENT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};