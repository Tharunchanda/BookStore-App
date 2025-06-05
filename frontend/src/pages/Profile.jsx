import React, { useEffect, useState } from 'react'
import SideBar from '../components/Profile/SideBar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../components/Loader/Loader'
import MobileNav from '../components/Profile/MobileNav'

const Profile = () => {
  const backendURL = import.meta.env.VITE_API_URL;
  //const isLoggedIn = useSelector();
  const [Profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  console.log("backendURL:", backendURL);
  console.log("headers:", headers);
  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/v1/get-user-information`, { headers });
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  fetchData(); 

}, []); 

  
  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 text-white'>
      {!Profile && <div className='w-full h-screen flex items-center justify-center'><Loader /></div>}
      {Profile && <>
        <div className='w-full md:w-1/6 h-auto lg:h-screen'>
          <SideBar data={Profile} />
          <MobileNav/>
        </div>
      <div className='w-full md:w-5/6'><Outlet/> </div>
      </>}
    </div>
  )
}

export default Profile