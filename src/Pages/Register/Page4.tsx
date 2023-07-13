import {useRef} from 'react'
import cab2 from "../../Assets/cab2.jpg"
import { Input, message } from 'antd'
import logo from "../../Assets/logo-light.png"
import { useDispatch, useSelector } from 'react-redux'
import { registerActions } from '../../store/register-slice'
import { post$createDriver, post$createUser } from '../../API/Register'
import { useNavigate } from 'react-router-dom'

export const Page4 = () => {

    const passwordref = useRef<any>(null)
    const confirmpasswordref = useRef<any>(null)

    const dispatch = useDispatch() 
    const navigate = useNavigate()

    const register = useSelector((state: any) => state.register)
        

    const Handle$OnClick$SetPassword = () => {
        console.log(passwordref.current.input.value)
        if (passwordref.current.input.value.length < 8) {
            message.error("Password must be atleast 8 characters long")
            return
        }
        if (passwordref.current.input.value === confirmpasswordref.current.input.value) {
            message.success("Password Matched")
            dispatch(registerActions.addUserPassword({ password: passwordref.current.input.value }))
            
            if (register.isDriver) {
                console.log(
                    {
                        username: register.driver.username,
                        password: passwordref.current.input.value,
                        email_id: register.driver.email_id,
                        mobile_no: register.driver.mobile_no,
                        gender: register.driver.gender,
                        age: register.driver.age,
                        imageurl: register.driver.imageurl,
                        experience_years: register.driver.experience_years,
                        location: register.driver.location,
                        vehicle_preferred: register.driver.vehicle_preferred,
                        rate_per_km: register.driver.rate_per_km,
                        rate_per_hrs: register.driver.rate_per_hrs
                    }
                )
                post$createDriver({
                    username: register.driver.username,
                    password: passwordref.current.input.value,
                    email_id: register.driver.email_id,
                    mobile_no: register.driver.mobile_no,
                    gender: register.driver.gender,
                    age: register.driver.age,
                    imageurl: register.driver.imageurl,
                    experience_years: register.driver.experience_years,
                    location: register.driver.location,
                    vehicle_preferred: register.driver.vehicle_preferred,
                    rate_per_km: register.driver.rate_per_km,
                    rate_per_hrs: register.driver.rate_per_hrs
                }).then((res: any) => {
                    if (res.status === 404)
                        message.error("User Already Exists")
                    else
                        navigate("/login")
                }).catch((err) => {

                })
            }
            else post$createUser(
                {
                    name: register.user.name,
                    email_id: register.user.email_id,
                    mobile_no: register.user.mobile_no,
                    password: passwordref.current.input.value,
                    gender: register.user.gender,
                    age: register.user.age,
                    location: register.user.location
                }
            ).then((res : any) => {
                if (res.status === 404)
                    message.error("User Already Exists")
                else
                    navigate("/login")
            }).catch((err) => {
                
            })
        }
        else {
            message.error("Password Not Matched")
        }
    }

    return (
        <div className='flex'>
            <div className='w-[50vw] h-screen overflow-hidden'>
                <img className='relative' src={cab2} ></img>
            </div>
            <div className='w-[60vw] flex flex-col gap-5 justify-center items-center'>
                <img className='w-48' src={logo}></img>
                <div className='text-center'>
                    <section>CREATE A PASSWORD</section>
                </div>
                <Input.Password ref = {passwordref} className="w-2/5 placeholder:text-black p-3" placeholder="Enter Password" />
                <Input.Password ref = {confirmpasswordref} className="w-2/5 placeholder:text-black p-3" placeholder="Confirm Password" />
                <button onClick={() => Handle$OnClick$SetPassword()} className='bg-black text-xl text-white px-8 py-2 rounded-xl'>Set Password</button>
            </div>

        </div>
    )
}
