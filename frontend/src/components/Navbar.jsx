import Sidebar from "./Sidebar";

const Navbar = () => {
  return (
    <nav className="h-16 bg-[#111] border border-gray-700 flex items-center justify-between px-6">
        
      <div className='flex items-center'>
        <Sidebar/>
      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="w-60 h-8 bg-transparent border border-gray-600 
          rounded-md px-3 text-sm text-white outline-none
          focus:border-blue-400"
        />
      </div>
      </div>


      {/* Right Section */}
      <div className="flex items-center gap-5">

        <span className="text-gray-300 text-sm">
          Sonar K.
        </span>

        <button
          className="border border-blue-400 text-blue-400 
          px-3 py-1 rounded-md text-sm hover:bg-blue-400 
          hover:text-black transition"
        >
          Dispatch
        </button>


        <div
          className="w-10 h-10 rounded-full bg-blue-400 
          flex items-center justify-center text-black 
          font-semibold"
        >
          KS
        </div>

      </div>

    </nav>
  );
};

export default Navbar;