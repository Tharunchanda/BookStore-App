import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-favourite-books", { headers });
        setFavouriteBooks(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch favorite books");
      }
    };
    fetchFavourites();
  }, []);

  // Function to update state when a book is removed
  const handleRemoveFavourite = (bookId) => {
    setFavouriteBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
  };

  return (
    <>
      {FavouriteBooks && FavouriteBooks.length === 0 &&
        <div className="text-5xl font-sem
        ibold h-[100%] text-zinc-500 flex items-center justify-center flex-col">
          No Favourite Books
          <img src="./bookmark.png" alt="star" className="h-[20vh] my-8"/>
        </div>}
      <div className="grid grid-cols-4">
      {FavouriteBooks.map((book) => (
        <div key={book._id}>
          <BookCard data={book} favourite={true} onRemove={handleRemoveFavourite} />
        </div>
      ))}
    </div>
    </>
    
  );
};

export default Favourites;
