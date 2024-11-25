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

export const postCommentCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_COMMENT_CREATE_REQUEST:
            return { loading: true };
        case POST_COMMENT_CREATE_SUCCESS:
            return { loading: false, success: true, comment: action.payload };
        case POST_COMMENT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const postCommentUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_COMMENT_UPDATE_REQUEST:
            return { loading: true };
        case POST_COMMENT_UPDATE_SUCCESS:
            return { loading: false, success: true, comment: action.payload };
        case POST_COMMENT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const postCommentDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_COMMENT_DELETE_REQUEST:
            return { loading: true };
        case POST_COMMENT_DELETE_SUCCESS:
            return { loading: false, success: true, commentId: action.payload };
        case POST_COMMENT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const postCommentListReducer = (state = { comments: [] }, action) => {
    switch (action.type) {
        case POST_COMMENT_LIST_REQUEST:
            return { loading: true };
        case POST_COMMENT_LIST_SUCCESS:
            return { loading: false, comments: action.payload };
        case POST_COMMENT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
