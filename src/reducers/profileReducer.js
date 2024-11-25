import {
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    LIST_AGENTS_REQUEST,
    LIST_AGENTS_SUCCESS,
    LIST_AGENTS_FAIL,
    LIST_TOP_AGENTS_REQUEST,
    LIST_TOP_AGENTS_SUCCESS,
    LIST_TOP_AGENTS_FAIL,
    LIST_ALL_USERS_PROFILE_REQUEST,
    LIST_ALL_USERS_PROFILE_SUCCESS,
    LIST_ALL_USERS_PROFILE_FAIL,
    GET_USER_PROFILE_REQUEST,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAIL
} from '../constants/index';

export const getProfileReducer = (state = { profile: {} }, action) => {
    switch (action.type) {
        case GET_PROFILE_REQUEST:
            return { ...state, loading: true };
        case GET_PROFILE_SUCCESS:
            return { loading: false, profile: action.payload.profile };
        case GET_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const getUserProfileReducer = (state = { profile: {} }, action) => {
    switch (action.type) {
        case GET_USER_PROFILE_REQUEST:
            return { ...state, loading: true };
        case GET_USER_PROFILE_SUCCESS:
            return { loading: false, profile: action.payload.profile };
        case GET_USER_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const profileUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
            return { loading: true };
        case UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, profile: action.payload };
        case UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const agentListReducer = (state = { agents: [] }, action) => {
    switch (action.type) {
        case LIST_AGENTS_REQUEST:
            return { loading: true };
        case LIST_AGENTS_SUCCESS:
            return { loading: false, agents: action.payload };
        case LIST_AGENTS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const listUserProfileReducer = (state = { profiles: [] }, action) => {
    switch (action.type) {
        case LIST_ALL_USERS_PROFILE_REQUEST:
            return { loading:true };
        case LIST_ALL_USERS_PROFILE_SUCCESS:
            return { loading:false, success:true, profiles: action.payload }
        case LIST_ALL_USERS_PROFILE_FAIL:
            return { loading:false, error:action.payload };
        default:
            return state
    }
}

export const topAgentsListReducer = (state = { topAgents: [] }, action) => {
    switch (action.type) {
        case LIST_TOP_AGENTS_REQUEST:
            return { loading: true };
        case LIST_TOP_AGENTS_SUCCESS:
            return { loading: false, topAgents: action.payload };
        case LIST_TOP_AGENTS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
