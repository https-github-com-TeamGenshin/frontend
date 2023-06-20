import {useRef} from 'react'
import { post$createUser } from '../../API/Register';

export const Page1 = ({setpage} : {setpage : any}) => {

    const nameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const genderRef = useRef<HTMLInputElement | null>(null);
    const ageRef = useRef<HTMLInputElement | null>(null);
    const locationRef = useRef<HTMLInputElement | null>(null);

    const HandleRegisterData = () => {
        // const data = {
        //   name: "AjinkyaP",
        //   email_id: "shri@gmail.com",
        //   mobile_no: "9876543211",
        //   password: "qwertyuiop",
        //   gender: "Male",
        //   age: 30,
        //   location: "Pune"
        // }
        // post$createUser(data)
        setpage(1)
      }
    

    return (
        <div>
            <div className='flex flex-col gap-5 w-1/2'>
                <input ref={nameRef} placeholder='name' />
                <input ref={passwordRef} placeholder="input password" />
                <input ref={genderRef} placeholder='Gender' />
                <input ref={ageRef} placeholder='Age' />
                {/* <AutoComplete
                    style={{ width: 200 }}
                    options={Cities}
                    // placeholder="try to type `b`"
                    filterOption={(inputValue, option) =>
                        option!.name.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                /> */}
                <input ref={locationRef} placeholder='Location' />
                <div onClick={() => HandleRegisterData()}>Next</div>
            </div >
        </div>
    )
}
