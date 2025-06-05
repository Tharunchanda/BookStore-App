import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const backendURL = import.meta.env.VITE_API_URL; // <-- Vite style

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/v1/get-recent-books`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching recent books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [backendURL]);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-2xl text-yellow-100 mb-4">Recently Added Books</h4>
      {loading ? (
        <div className="flex items-center h-screen justify-center my-8"><Loader/></div>
      ) : (
        <div className="my-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {data && data.length > 0 ? data.map((item) =>
            <div key={item._id || item.id}>
              <BookCard data={item} />
            </div>
          ) : (
            <div className="col-span-full text-center text-gray-400">No recent books found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentlyAdded;
