
export const ratingReducer = (state = {}, action) => {
    switch (action.type) {
        case "RATING_REQUEST":
            return { loading: true };
        case "RATING_SUCCESS":
            return { loading: false, success: true };
        case "RATING_FAIL":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
