import "./Splash.css"
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

export const Splash = () => {

    const navigate = useNavigate()

    return (
        <div className='bg-[#082000] h-screen w-screen flex items-end justify-center'>
            <div className='black-container bg-black flex  justify-center items-center text-white w-screen rounded-b-full absolute top-0 z-10'>
                <div className='flex flex-col gap-10 items-center'>
                    <img width="84" height="84" src="https://img.icons8.com/cotton/128/cab-waiting.png" alt="cab-waiting" />
                    <div className='text-center text-2xl'>CAB <br/> FINDER</div>
                </div>

            </div>
            <div className='text-white flex flex-col gap-10 p-16 justify-center items-center'>
                <div className='font-extralight text-3xl text-center'>Find Your <br />Destination</div>
                <div onClick={() => navigate("/home")} className='flex items-center gap-4 px-12 py-1 rounded-full border-2 border-orange-600'>
                    <section className='text-orange-600 font-bold'>CONTINUE</section>
                    <RightOutlined className='text-orange-600' />
                </div>
            </div>
        </div>
    )
}
