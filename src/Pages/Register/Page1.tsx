import { useRef, useState } from 'react'
import { post$createUser } from '../../API/Register';
import { useDispatch, useSelector } from 'react-redux';
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
import cab from "../../Assets/cab.jpg"
import driverImg from "../../Assets/driver.png"
import userImg from "../../Assets/customer.png"
import { registerActions } from '../../store/register-slice';

export const Page1 = ({ setpage }: { setpage: any }) => {

    const dispatch = useDispatch()

    const [location, setlocation] = useState<string>("")

    const nameRef = useRef<HTMLInputElement | null>(null);
    const genderRef = useRef<HTMLSelectElement | null>(null);
    const ageRef = useRef<HTMLInputElement | null>(null);
    // const locationRef = useRef<HTMLInputElement | null>(null);

    const { isDriver } = useSelector((state: any) => state.register)


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
        // console.log(isDriver)
        if (isDriver) {
            dispatch(registerActions.addDriverUsername({ username: nameRef.current?.value }))
            dispatch(registerActions.addDriverAge({ age: ageRef.current?.value }))
            dispatch(registerActions.addDriverLocation({ location: location }))
            dispatch(registerActions.addDriverGender({ gender: genderRef.current?.value }))
        }
        else {
            dispatch(registerActions.addUsername({ name: nameRef.current?.value }))
            dispatch(registerActions.addUserAge({ age: ageRef.current?.value }))
            dispatch(registerActions.addUserLocation({ location: location }))
            dispatch(registerActions.addUserGender({ gender: genderRef.current?.value }))
        }

        // console.log(data)
        // dispatch(loginAction.userDetails(data))
        // post$createUser(data)
        setpage(1)
    }

    const Handle$Onclick = (usertype: string) => {
        if (usertype === "Driver") {
            dispatch(registerActions.addIsDriver({ isDriver: true }))
        }
        else dispatch(registerActions.addIsDriver({ isDriver: false }))
        localStorage.setItem("type", usertype)
    }

    return (
        <div className='flex justify-between'>
            <div className='w-[60vw] h-screen overflow-hidden'>
                <img className='relative -top-[30vh]' src = {cab}></img>
            </div>
            <div className='w-[50vw] flex justify-center items-center'>
                <div className='flex w-[30vw] flex-col items-center gap-5 '>
                    <div className=' p-4 flex flex-col items-center gap-4'>
                        <img className='w-[10vw] text-black bg-black rounded-3xl' src={logo}></img>
                        <p className='text-2xl font-semibold'>Welcome!</p>
                    </div>
                    <div className='w-[25vw] border-2 border-black flex items-center gap-2 p-3 rounded-xl'>
                        <UserOutlined className=' relative -top-1 text-2xl' />
                        <input className=' outline-none p-1 w-full' ref={nameRef} placeholder='Name' />
                    </div>
                    <div className='w-[25vw] border-2 border-black flex items-center gap-2 p-3 rounded-xl'>
                        <CalendarOutlined className=' relative -top-1 text-2xl' />
                        <input type='number' className=' outline-none p-1 w-full' ref={ageRef} placeholder='Age' />
                    </div>
                    <div className='w-[25vw] border-2 border-black flex items-center gap-2 p-3 rounded-xl'>
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
                    <div className='w-[25vw] border-2 border-black flex items-center gap-2 p-3 rounded-xl'>
                        <WomanOutlined className=' relative -top-1 text-2xl' />
                        <select ref={genderRef} className='w-full outline-none' name="gender">
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="rather-not">Rather Not Say</option>
                        </select>
                        {/* <input className='p-1 w-full' ref={genderRef} placeholder='Gender' /> */}
                    </div>
                    <div className='flex justify-center items-center rounded-t-3xl'>
                        <div className='flex gap-20'>
                            <div onClick={() => Handle$Onclick("Customer")} className={`cursor-pointer ${!isDriver && "border-2 border-black"}  rounded-xl p-2 flex flex-col items-center`}>
                                <img className='w-20' src={userImg}></img>
                                <p className=''>Customer</p>
                            </div>
                            
                            <div onClick={() => Handle$Onclick("Driver")} className={`cursor-pointer ${isDriver && "border-2 border-black"}  rounded-xl p-2 flex flex-col items-center`}>
                                <img className='w-20' src={driverImg}></img>
                                <p className=''>Driver</p>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => HandleRegisterData()} className='w-full bg-black text-white flex justify-center p-2 rounded-2xl text-center'>
                        <button className='font-bold text-xl'>Next</button>
                    </div>
                </div >
            </div>
        </div>
    )
}
