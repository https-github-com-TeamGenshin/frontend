import React, { useState } from 'react';

export const CreateCab = () => {
 const [inputCount, setInputCount] = useState(1);

  const handleAddInput = () => {
    setInputCount(prevCount => prevCount + 1);
  };

  return (
    <div className="p-4 flex flex-col">
        <div className="">
            <h4>Enter the Model Name</h4>
            <input type="text" />
        </div>
  <h4 className="text-lg font-bold mb-4">Add All the Registration Numbers of Cabs Below</h4>
  <div className="flex flex-row flex-wrap gap-4">
  {Array.from({ length: inputCount }).map((_, index) => (
    <input
      key={index}
      type="text"
      placeholder={`Input ${index + 1}`}
      className="w-[30rem] mb-2 py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  ))}
  </div>
  <button
    onClick={handleAddInput}
    className="w-[20rem] bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
  >
    Add
  </button>
</div>

  );
}