import { useState } from "react";
import AddDriver from "../components/AddDriver";

const DriverManagement = () => {
    const [showModal,setShowModal] = useState(false);

  const drivers = [
    {
      name: "Alex",
      license: "DL-88213",
      category: "LMV",
      expiry: "12/2038",
      contact: "98765xxxxx",
      score: "96%",
      status: "Available"
    },
    {
      name: "John",
      license: "DL-44120",
      category: "HMV",
      expiry: "03/2025 EXPIRED",
      contact: "98230xxxxx",
      score: "81%",
      status: "Suspended"
    },
    {
      name: "Priya",
      license: "DL-77031",
      category: "LMV",
      expiry: "08/2032",
      contact: "99110xxxxx",
      score: "99%",
      status: "On Trip"
    },
    {
      name: "Suresh",
      license: "DL-90045",
      category: "HMV",
      expiry: "01/2027",
      contact: "97440xxxxx",
      score: "88%",
      status: "Off Duty"
    }
  ];


  const statusStyle = {
    Available: "bg-green-500",
    "On Trip": "bg-blue-500",
    Suspended: "bg-orange-500",
    "Off Duty": "bg-gray-500"
  };


  return (
    <div className="min-h-screen bg-[#111] text-white p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-xl font-semibold">
          Driver Management
        </h1>


        <button
          onClick={()=>setShowModal(true)}
          className="
          bg-yellow-600 
          px-5 py-2 
          rounded-lg 
          text-sm
          hover:bg-yellow-500"
        >
          + Add Driver
        </button>

      </div>


      {/* Search and Filter */}

      <div className="flex gap-5 mb-6">

        <input
          type="text"
          placeholder="Search driver..."
          className="
          bg-transparent
          border
          border-gray-700
          rounded-md
          px-4
          py-2
          w-72
          outline-none"
        />


        <select
          className="
          bg-[#111]
          border
          border-gray-700
          rounded-md
          px-4"
        >
          <option>
            All Status
          </option>

          <option>
            Available
          </option>

          <option>
            On Trip
          </option>

          <option>
            Suspended
          </option>

        </select>

      </div>



      {/* Table */}

      <div className="
      border
      border-gray-800
      rounded-lg
      overflow-hidden">

        <table className="w-full text-sm">

          <thead className="text-gray-400 border-b border-gray-800">

            <tr>

              <th className="text-left p-4">
                DRIVER
              </th>

              <th className="text-left">
                LICENSE NO
              </th>

              <th>
                CATEGORY
              </th>

              <th>
                EXPIRY
              </th>

              <th>
                CONTACT
              </th>

              <th>
                SAFETY SCORE
              </th>

              <th>
                STATUS
              </th>

              <th>
                ACTION
              </th>

            </tr>

          </thead>


          <tbody>


          {
            drivers.map((driver,index)=>(

              <tr
              key={index}
              className="border-b border-gray-800 hover:bg-[#191919]"
              >

                <td className="p-4">
                  {driver.name}
                </td>


                <td>
                  {driver.license}
                </td>


                <td>
                  {driver.category}
                </td>


                <td
                className={
                  driver.expiry.includes("EXPIRED")
                  ?
                  "text-red-400"
                  :
                  ""
                }
                >
                  {driver.expiry}
                </td>


                <td>
                  {driver.contact}
                </td>


                <td>
                  {driver.score}
                </td>


                <td>

                  <span
                  className={`
                  px-4
                  py-1
                  rounded-md
                  text-black
                  ${statusStyle[driver.status]}
                  `}
                  >

                    {driver.status}

                  </span>

                </td>


                <td>

                  <button
                  className="
                  text-blue-400
                  hover:underline"
                  >
                    View
                  </button>

                </td>


              </tr>

            ))
          }


          </tbody>


        </table>

      </div>



      {/* Rules */}

      <div className="
      mt-8
      text-sm
      text-orange-400">

        Rule: Expired license or Suspended driver 
        cannot be assigned to trips.

      </div>
          <AddDriver open={showModal} setOpen={setShowModal}/>

    </div>
  );
};


export default DriverManagement;