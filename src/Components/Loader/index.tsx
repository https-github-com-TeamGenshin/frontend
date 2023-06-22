import React from 'react'
import { useSelector } from 'react-redux';

export const Loader = () => {

    const loader = useSelector((state: any) => state.login.loader)

    console.log(loader)
    return (
        <div>
            {
                loader && <div>
                    <div className="fixed bg-white top-0 left-0 z-50 w-screen h-screen flex items-center justify-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                </div>
            }
        </div>
    )
}
