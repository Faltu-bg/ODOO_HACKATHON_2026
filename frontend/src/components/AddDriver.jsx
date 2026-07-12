import { useState } from "react";

const AddDriver = ({ open, setOpen }) => {

  if (!open) return null;


  return (
    <div className="
    fixed 
    inset-0 
    bg-black/60 
    flex 
    items-center 
    justify-center 
    z-50">


      <div className="
      bg-[#181818]
      border
      border-gray-700
      w-[500px]
      rounded-xl
      p-6
      text-white">


        {/* Header */}

        <div className="
        flex 
        justify-between 
        items-center 
        mb-6">

          <h2 className="text-xl font-semibold">
            Add Driver
          </h2>


          <button
          onClick={()=>setOpen(false)}
          className="text-gray-400 text-xl">

            ✕

          </button>

        </div>



        {/* Form */}

        <div className="space-y-4">


          <input
          type="text"
          placeholder="Driver Name"
          className="
          w-full
          bg-transparent
          border
          border-gray-700
          rounded-md
          px-4
          py-2
          outline-none"
          />



          <input
          type="text"
          placeholder="License Number"
          className="
          w-full
          bg-transparent
          border
          border-gray-700
          rounded-md
          px-4
          py-2"
          />



          <select
          className="
          w-full
          bg-[#181818]
          border
          border-gray-700
          rounded-md
          px-4
          py-2">

            <option>
              Select License Category
            </option>

            <option>
              LMV
            </option>

            <option>
              HMV
            </option>

          </select>




          <input
          type="date"
          className="
          w-full
          bg-transparent
          border
          border-gray-700
          rounded-md
          px-4
          py-2"
          />



          <input
          type="text"
          placeholder="Contact Number"
          className="
          w-full
          bg-transparent
          border
          border-gray-700
          rounded-md
          px-4
          py-2"
          />



          <input
          type="number"
          placeholder="Safety Score"
          className="
          w-full
          bg-transparent
          border
          border-gray-700
          rounded-md
          px-4
          py-2"
          />



          <select
          className="
          w-full
          bg-[#181818]
          border
          border-gray-700
          rounded-md
          px-4
          py-2">

            <option>
              Available
            </option>

            <option>
              Off Duty
            </option>

            <option>
              Suspended
            </option>

          </select>


        </div>



        {/* Buttons */}

        <div className="
        flex 
        justify-end 
        gap-4 
        mt-6">


          <button
          onClick={()=>setOpen(false)}
          className="
          px-5
          py-2
          rounded-md
          border
          border-gray-600">

            Cancel

          </button>



          <button
          className="
          px-5
          py-2
          rounded-md
          bg-yellow-600
          hover:bg-yellow-500">

            Add Driver

          </button>


        </div>


      </div>


    </div>
  );
};


export default AddDriver;