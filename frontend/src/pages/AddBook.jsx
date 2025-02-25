import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddBook = () => {
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
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value }); 
  };

  const submit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (Object.values(Data).some((val) => val.trim() === "")) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/add-book", 
        Data,
        { headers }
      );
      toast.success("Book added successfully:", response.data);
      setData({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
      }); 
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Failed to add book. Please try again.");
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Add Book
      </h1>
      <form onSubmit={submit} className="p-4 bg-zinc-800 rounded">
        {/* Image URL */}
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

        {/* Title */}
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

        {/* Author */}
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
          {/* Language */}
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

          {/* Price */}
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


        {/* Description */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 w-1/6 p-2 rounded text-white font-semibold hover:bg-green-500 transition-all duration-300 "
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
