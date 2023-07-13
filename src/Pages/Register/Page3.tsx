import React, {useState} from 'react'
import cab2 from "../../Assets/cab2.jpg"
import logo from "../../Assets/logo.png"
import { Input } from 'antd'
import { useDispatch } from 'react-redux';
import {Select} from 'antd';
import { registerActions } from '../../store/register-slice';
import { CloudUploadOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from '../../config/firebase.config';


export const Page3 = ({ setpage }: { setpage: any }) => {

  const dispatch = useDispatch()

  const experienceRef = React.useRef<any>(null)
  const ratePerKmRef = React.useRef<any>(null)
  const ratePerHourRef = React.useRef<any>(null)
  const vehicleRef = React.useRef<any>(null)

  const [uploadFileBool, setUploadFileBool] = useState<boolean>(false);
  const [progress, setProgress] = useState<any>(0);
  const [imageCover, setImageCover] = useState<string>("");

  const Handle$OnClick$RegisterButton = () => {
    dispatch(registerActions.addDriverExperienceYears({ experience_years: experienceRef.current.input.value }))
    dispatch(registerActions.addDriverRatePerKM({ rate_per_km: ratePerKmRef.current.input.value }))
    dispatch(registerActions.addDriverRatePerHrs({ rate_per_hrs: ratePerHourRef.current.input.value }))
    dispatch(registerActions.addDriverVehiclePreferred({ vehicle_preferred: vehicleRef.current }))
    dispatch(registerActions.addDriverImageURL({ imageurl: imageCover }))
    setpage(3)
  }

  const uploadFile = (e: any) => {
    setUploadFileBool(true);
    let uploadedFile;

    uploadedFile = e.target.files[0];

    const storageRef = ref(
      storage,
      `Images/${Date.now()}-${uploadedFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageCover(downloadURL);
          setUploadFileBool(false);
        });
      }
    );
  };

  const deleteFileObject = () => {
    setProgress(0);
    const deleteRef = ref(storage, imageCover);
    deleteObject(deleteRef).then(() => {
      setImageCover("");
    });
  };

  return (
    <div className='flex'>
      <div className='w-[40vw] h-screen overflow-hidden'>
        <img className='relative' src={cab2} ></img>
      </div>
      <div className='w-[60vw] flex flex-col gap-5 justify-center items-center'>
        <img className='w-24 bg-black rounded-3xl' src={logo}></img>
        <div className='text-center'>
          <section>HEY DRIVER !<br/>PLEASE PROVIDE YOUR<br/>DETAILS</section>
        </div>
        <Input ref = {experienceRef} className='w-2/5 placeholder:text-black p-3 ' placeholder='Experience Year'></Input>
        <div className='flex w-full justify-center gap-5'>
          <Input ref={ratePerKmRef} className="w-1/5 placeholder:text-black p-3" placeholder='Rate Per Km'></Input>
          <Input ref={ratePerHourRef} className="w-1/5 placeholder:text-black p-3" placeholder='Rate Per Hour'></Input>
        </div>
       <Select
          className="w-2/5 placeholder:text-black p-3"
          mode="multiple"
          allowClear
          placeholder="Vehicle Prefered"
          defaultValue={[]}
          onChange={(e) => vehicleRef.current = e}
          options={[
            { label: 'two-wheeler', value: 'two-wheeler' },
            { label: 'three-wheeler', value: 'three-wheeler' },
            { label: 'four-wheeler', value: 'four-wheeler' },
            { label: 'mini-bus', value: 'mini-bus' }
          ]}
        />
        <div className="w-1/2 h-[30vh] rounded-md border-2 border-dotted border-black bg-gray-100 cursor-pointer">
          {!uploadFileBool && (
            <>
              {!imageCover ? (
                <label>
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col justify-center items-center cursor-pointer">
                      <p className="font-bold text-2xl">
                        <CloudUploadOutlined />
                      </p>
                      <p className="text-lg">Click to Upload an Image of cab</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    name="upload-file"
                    accept={`image/*`}
                    className={"w-0 h-0"}
                    onChange={uploadFile}
                  />
                </label>
              ) : (
                <div className="relative w-full h-full overflow-hidden rounded-md">
                  <img
                    src={imageCover}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                    onClick={() => deleteFileObject()}
                  >
                    <DeleteOutlined className="text-white" />
                  </button>
                </div>
              )}
            </>
          )}
          {uploadFileBool && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="flex justify-center items-center h-20 bg-gray-100">
                <div className="grid gap-2">
                  <div className="flex items-center justify-center space-x-2 animate-pulse">
                    <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="w-[20rem] h-7 bg-gray-300 border-5 rounded-md m-5">
                <div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    backgroundColor: "#7DF9FF",
                    borderRadius: 5,
                    textAlign: "right",
                  }}
                >
                  <span className="text-xl font-semibold text-black p-2">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        <button onClick={() => Handle$OnClick$RegisterButton()} className='bg-black text-2xl text-white px-8 py-2 rounded-xl'>Register</button>
      </div>

    </div>
  )
}
