import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://cloudnotesbook.netlify.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Redirect
      localStorage.setItem("token", json.authtoken);
      alert("Account login Successfully ", "success");
      navigate("/");
    } else {
      alert("Invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-gray-500 text-black min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <h1 className="text-white font-bold text-3xl mb-5">Login your account</h1>
        <div className="px-6 py-8 bg-gray-400 rounded-md shadow-md text-black w-full">
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-black"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="name@gmail.com"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-black"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={onChange}
                value={credentials.password}
                placeholder="password"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                required
              />
            </div>
            <button
              type="submit"
              className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
