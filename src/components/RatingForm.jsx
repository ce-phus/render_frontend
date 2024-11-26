import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRating } from "../actions/ratingActions";
import { FaStar } from "react-icons/fa";
import Spinner from "./Spinner";

const RatingForm = ({ profileId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const dispatch = useDispatch();

    const { loading, success, error } = useSelector((state) => state.ratingReducer);

    const submitHandler = (e) => {
        e.preventDefault();
        const ratingData = { rating, comment };
        dispatch(createRating(profileId, ratingData));
    };

    return (
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 dark:bg-dark dark:text-white">
            {loading && <p className=""><Spinner/></p>}
            {success && <p className="text-green-500 mb-4">Review submitted successfully!</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={submitHandler} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-300">
                        Rating:
                    </label>
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                type="button"
                                key={star}
                                onClick={() => setRating(star)}
                                className={`text-2xl ${
                                    rating >= star ? "text-yellow-400" : "text-gray-300"
                                } focus:outline-none`}
                            >
                                <FaStar />
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="comment"
                        className="block text-gray-700 font-semibold mb-2 dark:text-gray-300"
                    >
                        Comment:
                    </label>
                    <textarea
                        id="comment"
                        placeholder="Add a comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring dark:bg-dark focus:ring-blue-300 focus:outline-none"
                        rows={4}
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none"
                >
                    {loading ? <Spinner/> : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default RatingForm;
