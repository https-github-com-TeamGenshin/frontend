import React from 'react'
import { useNavigate } from "react-router-dom";

export const AdminHome = () => {

   const navigate = useNavigate();
  

  return (
  <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
    <h1 className="text-4xl font-bold mb-4">Welcome to the Admin Page!</h1>
    <p className="text-xl text-gray-700 mb-6">What would you like to do?</p>
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2" onClick={() => {navigate("/createcab")}}>Create a New Cab</button>
    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-2">Update a Cab Details</button>
    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-2">Delete a Cab</button>
    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-2">Delete a Driver</button>
</div>
  )
}