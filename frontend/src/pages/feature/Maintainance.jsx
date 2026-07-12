import { useState } from "react";

const Maintenance = () => {

  const [records,setRecords] = useState([
    {
      vehicle:"VAN-05",
      service:"Oil Change",
      cost:"2500",
      status:"In Shop"
    },
    {
      vehicle:"TRUCK-11",
      service:"Engine Repair",
      cost:"18000",
      status:"Completed"
    },
    {
      vehicle:"MINI-03",
      service:"Tyre Replace",
      cost:"6200",
      status:"In Shop"
    }
  ]);


  const statusColor = {
    "In Shop":"bg-yellow-600",
    "Completed":"bg-green-600"
  };


  return (

    <div className="
    min-h-screen
    bg-[#111]
    text-white
    p-8">


      <div className="
      grid
      grid-cols-2
      gap-10">


        {/* Maintenance Form */}

        <div>


          <h2 className="
          text-sm
          text-gray-300
          mb-5">

            LOG SERVICE RECORD

          </h2>



          <div className="space-y-4">


            <input
            placeholder="Vehicle"
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
            placeholder="Service Type"
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
            placeholder="Cost"
            type="number"
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



            <select
            className="
            w-full
            bg-[#111]
            border
            border-gray-700
            rounded-md
            px-4
            py-2">

              <option>
                Active
              </option>

              <option>
                Completed
              </option>

            </select>



            <button
            className="
            w-full
            bg-yellow-600
            hover:bg-yellow-500
            rounded-md
            py-2">

              Save

            </button>


          </div>



          {/* Rules */}

          <div className="
          mt-8
          text-sm">


            <p className="text-green-400">
              Available
              <span className="text-gray-500 mx-10">
                ─────────→
              </span>
              <span className="text-yellow-500">
                In Shop
              </span>
            </p>



            <p className="text-yellow-500 mt-4">
              In Shop
              <span className="text-gray-500 mx-10">
                ─────────→
              </span>
              <span className="text-green-400">
                Available
              </span>
            </p>


            <p className="
            mt-5
            text-orange-400">

              Note: In Shop vehicles are removed from dispatch pool.

            </p>


          </div>


        </div>





        {/* Service Log Table */}


        <div>


          <h2 className="
          text-sm
          mb-5
          text-gray-300">

            SERVICE LOG

          </h2>



          <table className="
          w-full
          text-sm">


            <thead
            className="
            text-gray-400
            border-b
            border-gray-800">

              <tr>

                <th className="text-left py-3">
                  VEHICLE
                </th>

                <th>
                  SERVICE
                </th>

                <th>
                  COST
                </th>

                <th>
                  STATUS
                </th>

              </tr>

            </thead>



            <tbody>


            {
              records.map((item,index)=>(

                <tr
                key={index}
                className="
                border-b
                border-gray-800">


                  <td className="py-3">
                    {item.vehicle}
                  </td>


                  <td>
                    {item.service}
                  </td>


                  <td>
                    ₹{item.cost}
                  </td>



                  <td>

                    <span
                    className={`
                    px-5
                    py-1
                    rounded-md
                    text-black
                    ${statusColor[item.status]}
                    `}>

                      {item.status}

                    </span>

                  </td>


                </tr>

              ))
            }


            </tbody>


          </table>


        </div>


      </div>


    </div>

  );
};


export default Maintenance;