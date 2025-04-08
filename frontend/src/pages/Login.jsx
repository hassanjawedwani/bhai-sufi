import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import GoogleBtn from "../components/GoogleBtn";
import { default as axios } from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticationFailure,
  authenticationStart,
  authenticationSuccess,
} from "../redux/features/user/userSlice";

export default function Login() {
  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function submitHandler(e) {
    dispatch(authenticationStart());
    console.log("submitHandler"); // ! production
    e.preventDefault();
    const { email, password } = {
      email: formData.email.trim(),
      password: formData.password.trim()
    }
    console.log("email: ", email, ", password: ", password); // ! production
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      console.log("try response data", response.data); // ! production

      dispatch(
        authenticationSuccess({
          currentUser: response.data.user,
          message: response.data.message,
        })
      );
      setFormData(initialState);
      navigate("/");
    } catch (err) {
      console.log("Catch Error total: ", err); // ! production
      dispatch(authenticationFailure(err?.response?.data?.error || "An unexpected error occured"));
    }
  }

  function inputHandler(e) {
    console.log("inputhandler"); // ! production
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="w-full min-h-screen bg-gray-200 p-4 flex items-center justify-center md:items-start">
      <div className="max-w-sm bg-white shadow-lg rounded-lg p-4  md:my-8">
        <h1 className="text-2xl font-bold tracking-wide mb-3">Log in</h1>
        {user && user.error && (
          <div className="bg-red-300  p-2 text-center border">
            <b>{user.error}</b>
          </div>
        )}
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
              value={formData.email}
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
              value={formData.password}
              required
            />
          </div>
          <button
            type="submit"
            disabled={user.loading}
            className={`w-full mt-8 text-white  font-semibold p-2 rounded 
            ${
              user.loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600  hover:cursor-pointer hover:bg-blue-500"
            }`}
          >
            {user.loading ? "Processing..." : "Log in"}
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
