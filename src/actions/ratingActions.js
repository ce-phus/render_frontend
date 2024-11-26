import axios from "axios";
const isDevelopment = import.meta.env.MODE ==='development'
const API_URL =  isDevelopment ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_BASE_URL_DEPLOY

export const createRating = (profileId, ratingData) => async (dispatch, getState) => {
    try {
        dispatch({ type: "RATING_REQUEST" });

        const {
            userLoginReducer: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.access}`,
            },
        };

        await axios.post(`${API_URL}/api/ratings/${profileId}/`, ratingData, config);

        dispatch({ type: "RATING_SUCCESS" });
    } catch (error) {
        dispatch({
            type: "RATING_FAIL",
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};
