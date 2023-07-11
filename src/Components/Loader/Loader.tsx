import React from 'react'
import loaderGif from "../../Assets/loader.gif"

export const Loader = ({ loader } : {loader : any}) => {


    return (
        loader && <div>
            <div className="rounded-xl absolute w-full h-full bg-white z-10 flex items-center justify-center">
                <img src = {loaderGif}></img>
            </div>
        </div>
    )
}
