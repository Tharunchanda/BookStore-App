import React, { useState, useEffect } from "react";
import axios from "axios";

const RecentlyAdded = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-recent-books");
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching recent books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-2xl text-yellow-100 mb-4">Recently Added Books</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.length > 0 ? (
          data.map((book) => (
            <div key={book._id} className="bg-zinc-800 p-4 rounded-lg shadow-lg">
              <img src={book.coverImage} alt={book.title} className="w-full h-40 object-cover rounded" />
              <h5 className="text-lg text-white mt-2">{book.title}</h5>
              <p className="text-sm text-gray-400">{book.author}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No recent books available.</p>
        )}
      </div>
    </div>
  );
};

export default RecentlyAdded;
