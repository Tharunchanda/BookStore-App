import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn == false) {
    links.splice(2, 2);
  }
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <Link to={"/"} className="flex">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">BookStore</h1>
        </Link>
        <div className="hidden md:flex gap-4 items-center">
          {links.map((item, i) => (
            <Link
              to={item.link}
              className="hover:text-blue-500 transition-all duration-300"
              key={i}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex gap-4">
          <Link
            to={"/login"}
            className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to={"/sign-up"}
            className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            Sign Up
          </Link>
        </div>
        <button
          className="md:hidden text-white text-2xl hover:text-zinc-400 transition-all duration-300"
          onClick={() => setIsMobileNavOpen(true)}
        >
          <FaGripLines />
        </button>
      </nav>
      {isMobileNavOpen && (
        <div className="fixed bg-zinc-900 h-screen w-full top-0 left-0 z-50 flex flex-col items-center justify-center">
          <button
            className="absolute top-6 right-6 text-white text-3xl hover:text-zinc-400 transition-all duration-300"
            onClick={() => setIsMobileNavOpen(false)}
          >
            <IoClose />
          </button>
          {links.map((item, i) => (
            <Link
              to={item.link}
              className="text-white text-3xl m-2 font-semibold hover:text-blue-500 transition-all duration-300"
              key={i}
              onClick={() => setIsMobileNavOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          <Link
            to={"/login"}
            className="px-6 py-2 m-2 text-white border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
            onClick={() => setIsMobileNavOpen(false)}
          >
            Login
          </Link>
          <Link
            to={"/sign-up"}
            className="px-6 py-2 m-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
            onClick={() => setIsMobileNavOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
