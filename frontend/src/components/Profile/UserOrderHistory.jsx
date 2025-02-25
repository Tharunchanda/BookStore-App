import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const headers = {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const response = await axios.get("http://localhost:1000/api/v1/get-order-history", { headers });
        setOrderHistory(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch order history");
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className='min-h-screen p-4 text-zinc-100 flex flex-col'>
      {!orderHistory ? (
        <div className='flex items-center justify-center flex-grow'>
          <Loader />
        </div>
      ) : orderHistory.length === 0 ? (
        <div className='flex flex-col items-center justify-center flex-grow text-center'>
          <h1 className='text-2xl md:text-5xl font-semibold text-zinc-500 mb-4'>No Order History</h1>
          <img src='https://cdn-icons-png.flaticon.com/128/9961/9961218.png' alt='No orders' className='h-32 md:h-40 mb-4' />
        </div>
      ) : (
        <div className='max-w-6xl mx-auto flex-grow'>
          <h1 className='text-xl md:text-4xl font-semibold text-zinc-500 mb-6 text-center md:text-left'>Your Order History</h1>
          
          <div className='bg-zinc-800 rounded-lg overflow-hidden shadow-md flex flex-col'>
            <div className='hidden md:flex bg-zinc-900 py-3 px-4 font-semibold text-zinc-300'>
              <div className='w-1/12 text-center'>#</div>
              <div className='w-3/12'>Books</div>
              <div className='w-4/12'>Description</div>
              <div className='w-2/12'>Price</div>
              <div className='w-2/12 text-center'>Status</div>
            </div>
            <div className='md:h-[70vh] h-[45vh] overflow-y-auto'>
              {orderHistory.map((order, index) => (
                <div key={order._id} className='flex flex-col md:flex-row items-start md:items-center bg-zinc-800 py-3 px-4 border-b border-zinc-700 hover:bg-zinc-900 transition text-sm md:text-base'>
                  <div className='w-full md:w-1/12 text-center font-medium text-zinc-300'>{index + 1}</div>
                  <div className='w-full md:w-3/12 mb-2 md:mb-0'>
                    <Link to={`/view-book-details/${order.book._id}`} className='text-zinc-400 hover:underline block'>
                      {order.book.title}
                    </Link>
                  </div>
                  <div className='w-full md:w-4/12 text-zinc-400 mb-2 md:mb-0'>{order.book.desc.slice(0, 50)}...</div>
                  <div className='w-full md:w-2/12 font-medium'>₹{order.book.price}</div>
                  <div className='w-full md:w-2/12 text-center font-semibold mt-2 md:mt-0'>
                    {order.status === "Order placed" ? (
                      <span className='text-yellow-500'>{order.status}</span>
                    ) : order.status === "Canceled" ? (
                      <span className='text-red-500'>{order.status}</span>
                    ) : (
                      <span className='text-green-500'>{order.status}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrderHistory;