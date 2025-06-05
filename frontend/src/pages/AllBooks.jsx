import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';

const AllBooks = () => {
  const backendURL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/v1/get-all-books`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching recent books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="bg-zinc-900 h-auto px-12 py-8">
      <h4 className="text-3xl text-yellow-100 mb-4">All Books</h4>

      {loading ? (
        <div className="flex items-center h-screen justify-center my-8">
          <Loader />
        </div>
      ) : data.length === 0 ? (
        <p className="text-center text-gray-400">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((item, i) => (
            <BookCard key={i} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
