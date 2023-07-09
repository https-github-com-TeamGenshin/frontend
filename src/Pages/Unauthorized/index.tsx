import React, {useState, useEffect} from 'react'

export const Unauthorized = () => {
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
                <p className="text-gray-700">
                    Oops! It seems like you don't have permission to access this page.
                </p>
            </div>
        </div>
    );
}
