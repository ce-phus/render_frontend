import {
    POST_INDEX_REQUEST,
    POST_INDEX_SUCCESS,
    POST_INDEX_FAIL,

    LIST_ALL_POSTS_REQUEST,
    LIST_ALL_POSTS_SUCCESS,
    LIST_ALL_POSTS_FAIL,

    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL,

    UPDATE_POST_REQUEST,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAIL,

    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAIL,

    POST_DETAILS_REQUEST,
    POST_DETAILS_SUCCESS,
    POST_DETAILS_FAIL,

    SEARCH_POST_REQUEST,
    SEARCH_POST_SUCCESS,
    SEARCH_POST_FAIL,

} from "../constants/index"

export const postIndexReducer = (state = {
    featuredPosts: [],
    popularPosts: [],
}, action) => {
    switch (action.type) {
        case POST_INDEX_REQUEST:
            return { ...state, loading: true };
        
        case POST_INDEX_SUCCESS:
            return {
                ...state,
                loading: false,
                featuredPosts: action.payload.featured_posts,
                popularPosts: action.payload.popular_posts,
            };

        case POST_INDEX_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export const listAllPostsReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case LIST_ALL_POSTS_REQUEST:
            return { loading: true, posts: [] };
        case LIST_ALL_POSTS_SUCCESS:
            return { loading: false, posts: action.payload,error: null };
        case LIST_ALL_POSTS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const createPostReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_POST_REQUEST:
            return { loading: true };
        case CREATE_POST_SUCCESS:
            return { loading: false, success: true, post: action.payload };
        case CREATE_POST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const updatePostReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_POST_REQUEST:
            return { loading: true };
        case UPDATE_POST_SUCCESS:
            return { loading: false, success: true, post: action.payload };
        case UPDATE_POST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deletePostReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_POST_REQUEST:
            return { loading: true };
        case DELETE_POST_SUCCESS:
            return { loading: false, success: true };
        case DELETE_POST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const postDetailsReducer = (state = { post: {} }, action) => {
    switch (action.type) {
        case POST_DETAILS_REQUEST:
            return { ...state, loading: true };
        case POST_DETAILS_SUCCESS:
            return { loading: false, post: action.payload };
        case POST_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const searchPostReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case SEARCH_POST_REQUEST:
            return { loading: true, posts: [] };
        case SEARCH_POST_SUCCESS:
            return { loading: false, posts: action.payload };
        case SEARCH_POST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};