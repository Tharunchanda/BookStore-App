import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart, FaEdit } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
        toast.error("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [id]); 

  const headers = {
    "id": localStorage.getItem("id"),
    "authorization": `Bearer ${localStorage.getItem("token")}`,
    "bookid": id,
  };

  const handleFavourite = async () => {
    if (!isLoggedIn) {
      toast.error("You need to log in to add favorites.");
      return;
    }
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-book-to-favourites",
        {},
        { headers }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding book to favorites");
    }
  };

  const handleCart = async () => {
    if (!isLoggedIn) {
      toast.error("You need to log in to add to the cart.");
      return;
    }
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-to-cart",
        {},
        { headers }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding book to cart");
    }
  };

  const handleDelete = async () => {
    if (role !== "admin") return;
    try {
      await axios.delete(`http://localhost:1000/api/v1/delete-book`, { headers });
      toast.success("Book deleted successfully!");
      navigate("/all-books");
    } catch (error) {
      toast.error("Error deleting book!");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : data && Object.keys(data).length > 0 ? (
        <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start'>
          <div className='w-full lg:w-3/6 '>
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-around bg-zinc-800 p-6 md:p-10 lg:p-12 rounded-lg gap-8">
              <img
                src={data.url}
                alt="Book img"
                className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded-lg object-cover shadow-lg"
              />
              {isLoggedIn && role === "user" && (
                <div className="flex flex-row lg:flex-col items-center justify-center lg:justify-start gap-6">
                  <button className="bg-white text-red-600 rounded-full p-3 text-2xl flex items-center justify-center shadow-md transition-transform hover:scale-105"
                    onClick={handleFavourite}>
                    <FaHeart />
                    <span className="ml-4 block lg:hidden text-sm font-medium">Favourites</span>
                  </button>
                  <button className="bg-blue-500 text-white rounded-full p-3 text-2xl flex items-center justify-center shadow-md transition-transform hover:scale-105"
                    onClick={handleCart}>
                    <FaShoppingCart />
                    <span className="ml-4 block lg:hidden text-sm font-medium">Add to Cart</span>
                  </button>
                </div>
              )}
              {isLoggedIn && role === "admin" && (
                <div className="flex flex-row lg:flex-col items-center justify-center lg:justify-start gap-6">
                    <Link
                      to={`/updateBook/${id}`}
                      className="bg-yellow-500 text-white rounded-full p-3 text-2xl flex items-center justify-center shadow-md transition-transform hover:scale-105"
                    >
                    <FaEdit />
                    <span className="ml-4 block lg:hidden text-sm font-medium">Edit Book</span>
                  </Link>
                  <button className="bg-red-500 text-white rounded-full p-3 text-2xl flex items-center justify-center shadow-md transition-transform hover:scale-105"
                    onClick={handleDelete}>
                    <MdOutlineDelete />
                    <span className="ml-4 block lg:hidden text-sm font-medium">Delete Book</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className='p-4 w-full lg:w-3/6'>
            <h1 className='text-4xl text-zinc-300 font-semibold'>{data.title}</h1>
            <p className='text-zinc-400 mt-1'>by {data.author}</p>
            <p className='text-zinc-500 mt-4 text-lg'>{data.desc}</p>
            <p className='flex mt-4 items-center justify-start text-zinc-400'>
              <GrLanguage className='me-3' />{data.language}
            </p>
            <p className="mt-2 text-green-400 font-semibold text-xl">₹ {data.price}</p>
          </div>
        </div>
      ) : (
        <p className="text-red-500 text-center text-xl">Book not found!</p>
      )}
    </>
  );
}

export default ViewBookDetails;
