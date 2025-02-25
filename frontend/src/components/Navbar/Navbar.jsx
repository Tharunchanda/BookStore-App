import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import {authActions} from "../store/auth.js";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const links = useMemo(() => {
  if (isLoggedIn) {
    return role === "admin"
      ? [
          { title: "Home", link: "/" },
          { title: "All Books", link: "/all-books" },
          { title: "Cart", link: "/cart" },
          { title: "Admin Profile", link: "/profile" }, 
        ]
      : [
          { title: "Home", link: "/" },
          { title: "All Books", link: "/all-books" },
          { title: "Cart", link: "/cart" },
          { title: "Profile", link: "/profile" },
        ];
  }
  
  return [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
  ];
}, [isLoggedIn, role]); 

  const toggleMobileNav = () => setIsMobileNavOpen((prev) => !prev);

  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        {/* Logo */}
        <Link to={"/"} className="flex">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">BookStore</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-x-6 ml-auto">
          <div className="flex gap-x-4">
            {links.map((item, i) => (
              <div className="flex items-center justify-center">
                {item.title === "Profile" || item.title === "Admin Profile" ? (
                  <Link
                  to={item.link}
                  className="px-6 py-2 text-white border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 text-center"
                  key={i}
                >
                  {item.title}
                </Link>
                ):(<Link
                  to={item.link}
                  className="hover:text-blue-500 transition-all duration-300"
                  key={i}
                >
                  {item.title}
                </Link>)}
              </div>
            ))}
          </div>
          {!isLoggedIn && <AuthButtons />}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl hover:text-zinc-400 transition-all duration-300"
          onClick={toggleMobileNav}
        >
          <FaGripLines />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileNavOpen && (
        <div className="fixed bg-zinc-900 h-screen w-full top-0 left-0 z-50 flex flex-col items-center justify-center">
          <button
            className="absolute top-6 right-6 text-white text-3xl hover:text-zinc-400 transition-all duration-300"
            onClick={toggleMobileNav}
          >
            <IoClose />
          </button>

          {/* Navigation Links */}
          {links.map((item, i) => (
            <Link
              to={item.link}
              className="text-white text-3xl m-2 font-semibold hover:text-blue-500 transition-all duration-300"
              key={i}
              onClick={toggleMobileNav}
            >
              {item.title}
            </Link>
          ))}

          {/* Auth Buttons in Mobile Menu */}
          {!isLoggedIn && (
            <div className="flex flex-col gap-4 mt-6">
              <Link
                to={"/login"}
                className="px-6 py-2 text-white border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 text-center"
                onClick={toggleMobileNav}
              >
                Login
              </Link>
              <Link
                to={"/sign-up"}
                className="px-6 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 text-center"
                onClick={toggleMobileNav}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const AuthButtons = ({ onClick }) => (
  <>
    <Link
      to={"/login"}
      className="px-6 py-2 text-white border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
      onClick={onClick}
    >
      Login
    </Link>
    <Link
      to={"/sign-up"}
      className="px-6 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
      onClick={onClick}
    >
      Sign Up
    </Link>
  </>
);

export default Navbar;
