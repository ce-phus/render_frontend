import axios from "axios"

import {
    POST_COMMENT_CREATE_REQUEST,
    POST_COMMENT_CREATE_SUCCESS,
    POST_COMMENT_CREATE_FAIL,

    POST_COMMENT_UPDATE_REQUEST,
    POST_COMMENT_UPDATE_SUCCESS,
    POST_COMMENT_UPDATE_FAIL,

    POST_COMMENT_DELETE_REQUEST,
    POST_COMMENT_DELETE_SUCCESS,
    POST_COMMENT_DELETE_FAIL,

    POST_COMMENT_LIST_REQUEST,
    POST_COMMENT_LIST_SUCCESS,
    POST_COMMENT_LIST_FAIL,

} from "../constants/index"

const isDevelopment = import.meta.env.MODE ==='development'
const API_URL =  isDevelopment ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_BASE_URL_DEPLOY

export const createPostComment = (postId, commentData) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_COMMENT_CREATE_REQUEST });

        const {
            userLoginReducer: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`,
            },
        };

        const dataToSend = {
            post: parseInt(postId, 10),
            content: commentData,
        };

        const { data } = await axios.post(`${API_URL}/api/v1/comments/post-comments/`, dataToSend, config);

        dispatch({ type: POST_COMMENT_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_COMMENT_CREATE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        });
    }
};



export const updatePostComment = (commentId, commentData) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_COMMENT_UPDATE_REQUEST });

        const {
            userLoginReducer: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`,
            },
        };

        const { data } = await axios.put(`${API_URL}/api/v1/post-comments/${commentId}/`, commentData, config);

        dispatch({ type: POST_COMMENT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_COMMENT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        });
    }
};


export const deletePostComment = (commentId) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_COMMENT_DELETE_REQUEST });

        const {
            userLoginReducer: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.acess}`,
            },
        };

        await axios.delete(`${API_URL}/api/v1/post-comments/${commentId}/`, config);

        dispatch({ type: POST_COMMENT_DELETE_SUCCESS, payload: commentId });
    } catch (error) {
        dispatch({
            type: POST_COMMENT_DELETE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        });
    }
};


export const listPostComments = (postId) => async (dispatch) => {
    try {
        dispatch({ type: POST_COMMENT_LIST_REQUEST });

        const { data } = await axios.get(`${API_URL}/api/v1/comments/post-comments/?post=${postId}`);

        dispatch({ type: POST_COMMENT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_COMMENT_LIST_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        });
    }
};


