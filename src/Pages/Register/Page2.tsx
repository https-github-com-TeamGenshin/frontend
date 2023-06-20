import {useRef} from 'react'
import { provider, auth } from '../../utils/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { message } from 'antd';

export const Page2 = ({setpage} : {setpage : any}) => {

    const emailRef = useRef<HTMLInputElement | null>(null);
    const mobileRef = useRef<HTMLInputElement | null>(null);

    // Gmail login using google firebase
    const HandleGmailLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((result) => {
            const user = result.user;
            message.success(user.email)
        })
    }
    

    return (
        <div>
            <>
                <div className='flex flex-col gap-3'>
                    <div className='flex'>
                        <button onClick={() => HandleGmailLogin()}>Add Your Gmail</button>
                    </div>
                    <div className='flex'>
                        <input ref={mobileRef} placeholder='Mobile Number' />
                        <div className=''>Verify Mobile Number</div>
                    </div>

                    <div onClick={() => { setpage(2) }}>Next</div>
                </div >
            </>
        </div>
    )
}
