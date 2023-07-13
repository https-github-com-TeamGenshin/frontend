import React, { useEffect, useState } from 'react'
import { Navigator } from '../../../Components/Navigator'
import { get$getOneDriver, put$updateDriver } from '../../../API/drivers'
import { message } from 'antd'
import { CitiesAutoComplete } from '../../../Components/Autocomplete/Cities'
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from '../../../config/firebase.config'
import { DeleteOutlined, CloudUploadOutlined } from '@ant-design/icons'


export const DriverUpdate = () => {

  const [progress, setProgress] = useState<any>(0);
  const [uploadFileBool, setUploadFileBool] = useState<boolean>(false);
  const [imageCover, setImageCover] = useState<string>();
  const [city, setcity] = React.useState<any>("")

  const ageref = React.useRef<any>(null);
  const experienceref = React.useRef<any>(null);
  const genderref = React.useRef<any>(null);
  const hrsref = React.useRef<any>(null);
  const kmsref = React.useRef<any>(null);
  const usernameref = React.useRef<any>(null);

  function checkImageExists(url: any, callback: any) {
    var img = new Image();

    img.onload = function () {
      callback(true);
    };

    img.onerror = function () {
      callback(false);
    };

    img.src = url;
  }

  useEffect(() => {
    get$getOneDriver().then((res) => {
      // console.log(res.data)
      ageref.current.value = res.data.age
      experienceref.current.value = res.data.experience_years
      genderref.current.value = res.data.gender
      usernameref.current.value = res.data.username
      setcity(res.data.location)
      hrsref.current.value = res.data.rate_per_hrs
      kmsref.current.value = res.data.rate_per_km
      checkImageExists(res.data.imageurl, function (exists: any) {
        if (exists) {
          setImageCover(res.data.imageurl)
        }
        else setImageCover("")
      });

    }
    )
  }, [])



  const Handle$onClick$UpdateButton = () => {
    checkImageExists(imageCover, function (exists: any) {
      if (!exists) {
        message.error("Please upload image")
      }
      else {
        put$updateDriver({
          age: ageref.current.value,
          experience_years: experienceref.current.value,
          username: usernameref.current.value,
          gender: genderref.current.value,
          location: city,
          rate_per_hrs: hrsref.current.value,
          rate_per_km: kmsref.current.value,
          imageurl: imageCover
        }).then(res => {
          // console.log(res)
        })
      }
    });


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
        // console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // updateState(downloadURL);
          // console.log(downloadURL);
          setImageCover(downloadURL);
          setUploadFileBool(false);
        });
      }
    );
  };

  const deleteFileObject = () => {
    // console.log(imageCover);
    setProgress(0);
    const deleteRef = ref(storage, imageCover);
    deleteObject(deleteRef).then(() => {
      setImageCover("");
      // console.log(imageCover);
    });
  };


  return (
    <div>
      <Navigator />
      <div className='text-center text-xl p-3'>
        Update Drivers Details
      </div>
      <div className='flex w-screen justify-evenly items-center p-6'>
        <div className='flex gap-5 p-6'>
          <div className='flex flex-col gap-9'>
            <p>Age : </p>
            <p>Username : </p>
            <p>Experience Years : </p>
            <p>Gender : </p>
            <p>Location : </p>
            <p>Rate per hour : </p>
            <p>Rate per Km : </p>
          </div>

          <div className='flex flex-col gap-4'>
            <input className='p-2 w-[20vw] border-2 border-blue-500 rounded-lg' ref={ageref}></input>
            <input className='p-2 w-[20vw] border-2 border-blue-500 rounded-lg' ref={usernameref}></input>
            <input className='p-2 w-[20vw] border-2 border-blue-500 rounded-lg' ref={experienceref}></input>
            <select ref={genderref} className='p-2 w-[20vw] border-2 border-blue-500 rounded-lg' name='gender'>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div className='p-1 overflow-hidden w-[20vw] border-2 border-blue-500 rounded-lg'>
              <CitiesAutoComplete city={city} setcity={setcity} />
            </div>
            <input className='p-2 w-[20vw] border-2 border-blue-500 rounded-lg' ref={hrsref}></input>
            <input className='p-2 w-[20vw] border-2 border-blue-500 rounded-lg' ref={kmsref}></input>
          </div>
        </div>

        <div className="w-[45rem] h-[30rem] rounded-md border-2 border-dotted border-black bg-gray-100 cursor-pointer">
          {!uploadFileBool &&
            <>
              {!imageCover ? <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center cursor-pointer">
                    <p className="font-bold text-2xl">
                      <CloudUploadOutlined />
                    </p>
                    <p className="text-lg">
                      Click to Upload an Image
                    </p>
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
              :
              <div className=" w-full h-full overflow-hidden rounded-md">
                <img
                  src={imageCover}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out "
                  onClick={() => deleteFileObject()}
                >
                  <DeleteOutlined className="text-white " />
                </button>
              </div>
            }
            </>
          }
          {uploadFileBool && <div className="w-full h-full flex flex-col items-center justify-center">

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
              <div style={{
                height: "100%",
                width: `${progress}%`,
                backgroundColor: "#7DF9FF",
                borderRadius: 5,
                textAlign: "right"
              }}>
                <span className="text-xl font-semibold text-black p-2">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>}
        </div>
      </div>
      <div className='w-screen flex justify-center'>
        <button onClick={() => Handle$onClick$UpdateButton()} className='w-[20vw] rounded p-2 border-2 border-blue-500'>Update</button>
      </div>
    </div>
  )
}
