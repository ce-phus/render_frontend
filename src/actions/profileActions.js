import axios from 'axios';
import logout from './userActions';
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

const isDevelopment = import.meta.env.MODE ==='development'
const API_URL =  isDevelopment ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_BASE_URL_DEPLOY

export const getProfile = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_PROFILE_REQUEST });

        const {
            userLoginReducer: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`,
            },
        };

        const { data } = await axios.get(`${API_URL}/api/profile/me/`, config);
        console.log("Profile data", data)
        dispatch({
            type: GET_PROFILE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      });
      if (error.response.data.detail === "Given token not valid for any token type") {
        console.log("error response: ",error.response.data.detail)
        dispatch(logout());
        
      }
    }
};

export const getUserProfile = (username) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_USER_PROFILE_REQUEST });

        const {
            userLoginReducer: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`,
            },
        };

        const { data } = await axios.get(`${API_URL}/api/profile/${username}`, config);
        console.log("Profile data", data)
        dispatch({
            type: GET_USER_PROFILE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_USER_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
        if (error.response.data.detail === "Given token not valid for any token type") {
            console.log("error response: ",error.response.data.detail)
            dispatch(logout());
            
          }
    }
};


export const updateProfile = (formData, username) => async (dispatch, getState) => {
  try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });

      const {
          userLoginReducer: { userInfo },
      } = getState();

      const config = {
          headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${userInfo.access}`,
          },
      };

      const { data } = await axios.patch(
          `${API_URL}/api/profile/update/${username}/`,
          formData,
          config
      );

      dispatch({
          type: UPDATE_PROFILE_SUCCESS,
          payload: data,
      });
  } catch (error) {
      dispatch({
          type: UPDATE_PROFILE_FAIL,
          payload: error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
      });
  }
};

export const listAgents = () => async (dispatch, getState) => {
  try {
      dispatch({ type: LIST_AGENTS_REQUEST });

      const {
          userLoginReducer: { userInfo },
      } = getState();

      const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.access}`,
          },
      };

      const { data } = await axios.get(`${API_URL}/api/profile/agents/all/`, config);

      dispatch({
          type: LIST_AGENTS_SUCCESS,
          payload: data,
      });
  } catch (error) {
      dispatch({
          type: LIST_AGENTS_FAIL,
          payload: error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
      });
  }
};

export const listUsersProfile = () => async(dispatch, getState) => {
    try {
        dispatch({
            type:LIST_ALL_USERS_PROFILE_REQUEST
        })

        const {
            userLoginReducer: { userInfo }
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.access}`,
            },
        };

        const { data } = await axios.get(`${API_URL}/api/profile/userprofile/all/`, config)

        dispatch({
            type: LIST_ALL_USERS_PROFILE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:LIST_ALL_USERS_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        })
    }
}

export const listTopAgents = () => async (dispatch, getState) => {
  try {
      dispatch({ type: LIST_TOP_AGENTS_REQUEST });

      const {
          userLoginReducer: { userInfo },
      } = getState();

      const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.access}`,
          },
      };

      const { data } = await axios.get(`${API_URL}/api/profile/top-agents/all/`, config);

      dispatch({
          type: LIST_TOP_AGENTS_SUCCESS,
          payload: data,
      });
  } catch (error) {
      dispatch({
          type: LIST_TOP_AGENTS_FAIL,
          payload: error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
      });
  }
};


