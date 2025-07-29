"use client";
import { IoSearch } from "react-icons/io5";

const Topbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-[100%] h-[80px] flex items-center 3md:justify-between justify-end px-5 font-thin bg-amber-950  py-3">
      
      <div className="flex items-center gap-3">
        <div className="relative ">
          <input
            type="text"
            placeholder="جستجو کنید ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none text-[15px] font-serif placeholder:text-gray-800 text-black  bg-white placeholder:text-md xl:w-[400px] mr-12 sm:w-[300px] w-[250px] h-[40px] pr-4  rounded-md"
          />
          <button className="absolute left-1 top-2/4 -translate-y-2/4 hover:opacity-75 duration-200   text-amber-950  px-1  rounded-full">
            <IoSearch size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
