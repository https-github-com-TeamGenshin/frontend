import React, { useState, useRef } from 'react';
import { CloudUploadOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../../config/firebase.config";
import { Navigator } from '../../../Components/Navigator';
import { post$createCab } from '../../../API/cabs';
import { CitiesAutoComplete } from '../../../Components/Autocomplete/Cities';
import { message } from 'antd';

export const CreateCab = () => {
  const [inputCount, setInputCount] = useState(1);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [progress, setProgress] = useState<any>(0);
  const [uploadFileBool, setUploadFileBool] = useState<boolean>(false);
  const [imageCover, setImageCover] = useState<string>();
  const [city,setCity] = useState<string>("");
  const [fuelType,setFuelType] = useState<string>("");
  const [colour,setColour] = useState<string>("");
  const [modelType, setModelType] = useState<string>("");
  const modelNameRef = useRef<HTMLInputElement>(null);
  const modelNumberRef = useRef<HTMLInputElement>(null);
  const modelNumberOfSeats = useRef<HTMLInputElement>(null);
  const modelRatePerHour = useRef<HTMLInputElement>(null);
  const modelRatePerKilometer = useRef<HTMLInputElement>(null);

  const handleAddInput = () => {
    setInputCount(inputCount + 1);
    setInputValues([...inputValues, '']);
  };

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

  const SubmitHandler = async () => {
    if(inputValues.length === 0 ||
      !modelNameRef.current?.value||
      !modelNumberRef.current?.value ||
      !modelNumberRef.current?.value ||
      !imageCover ||
      !colour ||
      !city || 
      !modelNumberOfSeats.current?.value ||
      !modelRatePerHour.current?.value ||
      !modelRatePerKilometer.current?.value ||
      !fuelType){
        message.error("Please Fill All the fields");
        return;
    }

    let returnFunction = false;
    inputValues.forEach((value) => {
      if(value === ""){
        returnFunction = true;
        message.error("Please Fill the Registration Numbers fields");
        return;
      }
    })
    if(returnFunction){
      return;
    }

   const response = await post$createCab({
      "registration_number":inputValues,
      "model_name":  modelNameRef.current.value,
      "model_no": modelNumberRef.current.value,
      "imageurl": imageCover,
      "colour": colour,
      "location": city,
      "no_of_seats": Number(modelNumberOfSeats.current.value),
      "hrs_rate": parseFloat(modelRatePerHour.current?.value),
      "kms_rate": parseFloat(modelRatePerKilometer.current?.value),
      "no_of_available": inputValues.length,
      "fuel_type": fuelType,
      "type": modelType
    })
    
    if(response?.data){
      setInputCount(1);
      setInputValues([]);
      modelNameRef.current.value = "";
      modelNumberRef.current.value = "";
      setImageCover("");
      setColour("");
      setCity("");
      modelNumberOfSeats.current.value = "";
      modelRatePerHour.current.value = "";
      modelRatePerKilometer.current.value = "";
      setFuelType("");
      setModelType("");
      message.success("Cab Created Successfully");
    }
    else{
      message.error("Error in Creating Cab");
    }
  }


  return (
    <>
  <Navigator />
  <div className="p-4 flex flex-col">
    <div className='flex flex-wrap gap-2'>
      <div className="my-4">
        <h4 className="text-lg font-semibold mb-2">Model Type</h4>
        <select
          onChange={(e) => { setModelType(e.target.value) }}
          className="text-center cursor-pointer p-2 rounded w-[22.5rem] outline-dotted outline-gray-300"
          name="Vehicle"
        >
          <option value="">Vehicle Type</option>
          <option value="two-wheeler">Two Wheeler</option>
          <option value="three-wheeler">Three Wheeler</option>
          <option value="four-wheeler">Four Wheeler</option>
          <option value="mini-bus">Mini Bus</option>
        </select>
      </div>
      <div className="my-4">
        <h4 className="text-lg font-semibold mb-2">Model Name</h4>
        <input
          type="text" 
          ref={modelNameRef}
          placeholder="Enter the Model (Car) Name"
          className="w-[22.5rem] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="my-4">
        <h4 className="text-lg font-semibold mb-2">Model Number</h4>
        <input
          type="text"
          ref={modelNumberRef}
          placeholder="Enter the Model(Car) Number"
          className="w-[22.5rem] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="my-4">
        <h4 className="text-lg font-semibold mb-2">Model Colour</h4>
        <select
         className="text-center cursor-pointer p-2 rounded w-[22.5rem] outline-dotted outline-gray-300"
          onChange={(ev) => setColour(ev.target.value)}
          name="CabColour"
        >
          <option value="">Select Color</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
          <option value="Red">Red</option>
          <option value="Yellow">Yellow</option>
          <option value="Blue">Blue</option>
        </select>
      </div>
      <div className="my-4">
        <h4 className="text-lg font-semibold mb-2">Model City Location</h4>
        <div className="text-center cursor-pointer p-1 rounded w-[22.5rem] border border-gray-300">
          <CitiesAutoComplete city={city} setcity={setCity} />
        </div>
      </div>
      <div className="my-4">
        <h4 className="text-lg font-semibold mb-2">Number of seats in Model</h4>
        <input
          type="number"
          placeholder="Enter the Model(Car) seats"
          ref={modelNumberOfSeats}
          className="w-[22.5rem] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="my-4">
        <h4 className="text-lg font-semibold mb-2">Model Rate per Hour</h4>
        <input
          type="number"
          ref={modelRatePerHour}
          placeholder="Enter the Model(Car) Rate in Hour"
          className="w-[22.5rem] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="my-4">
        <h4 className="text-lg font-semibold mb-2">Model Rate per Kilometer</h4>
        <input
        ref={modelRatePerKilometer}
          type="number"
          placeholder="Enter the Model(Car) Rate in Kilometer"
          className="w-[22.5rem] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="my-4">
        <h4 className="text-lg font-semibold mb-2">Model Fuel Type</h4>
        <select
          className="text-center cursor-pointer p-2 rounded w-[22.5rem] outline-dotted outline-gray-300"
          onChange={(ev) => setFuelType(ev.target.value)}
          name="fuel type"
        >
          <option value="">Select Fuel Type</option>
          <option value="electric">Electric</option>
          <option value="cng">CNG</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
        </select>
      </div>
      <div className="my-4">
        <h4 className="text-lg font-semibold mb-2">Add All the Registration Numbers of Cabs Below</h4>
    <div className="flex flex-row flex-wrap gap-2">
      {Array.from({ length: inputCount }).map((_, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Input Cab Plate No. ${index + 1}`}
          className="w-[22.5rem] mb-2 py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(event) => {
            const newValues = [...inputValues];
            newValues[index] = event.target.value;
            setInputValues(newValues);
            console.log(inputValues);
          }}
        />
      ))}
    </div>
      </div>
    </div>
        <div className="flex items-center justify-center">
          <button
            onClick={handleAddInput}
            className="w-[15rem] bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Registration Field
          </button>
        </div>

    
    <div className="mt-4 w-full h-[30rem] rounded-md border-2 border-dotted border-black bg-gray-100 cursor-pointer">
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
    <div className='flex items-center justify-center'>
      <button
        onClick={SubmitHandler}
        className="w-[15rem] mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
      >
        Create Cab
      </button>
    </div>
  </div>
</>

  );
}