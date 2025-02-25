import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authActions } from "../store/auth.js";
const MobileNav = () => {
  const role = useSelector((state) => state.auth.role);
  return (
    <>
      {role === "user" && (
        <div className='w-full lg:hidden flex items-center justify-between my-4 '>
      <Link
                to="/profile"
                className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-700 rounded transition-all"
              >
                Favourite
              </Link>
              <Link
                to="/profile/orderHistory"
                className="text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-700 rounded transition-all"
              >
                Order History
              </Link>
              <Link
                to="/profile/settings"
                className="text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-700 rounded transition-all"
              >
                Settings 
              </Link>
    </div>
      )}
      {role === "admin" && (
        <div className='w-full lg:hidden flex items-center justify-between my-4'>
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-700 rounded transition-all"
          >
            All orders
          </Link>
          <Link
            to="/profile/add-book"
            className="text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-700 rounded transition-all"
          >
            Add Book
          </Link>
    </div>
      )}
    </>
  )
}

export default MobileNav