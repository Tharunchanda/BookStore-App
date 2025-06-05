import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const backendURL = import.meta.env.VITE_API_URL;
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [Cart, setCart] = useState([]); 
  const [Total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(`${backendURL}/api/v1/get-user-cart`, { headers });
        setCart(response.data.data);
      } catch (error) {
        toast.error(error.message || "Error fetching cart");
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    const total = Cart.reduce((acc, item) => acc + item.price, 0);
    setTotal(total);
  }, [Cart]);

  const deleteItem = async (bookid) => {
    try {
      await axios.put(`${backendURL}/api/v1/remove-from-cart/${bookid}`, {}, { headers });
      toast.success("Item removed from cart");
      setCart((prevCart) => prevCart.filter(item => item._id !== bookid));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error removing item");
    }
  };

  const PlaceOrder = async () => {
    try {
      await axios.post(`${backendURL}/api/v1/place-order`, { order: Cart }, { headers });
      toast.success("Order placed successfully");
      navigate('/profile/orderHistory');
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className='bg-zinc-900 px-4 md:px-12 min-h-screen py-8'>
      {loading ? (
        <div className='h-screen flex items-center justify-center'>
          <Loader />
        </div>
      ) : Cart.length === 0 ? (
        <div className='h-screen flex flex-col items-center justify-center text-center'>
          <h1 className='text-4xl lg:text-6xl font-semibold text-zinc-400 mb-4'>Empty Cart</h1>
          <img src="/empty-cart.png" alt="empty cart" className='w-64 md:w-96' />
        </div>
      ) : (
        <div>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Your Cart</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {Cart.map((item) => (
              <div key={item._id} className='bg-zinc-800 rounded-lg p-4 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4'>
                <img src={item.url} alt={item.title} className='w-32 h-32 object-cover rounded' />
                <div className='flex flex-col flex-1'>
                  <h2 className='text-xl font-semibold text-zinc-100'>{item.title}</h2>
                  <p className='text-sm text-zinc-400 hidden sm:block'>{item.desc.slice(0, 100)}...</p>
                  <div className='flex justify-between items-center mt-2'>
                    <span className='text-xl font-bold text-zinc-200'>₹ {item.price}</span>
                    <button className='bg-red-500 text-white p-2 rounded' onClick={() => deleteItem(item._id)}>
                      <AiFillDelete className='w-6 h-6' />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && Cart.length > 0 && (
        <div className='fixed bottom-0 left-0 w-full bg-zinc-800 py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center shadow-lg'>
          <div className='text-xl font-semibold text-zinc-200'>Total: ₹ {Total}</div>
          <button className='mt-3 md:mt-0 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-700 transition' onClick={PlaceOrder}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;