import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticationSuccess } from "../redux/features/user/userSlice";
import axios from "axios";

export default function Home() {
  const user = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.message) {
      const timer = setTimeout(() => {
        dispatch(
          authenticationSuccess({
            currentUser: currentUser,
            message: null,
          })
        );
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [user.message]);

  return (
    <div>
      {user.message && (
        <h1 className={`text-center text-2xl bg-green-600 mt-5`}>
          {user.message}
        </h1>
      )}
      <h1 className="text-2xl text-center">Home Page</h1>
      <br />
      {/* {currentUser &&  */}
        <h2 className="text-center text-2xl  mt-5">
          Hello {" "}
         <span className="font-bold italic bg-yellow-600">
           {currentUser ? currentUser.fullname : "unlogin person"}
          </span>
          </h2>
      {/* } */}
     
    </div>
  );
}
