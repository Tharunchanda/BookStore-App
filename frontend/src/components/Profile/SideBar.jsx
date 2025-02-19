import React from "react";
import { Link } from "react-router-dom"; 
import { FaArrowRightFromBracket } from "react-icons/fa6"; 

const SideBar = ({ data }) => {
  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-[100%] mr-4">
      <div className="flex flex-col items-center justify-center p-4 ">
        <img
          src={data?.avatar || "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"}
          alt={data?.username ? `${data.username}'s profile` : "Default profile avatar"}
          className="h-[12vh] w-[12vh] rounded-full object-cover border-2 border-zinc-500 shadow-md"
        />
        <p className="mt-3 text-xl text-zinc-100 font-semibold">
          {data?.username || "Guest"}
        </p>
        <p className="mt-1 text-sm text-zinc-400">
          {data?.email || "No email available"}
        </p>
        <div className="w-full mt-4 h-[1px] bg-zinc-700 hidden lg:block"></div>
      </div>
      <div className="w-full flex-col items-center justify-center hidden lg:flex">
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all"
        >
          Favourite
        </Link>
        <Link
          to="/profile/orderHistory"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all"
        >
          Order History
        </Link>
        <Link
          to="/profile/settings"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all"
        >
          Settings 
        </Link>
      </div>
      <button className="bg-zinc-900 p-2 rounded w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500">
        Log Out <FaArrowRightFromBracket className="ms-4"/>
      </button>

    </div>
  );
};

export default SideBar;
