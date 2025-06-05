import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdateBook = () => {
  const backendURL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth?.role || "user");
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:id,
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/v1/get-book-by-id/${id}`);
        if (response.data && response.data.data) {
          setData(response.data.data);
        } else {
          toast.error("Book details not found!");
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
        toast.error("Failed to load book details.");
      }
    };

    fetchBookDetails();
  }, [id]);

  

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (role !== "admin") {
      toast.error("Only admins can update books!");
      return;
    }

    if (Object.entries(Data).every(([key, val]) => val.trim() === "")) {
      toast.error("All fields are required!");
      return;
    }


    try {
      await axios.put(`${backendURL}/api/v1/update-book`, Data, { headers });
      toast.success("Book updated successfully!");
      navigate(`/view-book-details/${id}`);
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error(error.response?.data?.message || "Failed to update book. Please try again.");
    }
  };

  return (
    <div className="bg-zinc-900 h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Update Book
      </h1>
      <form onSubmit={submit} className="p-4 bg-zinc-800 rounded">
        <div className="mb-4">
          <label className="text-zinc-400">Image URL</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="URL of image"
            name="url"
            value={Data.url}
            onChange={change}
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-zinc-400">Title</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Book title"
            name="title"
            value={Data.title}
            onChange={change}
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-zinc-400">Author</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Author name"
            name="author"
            value={Data.author}
            onChange={change}
            required
          />
        </div>

        <div className="flex gap-x-4 w-full">
          <div className="mb-4 w-1/2">
            <label className="text-zinc-400">Language</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Book language"
              name="language"
              value={Data.language}
              onChange={change}
              required
            />
          </div>

          <div className="mb-4 w-1/2">
            <label className="text-zinc-400">Price (₹)</label>
            <input
              type="number"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Price of Book"
              name="price"
              value={Data.price}
              onChange={change}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-zinc-400">Description</label>
          <textarea
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Short description about the book"
            name="desc"
            value={Data.desc}
            onChange={change}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 w-1/6 p-2 rounded text-white font-semibold hover:bg-blue-500 transition-all duration-300"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
