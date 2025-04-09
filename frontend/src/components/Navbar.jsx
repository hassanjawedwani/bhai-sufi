import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { authenticationLogout } from "../redux/features/user/userSlice";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      console.log("logout handler");
      await axios.post("/api/auth/logout", { withCredentials: true });
      dispatch(authenticationLogout());
      navigate("/");
    } catch (err) {
      console.log(err);
      console.log("nabar catch error: ", err.message);
    }
  };

  const { currentUser } = useSelector((state) => state.user);
  return (
    <nav>
      <div className="flex justify-between py-1 px-2 shadow-md">
        <Link to="/">
          <h1 className="text-2xl font-bold text-slate-800">Wani</h1>
        </Link>
        <div className="text-lg font-semibold flex gap-5">
          {currentUser ? (
            <button onClick={logoutHandler}>Logout</button>
          ) : (
            <>
              <Link to="/signup">Signup</Link>
              <Link to="/Login">Login</Link>
            </>
          )}
        </div>
      </div>
      <div></div>
    </nav>
  );
}
