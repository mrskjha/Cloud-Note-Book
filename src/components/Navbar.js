import React, { useState, } from "react";
import { Link,useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-black border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
            CloudNotes
          </span>
        </Link>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <div className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-black ">
            <Link
              to="/"
              className=" block py-2 px-3 text-white bg-yellow-700 rounded md:bg-transparent md:text-yellow-700 md:p-0 dark:text-white md:dark:text-yellow-500"
              aria-current="page"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-700 md:p-0 dark:text-white md:dark:hover:text-yellow-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              About
            </Link>

            {/* Conditional rendering of login/logout buttons */}
            {!isLoggedIn ? (
              <form>
                <Link
                  to="/login"
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  SignUp
                </Link>
              </form>
            ) : (
              <>
                <button
                  onClick={handleLogout}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Logout
                  </button>
                  <button
                    className="rounded-full h-10 w-10 flex justify-center items-center bg-green-500"
                    onClick={() => navigate("/userprofile")} // Assuming `history` is available
                  >
                    <FaRegUserCircle className="text-white text-3xl" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
