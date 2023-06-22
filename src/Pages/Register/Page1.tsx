import { useRef, useState } from 'react'
import { post$createUser } from '../../API/Register';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../store/login-slice';
import logo from "../../Assets/logo.png"
import { AutoComplete, message } from 'antd';
import {
    UserOutlined,
    WomanOutlined,
    CalendarOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { Cities } from './Cities';
import { Page1Validation } from '../../Validator/Registration';
import { UserPopup } from '../../Components/Popup/UserPopup';

export const Page1 = ({ setpage }: { setpage: any }) => {

    const dispatch = useDispatch()

    const [location, setlocation] = useState<string>("")
    const [UserPopupVal, setUserPopup] = useState(true)

    const nameRef = useRef<HTMLInputElement | null>(null);
    const genderRef = useRef<HTMLSelectElement | null>(null);
    const ageRef = useRef<HTMLInputElement | null>(null);
    // const locationRef = useRef<HTMLInputElement | null>(null);

    // get value from autocomplete


    const HandleRegisterData = () => {

        const data = {
            name: nameRef.current?.value,
            gender: genderRef.current?.value,
            age: ageRef.current?.value,
            location: location,
        }

        const validation = Page1Validation(data.name, data.age, data.location, data.gender)


        if (validation !== "Valid") {
            message.error(validation)
            return
        }
        console.log(data)
        dispatch(loginAction.userDetails(data))
        // post$createUser(data)
        setpage(1)
    }


    return (
        <>
            <div className={` ${UserPopupVal ? "blur-sm" : ""} bg-[#082000] h-screen w-screen flex flex-col items-center`}>
                <div className='text-white p-8 flex flex-col items-center gap-4'>
                    <img className='w-[30vw]' src={logo}></img>
                    <p className='text-2xl font-semibold'>Welcome!</p>
                </div>
                <div className='flex w-[80vw] flex-col gap-5 '>
                    <div className='bg-white flex items-center gap-2 p-3 rounded-md'>
                        <UserOutlined className=' relative -top-1 text-2xl' />
                        <input className=' outline-none p-1 w-full' ref={nameRef} placeholder='Name' />
                    </div>
                    <div className='bg-white flex items-center gap-2 p-3 rounded-md'>
                        <CalendarOutlined className=' relative -top-1 text-2xl' />
                        <input type='number' className=' outline-none p-1 w-full' ref={ageRef} placeholder='Age' />
                    </div>
                    <div className='bg-white flex items-center gap-2 p-3 rounded-md'>
                        <HomeOutlined className=' relative -top-1 text-2xl' />
                        <AutoComplete
                            className='w-full font-bold'
                            filterOption={(inputValue, option) =>
                                option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                            onSelect={(value) => setlocation(value.toString())}
                            options={Cities.map((city) => ({ value: city.name }))} // { value: city } is equal to { value: city, label: city }}
                            placeholder="Select City"
                        />
                        {/* <input className='p-1 w-full' ref={locationRef} placeholder='Location' /> */}
                    </div>
                    <div className='bg-white flex items-center gap-2 p-3 rounded-md'>
                        <WomanOutlined className=' relative -top-1 text-2xl' />
                        <select ref={genderRef} className='w-full outline-none' name="gender">
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="rather-not">Rather Not Say</option>
                        </select>
                        {/* <input className='p-1 w-full' ref={genderRef} placeholder='Gender' /> */}
                    </div>
                    <div onClick={() => HandleRegisterData()} className='bg-white flex justify-center p-2 rounded-2xl text-center text-[#ee1919]'>
                        <button className='font-bold text-xl'>Register</button>
                    </div>
                </div >
            </div>
            {
                UserPopupVal && <div className=' bg-transparent bg-slate-200 absolute top-0 left-0 h-screen w-screen z-10'></div>
            }
            {
                UserPopupVal && <UserPopup setUserPopup={setUserPopup} />
            }
        </>
    )
}
