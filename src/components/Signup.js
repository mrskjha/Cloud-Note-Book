import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Home } from "./Home";

const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirm_password) {
      alert("Passwords do not match");
      return;
    }
    const response = await fetch("https://cloudnotesbook.netlify.app/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Redirect
      localStorage.setItem("token", json.authtoken);
      setLoggedIn(true);
      navigate("/");
      alert("Account Creted Successfully ","suceess");
    } else {
      alert("Signup failed. Please try again.","danger");
    }
  };

  const onChange = (e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
  };

  if (loggedIn) {
    return <Home to="/" />;
  }

  return (
    <div className="bg-gray-500 text-black min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="px-6 py-8 bg-gray-400 rounded-md shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="name"
            id="name"
            placeholder="Full Name"
            onChange={onChange}
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            id="email"
            placeholder="Email"
            onChange={onChange}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            id="password"
            placeholder="Password"
            onChange={onChange}
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            id="confirm_password"
            placeholder="Confirm Password"
            onChange={onChange}
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-500 focus:outline-none my-1"
            onClick={handleSubmit}
          >
            Create Account
          </button>

          <div className="text-center text-sm text-black mt-4">
            By signing up, you agree to the
            <Link className="no-underline border-b border-black text-black" to="/">
              Terms of Service
            </Link>{" "}
            and
            <Link className="no-underline border-b border-black text-black" to="/">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="text-grey-dark mt-6 ">
          Already have an account?
          <Link
            className="no-underline bg-green-500 ml-3 text-black hover:bg-green-600 rounded-sm px-3 py-1 font-semibold"
            to="/login"
          >
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default Signup;
