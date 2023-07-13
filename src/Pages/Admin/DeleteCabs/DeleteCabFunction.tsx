import React, { useState } from 'react'
import { Navigator } from '../../../Components/Navigator';
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { put$deleteCabDetails, put$deleteOneCabDetails } from '../../../API/cabs';
import { message } from 'antd';
export const DeleteCabFunction = () => {
    const sessionSelector = useSelector((state: any) => state.session)
    const [inputCount, setInputCount] = useState(sessionSelector.registered.length);
    const [inputValues, setInputValues] = useState<string[]>(sessionSelector.registered);
    const [decision, setDecision] = useState<string>("");
    const navigate = useNavigate();

    const deleteWholeHandler = () => {
        // Prompt for confirmation
        const confirmed = window.confirm("Are you sure you want to delete the cab?");

        if (confirmed) {
            put$deleteCabDetails({
                type: sessionSelector.type,
                colour: sessionSelector.colour,
                model_no: sessionSelector.model_no,
                fuel_type: sessionSelector.fuel_type,
            })
                .then((e) => {
                    message.success("Cab Deleted Successfully");
                    navigate("/admindeletecab");
                })
                .catch((e) => message.error("Error Deleting Cab"));
        }
    };

    const DeleteOneCabHandler = (inputValues: string) => {
        // Prompt for confirmation
        const confirmed = window.confirm("Are you sure you want to delete the cab?");

        if (confirmed) {
            put$deleteOneCabDetails({
                type: sessionSelector.type,
                colour: sessionSelector.colour,
                model_name: sessionSelector.model_name,
                model_no: sessionSelector.model_no,
                no_of_seats: sessionSelector.no_of_seats,
                fuel_type: sessionSelector.fuel_type,
                registration_number: inputValues,
            })
                .then((e) => {
                    console.log(e);
                    message.success("Cab Deleted Successfully");
                })
                .catch((e) => message.error("Error Deleting Cab"));
        }
    };


    return (
        <>
            <Navigator />
            {!decision && <div className="flex flex-row gap-52 h-[85vh] items-center justify-center">
                <div className="flex items-center justify-center flex-col bg-gray-300 p-4 rounded-lg gap-4" onClick={() => setDecision("One")}>
                    <h2 className="text-xl font-bold mb-2">Delete Registration Number</h2>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Select</button>
                </div>
                <div className="flex items-center justify-center flex-col bg-gray-300 p-4 rounded-lg gap-4" onClick={deleteWholeHandler}>
                    <h2 className="text-xl font-bold mb-2">Delete Whole Cab Details</h2>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Select</button>
                </div>
            </div>
            }
            {decision === "One" && <>
                <div className="flex flex-col items-center justify-center h-[84vh] gap-6">
                    <h1 className="text-3xl font-bold">Delete Cab with this Registration Number</h1>
                    <div className="flex flex-row flex-wrap items-center justify-center gap-2">
                        {Array.from({ length: inputCount }).map((_, index) => (
                            <div key={index} className="flex flex-col items-center justify-center gap-2">
                                <input
                                    type="text"
                                    disabled
                                    placeholder={`Input Cab Plate No. ${index + 1}`}
                                    className="w-[22.5rem] mb-2 py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(event) => {
                                        const newValues = [...inputValues];
                                        newValues[index] = event.target.value;
                                        setInputValues(newValues);
                                        console.log(inputValues);
                                    }}
                                    value={inputValues[index]}
                                />
                                <button className="px-4 w-[50%] py-2 bg-red-500 text-white font-bold rounded-lg" onClick={() => DeleteOneCabHandler(inputValues[index])}>Delete This Cab</button>
                            </div>
                        ))}
                    </div>
                </div>

            </>}
        </>
    )
}
