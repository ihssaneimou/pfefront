import React from "react";
import logo from "../assets/fsac.png";
import pic from "../assets/OIP.jpeg";
import axios from "axios";
import { useToken } from "../App"; // Assuming useToken is defined and provides token management
import './Navbar.css'; // Import custom CSS for styling

const Navbar = () => {
  const { token, setToken } = useToken();

  const handleLogout = async () => {
    try {
      if (!token) {
        throw new Error("No token found");
      }

      // Log token to verify it's retrieved correctly
      console.log("Token before logout:", token);

      // Set the Authorization header and send the logout request
      const response = await axios.post(
        "http://localhost:8000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Logout response:", response.data); // Log the response from the server

      // Remove the token from both localStorage and context state
      setToken(null);

      // Redirect to the login page
      window.location.href = "/authentification";
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
      alert("Une erreur est survenue lors de la déconnexion. Veuillez réessayer.");
    }
  };

  return (
    <nav className="navbar bg-[#3182ce] text-gray-100 px-6 py-4 shadow-md flex justify-between items-center ">
      <div className="flex items-center">
        {/* <label
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
        </label> */}

        <a href="/home" className="ml-4 lg:ml-16">
          <img src={logo} alt="Logo" className="w-24 lg:w-32" />
        </a>
      </div>
      <div className="flex items-center gap-6">
        <button className="btn btn-ghost btn-circle text-white hover:text-gray-600">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
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
        <button
          className="btn px-6 py-3 rounded-md bg-red-700 text-white hover:bg-red-600 focus:outline-none transition duration-200"
          onClick={handleLogout}
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
