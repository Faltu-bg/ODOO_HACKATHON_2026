import { useState } from "react";
import {Link} from 'react-router-dom'

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="m-5 text-3xl text-white cursor-pointer"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white p-5 
        transform transition-transform duration-300 z-20
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          className="absolute right-5 top-5 text-2xl"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mt-10 mb-8">
          TransitOps
        </h2>

        <ul className="space-y-5">
          <li className="hover:text-cyan-400 cursor-pointer">
            Dashboard
          </li>

          <li className="hover:text-cyan-400 cursor-pointer">
            Fleet
          </li>

          <li className="hover:text-cyan-400 cursor-pointer">
            <Link to='/drivers'>Drivers</Link>
          </li>

          <li className="hover:text-cyan-400 cursor-pointer">
            Trips
          </li>

          <li className="hover:text-cyan-400 cursor-pointer">
            <Link to='/maintainance'>Maintainance</Link>
          </li>
          <li className="hover:text-cyan-400 cursor-pointer">
            Fuel & Expenses
          </li>
          <li className="hover:text-cyan-400 cursor-pointer">
            Analytics
          </li>
          <li className="hover:text-cyan-400 cursor-pointer">
            Settings
          </li>
        </ul>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-10"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;