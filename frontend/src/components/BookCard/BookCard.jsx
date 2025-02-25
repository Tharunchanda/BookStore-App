import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const BookCard = ({ data, favourite, onRemove }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.put("http://localhost:1000/api/v1/remove-book-from-favourites", {}, { headers });
      toast.success(response.data.message);
      if (onRemove) onRemove(data._id); 
    } catch (error) {
      toast.error("Failed to remove book from favourites");
    }
  };

  return (
    <div className="bg-zinc-900 rounded p-1 flex flex-col">
      <Link to={`/view-book-details/${data._id}`} className="block transition-transform transform hover:scale-105">
        <div className="bg-zinc-800 rounded-lg p-4 flex flex-col shadow-lg hover:shadow-xl">
          <div className="rounded-lg flex items-center justify-center overflow-hidden">
            <img src={data.url} alt={data.title} className="h-[25vh] object-cover rounded-lg" loading="lazy" />
          </div>
          <h2 className="mt-4 text-lg text-zinc-100 font-semibold truncate">{data.title}</h2>
          <p className="mt-2 text-zinc-400 font-medium">by {data.author}</p>
          <p className="mt-2 text-green-400 font-semibold">₹ {data.price}</p>
        </div>
      </Link>
      {favourite && (
        <button
          className="m-2 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4 hover:bg-yellow-500 transition-all duration-200 hover:text-zinc-900"
          onClick={handleRemoveBook}
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;
