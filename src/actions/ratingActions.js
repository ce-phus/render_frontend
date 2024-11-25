import axios from "axios";

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

        await axios.post(`/api/ratings/${profileId}/`, ratingData, config);

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
