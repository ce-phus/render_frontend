import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from 'react-bootstrap';
import { activateUser } from '../actions/userActions';

const Activation = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [message, setMessage] = useState(""); // Step 1: Define `message` state

    const userActivate = useSelector((state) => state.userActivateReducer);
    const { loading, error, success } = userActivate;

    useEffect(() => {
        if (uid && token) {
            dispatch(activateUser(uid, token));
        }
    }, [dispatch, uid, token]);

    useEffect(() => {
        if (success) {
            setMessage("Your account has been activated! You can log in now.");
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } else if (error) {
            toast.error(error);
        }
    }, [success, error, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (uid && token) {
            dispatch(activateUser(uid, token));
            toast.success("Your account has been activated! You can log in now.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-dark pt-20">
            <h1 className="text-2xl mb-4 dark:text-white">
                <FaCheckCircle /> Activate Your Account
            </h1>
            {loading && <Spinner />}
            {message && <p className="text-green-500 mb-4">{message}</p>}
            <div className="flex">
                <div className="flex flex-col text-center">
                    <button onClick={handleSubmit} className="px-2.5 py-1.5 bg-blue-500 hover:bg-blue-700 text-white rounded-lg">
                        {loading ? 'Activating...' : 'Activate Account'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Activation;
