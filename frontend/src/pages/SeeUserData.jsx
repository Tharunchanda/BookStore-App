import React from 'react';
import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({ userDivData, userDiv, setuserDiv }) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed top-0 left-0 h-screen w-full bg-black bg-opacity-50 backdrop-blur-sm ${userDiv}`} 
        onClick={() => setuserDiv("hidden")}
      ></div>
      
      {/* Modal */}
      <div 
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-6 w-[90%] md:w-[50%] lg:w-[40%] z-50 ${userDiv}`}>
        
        {/* Header */}
        <div className='flex items-center justify-between border-b pb-3'>
          <h1 className='text-2xl font-semibold text-gray-800'>User Information</h1>
          <button onClick={() => setuserDiv("hidden")} className='text-gray-600 hover:text-red-500 transition'>
            <RxCross1 size={24} />
          </button>
        </div>
        
        {/* User Details */}
        <div className='mt-4 space-y-3'>
          <div>
            <label className='text-gray-600 font-medium'>Username: </label>
            <span className='font-semibold text-gray-800'>{userDivData.username}</span>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Email: </label>
            <span className='font-semibold text-gray-800'>{userDivData.email}</span>
          </div>
          <div>
            <label className='text-gray-600 font-medium'>Address: </label>
            <span className='font-semibold text-gray-800'>{userDivData.address}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeUserData;