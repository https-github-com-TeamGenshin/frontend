import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
export const Unauthorized = () => {

    const navigate = useNavigate()
    const {pendingRequest} = useSelector((state: any) => state.login);

    const textAnimation = [
        "Unauthorized Access",
        "Access Denied",
        "Permission Revoked",
        "No Entry"
    ];
    const [currentTextIndex, setCurrentTextIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) =>
                prevIndex === textAnimation.length - 1 ? 0 : prevIndex + 1
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="bg-white p-8 rounded shadow-lg">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">
                    {textAnimation[currentTextIndex]}
                </h1>
                {!pendingRequest && <p className="text-gray-700">
                    Oops! It seems like you don't have permission to access this page.
                </p>}
                {pendingRequest && <p className="text-gray-700">
                    Due to a pending request, you cannot access the home page or other pages at this time.
                </p>}
                {pendingRequest && <button onClick={() => { navigate("/requests");}} className="m-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold py-2 px-4 border border-transparent rounded-md shadow-md transition duration-300 ease-in-out">
                    Back
                </button>}
            </div>
        </div>
    );
}
