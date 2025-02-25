import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { FaUserLarge, FaCheck } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { IoOpenOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import SeeUserData from './SeeUserData';

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState([]);
  const [Options, setOptions] = useState(-1);
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState(null);
  const [Value, setValue] = useState("");

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    let isMounted = true;
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-all-orders", { headers });
        if (isMounted) setAllOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
    
    return () => { isMounted = false; };
  }, []);

  const change = (e) => {
    setValue(e.target.value);
  };

  const submitChanges = async (orderId, currentStatus) => {
    if (Value === currentStatus) {
      toast.info("No changes detected");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/update-status/${orderId}`,
        { status: Value },
        { headers }
      );

      if (response.data.status === "Success") {
        setAllOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: Value } : order
          )
        );
        toast.success("Status Updated Successfully");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update status");
    }
  };

  return (
    <>
      {!AllOrders.length ? (
        <div className='h-[100%] flex w-full items-center justify-center'><Loader /></div>
      ) : (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            All Orders
          </h1>
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%]'><h1 className='text-center'>Sr.</h1></div>
            <div className='w-[40%] md:w-[22%]'><h1>Books</h1></div>
            <div className='w-0 md:w-[45%] hidden md:block'><h1>Description</h1></div>
            <div className='w-[17%] md:w-[9%]'><h1>Price</h1></div>
            <div className='w-[30%] md:w-[16%]'><h1>Status</h1></div>
            <div className='w-[10%] md:w-[5%]'><h1><FaUserLarge /></h1></div>
          </div>

          {AllOrders.map((item, i) => (
            <div key={item._id} className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer'>
              <div className='w-[3%]'><h1 className='text-center'>{i + 1}</h1></div>

              <div className='w-[40%] md:w-[22%]'>
                {item.book ? (
                  <Link to={`/view-book-details/${item.book._id}`} className='hover:text-blue-300'>
                    {item.book.title}
                  </Link>
                ) : (
                  <span className="text-red-500">No book data</span>
                )}
              </div>

              <div className='w-0 md:w-[45%] hidden md:block'>
                <h1>{item.book?.desc ? item.book.desc.slice(0, 50) : "No description available"}</h1>
              </div>

              <div className='w-[17%] md:w-[9%]'>{item.book ? `₹ ${item.book.price}` : "N/A"}</div>

              <div className='w-[30%] md:w-[16%]'>
                <h1 className='font-semibold'>
                  <button className='hover:scale-105 transition-all duration-300' onClick={() => {
                      setOptions(i);
                      setValue(item.status);
                  }}>
                    {item.status === "Order placed" ? (
                      <div className='text-yellow-500'>{item.status}</div>
                    ) : item.status === "Canceled" ? (
                      <div className='text-red-500'>{item.status}</div>
                    ) : (
                      <div className='text-green-500'>{item.status}</div>
                    )}
                  </button>
                  {Options === i && (
                    <div className='flex mt-2'>
                      <select className='bg-gray-800 text-white p-1 rounded' onChange={change} value={Value}>
                        {["Order placed", "Out for delivery", "Delivered", "Canceled"].map((status, idx) => (
                          <option key={idx} value={status}>{status}</option>
                        ))}
                      </select>
                      <button className='text-green-500 hover:text-pink-600 mx-2' onClick={() => { 
                        submitChanges(item._id, item.status); 
                        setOptions(-1);
                      }}>
                        <FaCheck />
                      </button>
                    </div>
                  )}
                </h1>
              </div>

              <div className='w-[10%] md:w-[5%]'>
                <button className='text-xl hover:text-orange-500' onClick={() => {
                  setUserDiv("fixed");
                  setUserDivData(item.user);
                }}>
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setUserDiv}
          />
      )}
    </>
  );
};

export default AllOrders;
