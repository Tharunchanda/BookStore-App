import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-recent-books");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching recent books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-2xl text-yellow-100 mb-4">Recently Added Books</h4>
      {!data && <div className="flex items-center justify-center my-8"><Loader/></div>}
      <div className="my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {data && data.map((items, i)=>
          <div key={i}>
            <BookCard data={items} />{" "}
            </div>
        )}
      </div>
    </div>
  );
};

export default RecentlyAdded;
