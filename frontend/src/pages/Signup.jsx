import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import GoogleBtn from "../components/GoogleBtn";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticationFailure,
  authenticationStart,
  authenticationSuccess,
} from "../redux/features/user/userSlice";

export default function Signup() {
  const initialForm = {
    fullname: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialForm);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.error) {
      const timer = setTimeout(() => {
        dispatch(authenticationFailure(null));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [user.error]);

  async function submitHandler(e) {
    dispatch(authenticationStart());
    console.log("submitHandler"); // ! production
    e.preventDefault();
    const { fullname, email, password } = formData;
    console.log(
      "fullname: ",
      fullname,
      "email: ",
      email,
      ", password: ",
      password
    ); // ! production

    try {
      let response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      console.log("data: ", data); // ! production
      dispatch(authenticationSuccess({ currentUser : data.user, message: data.message }));
      setFormData(initialForm);
      navigate("/");
    } catch (err) {
      dispatch(authenticationFailure(err.message));
      console.log("error: ", err.message);
    }
  }

  function inputHandler(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="w-full min-h-screen bg-gray-200 p-4 flex items-center justify-center md:items-start">
      <div className="max-w-sm bg-white shadow-lg rounded-lg p-4  md:my-8">
        <h1 className="text-2xl font-bold tracking-wide mb-3">Sign Up</h1>
        {user && user.error && (
          <div className="bg-red-300  p-2 text-center border">
            <b>{user.error}</b>
          </div>
        )}
        <form className="text-lg" onSubmit={submitHandler}>
          <div className="mt-5">
            <label htmlFor="fullname" className="font-semibold">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="e.g. John Snow"
              className="bg-gray-200 w-full mt-2 p-2 rounded"
              value={formData.fullname}
              onChange={inputHandler}
              required
            />
          </div>
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
              value={formData.email}
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
              value={formData.password}
              onChange={inputHandler}
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
            {user.loading ? "Processing..." : "Create Account"}
          </button>
        </form>

        <div className="text-center pt-4 mt-3">
          <span className="text-gray-600 mr-1.5">Have an Account?</span>
          <Link to="/login" className="text-blue-700 hover:text-blue-500">
            Log in
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
