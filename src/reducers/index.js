import { combineReducers } from "redux";

import { 
    userLoginReducer,
    userRegisterReducer,
    userActivateReducer,
    userResetPasswordConfirmReducer,
    userResetPasswordReducer,
     } from "./userReducer";

import {
    postIndexReducer,
    listAllPostsReducer,
    createPostReducer,
    updatePostReducer,
    deletePostReducer,
    searchPostReducer,
    postDetailsReducer,
} from "./postReducer"


import {
    getProfileReducer,
    profileUpdateReducer,
    agentListReducer,
    topAgentsListReducer,
    listUserProfileReducer,
    getUserProfileReducer
} from "./profileReducer";

import {
    cartReducer
} from "./cartReducer"

import {
    getUsersReducers
} from "./chatReducer";

import {
    websocketReducer
} from "./websocketReducer"

import {
    initiatePaymentReducer,
    verifyPaymentReducer
} from "./paymentReducer"

import {
    getAllOrdersReducer,
} from './orderReducer'


const allReducers = combineReducers({
    userLoginReducer,
    userRegisterReducer,
    userActivateReducer,
    userResetPasswordConfirmReducer,
    userResetPasswordReducer,
    postIndexReducer,
    getProfileReducer,
    profileUpdateReducer,
    agentListReducer,
    topAgentsListReducer,
    listUserProfileReducer,
    getUserProfileReducer,
    listAllPostsReducer,
    createPostReducer,
    updatePostReducer,
    deletePostReducer,
    searchPostReducer,
    postDetailsReducer,
    getUsersReducers,
    cartReducer,
    initiatePaymentReducer,
    verifyPaymentReducer,
    getAllOrdersReducer,
    websocket:websocketReducer
});

export default allReducers