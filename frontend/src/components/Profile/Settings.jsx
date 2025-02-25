import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';

const Settings = () => {
  const [Value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState()  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  const change = (e) => {
    const { name, value } = e.target;
    setValue({...Value, [name]: value })
  };
  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:1000/api/v1/get-user-information", { headers });
      setProfileData(response.data);
      setValue({ address: response.data.address });
      
    } catch (error) {
      toast.error("Error fetching user information:", error);
    }
  };

  fetchData(); 

  }, []); 
  const submitAddress = async () => {
    const response = await axios.put("http://localhost:1000/api/v1/update-address", Value, { headers });
    toast.success("Updated Successfully!");
  }

  return (
    <>
      {!ProfileData && <div className='flex h-[100%] w-full items-center justify-center'><Loader /></div>}
      {ProfileData && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            Settings
          </h1>
          <div className='flex gap-12'>
            <div>
              <label htmlFor="">Username</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                {ProfileData.username}
              </p>
            </div>
            <div className=''>
              <label htmlFor="">Email</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                {ProfileData.email}
              </p>
            </div>
            </div>
            <div className='mt-4 flex flex-col'>
              <label htmlFor="">Address</label>
            <textarea
              className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
              rows="5"
              placeholder='Address'
              name='address'
              value={Value.address}
              onChange={change}
            >
                {ProfileData.address}
              </textarea>
            </div>
             <div className='mt-4 flex justify-end'>
              <button className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 ' onClick={submitAddress}>
                Update
              </button>
            </div>
        </div>
      )}
    </>
    
  )
}

export default Settings