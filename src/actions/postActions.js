import axios from "axios";
import logout from './userActions';

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

const isDevelopment = import.meta.env.MODE ==='development'
const API_URL =  isDevelopment ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_BASE_URL_DEPLOY

export const getPostIndexList = () => async (dispatch) => {
    try {
        dispatch({ type: POST_INDEX_REQUEST });

        const { data } = await axios.get(`${API_URL}/api/posts/index/`);

        dispatch({ type: POST_INDEX_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: POST_INDEX_FAIL, payload: error.message });
        if (error.response.data.detail === "Given token not valid for any token type") {
          console.log("error response: ",error.response.data.detail)
          dispatch(logout());
          
        }
    }
};

export const listAllPosts = () => async (dispatch, getState) => {
    try {
      dispatch({ type: LIST_ALL_POSTS_REQUEST });
  
      const {
        userLoginReducer: { userInfo },
      } = getState();
  
      if (!userInfo || !userInfo.access) {
        throw new Error('User is not authenticated');
      }
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
  
      const { data } = await axios.get(`${API_URL}/api/posts/all/`, config);
  
      dispatch({
        type: LIST_ALL_POSTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LIST_ALL_POSTS_FAIL,
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

  export const createPost = (formData) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_POST_REQUEST });
  
      const {
        userLoginReducer: { userInfo },
      } = getState();
  
      if (!userInfo || !userInfo.access) {
        throw new Error('User is not authenticated');
      }
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
  
      const { data } = await axios.post(
        `${API_URL}/api/posts/create/`,
        formData,
        config
      );
  
      dispatch({
        type: CREATE_POST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_POST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const updatePost = (slug, propertyData) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_POST_REQUEST });

        const {
            userLoginReducer: { userInfo },
          } = getState();
      
          if (!userInfo || !userInfo.access) {
            throw new Error('User is not authenticated');
          }
      

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`${API_URL}/api/posts/details/${slug}/`, propertyData, config);

        dispatch({
            type: UPDATE_POST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_POST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const deletePost = (slug) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_POST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`${API_URL}/api/post/delete/${slug}/`, config);

        dispatch({
            type: DELETE_POST_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: DELETE_POST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const getPostDetails = (slug) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_DETAILS_REQUEST });


        const { data } = await axios.get(`${API_URL}/api/posts/detail/${slug}/`);

        // console.log("PropertyDetail", data)
        dispatch({
            type: POST_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: POST_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const searchPost = (searchData) => async (dispatch) => {
    try {
        dispatch({ type: SEARCH_POST_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(`${API_URL}/api/posts/search/`, searchData, config);

        dispatch({
            type: SEARCH_POST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SEARCH_POST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};
