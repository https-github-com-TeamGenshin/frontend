import React from 'react'
import { Link } from 'react-router-dom'
import { Navigator } from '../../../Components/Navigator'
export const DriverHome = () => {
    return (
        <>
            <Navigator />
            <div className="flex flex-row justify-center items-center gap-4 mt-4">
                <Link
                    to="/driverpending"
                    className="w-[10rem] text-center py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Pending
                </Link>
                <Link
                    to="/driveraccepted"
                    className="w-[10rem] text-center py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Accepted
                </Link>
                <Link
                    to="/driverUpdate"
                    className="w-[10rem] text-center py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                    Update
                </Link>
            </div>
        </>
    )
}
