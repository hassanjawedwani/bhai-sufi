import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import GoogleBtn from "../components/GoogleBtn";

export default function Login() {
  const [formData, setFormData] = useState({});

  function submitHandler(e) {
    console.log("submitHandler"); // ! production
    e.preventDefault();
    const { email, password } = e.target.elements;
    console.log("email: ", email.value, ", password: ", password.value); // ! production
  }

  function inputHandler(e) {
    console.log("inputhandler"); // ! production
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    console.log(formData);
  }

  

  return (
    <div className="w-full min-h-screen bg-gray-200 p-4 flex items-center justify-center md:items-start">
      <div className="max-w-sm bg-white shadow-lg rounded-lg p-4  md:my-8">
        <h1 className="text-2xl font-bold tracking-wide mb-3">Log in</h1>
        <div className="bg-red-300  p-2 text-center border hidden">
          <b>error message here !</b>
        </div>
        <form className="text-lg" onSubmit={submitHandler}>
          <div className="mt-5">
            <label htmlFor="email" className="font-semibold">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="name@example.com"
              className="bg-gray-200 w-full mt-2 p-2 rounded"
              onChange={inputHandler}
              required
            />
          </div>
          <div className="mt-5">
            <label htmlFor="password" className="font-semibold">
              Your Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              className="bg-gray-200 w-full mt-2 p-2 rounded"
              onChange={inputHandler}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-8 bg-blue-600 text-white  font-semibold p-2 rounded hover:cursor-pointer hover:bg-blue-500"
          >
            Log in
          </button>
        </form>

        <div className="text-center pt-4">
          <Link
            to="/forgot-password"
            className="text-blue-700 hover:text-blue-500"
          >
            Forgotton Password?
          </Link>
        </div>

        <div className="text-center pt-4">
          <span className="text-gray-600 mr-1.5">Don't have Account?</span>
          <Link to="/signup" className="text-blue-700 hover:text-blue-500">
            SignUp
          </Link>
        </div>

        <div className="flex justify-between items-center space-x-4 my-5">
          <div className="border-t flex-grow border-gray-300 "></div>
          <div className="text-gray-600">or</div>
          <div className="border-t flex-grow border-gray-300"></div>
        </div>

        <GoogleBtn />
        
      </div>
    </div>
  );
}
