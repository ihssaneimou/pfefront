import React from "react";
import logo from "../assets/fsac.png";
import axios from "axios";
const Navbar = () => {
  const handleLogout = async () => {
    try {
      
      localStorage.removeItem("token");
      await axios.post("http://localhost:8000/api/logout");

      window.location.href = "/login";
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-circle swap swap-rotate drawer-button lg:hidden"
        >
          <input type="checkbox" />

          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>

        <a href="/home" className="logo-link cursor-pointer ml-16">
          <img src={logo} alt="Logo" className="logo w-1/4" />
        </a>
      </div>
      <div className="flex-none gap-2">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <button className="w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none" onClick={handleLogout}>
          Deconnexion
        </button>
      </div>
    </div>
  );
};

export default Navbar;