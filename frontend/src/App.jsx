import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticationSuccess,
} from "./redux/features/user/userSlice";
import Navbar from "./components/Navbar";

export default function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {

    async function fetchUser() {
      console.log("useeffect inside app component to initialize redux store");
      try {
        const response = await axios.get("/api/auth/me", {
          withCredentials: true,
        });
        console.log("try response inside authme: ", response);
        const user = response?.data;
        console.log("try response inside authme, user id: ", user);
        dispatch(authenticationSuccess({ currentUser: user, message: null }));
      } catch (err) {
        const errorMessage = err?.response?.data?.error || "Some error occured";
        console.log("Catch error inside authme: ", errorMessage);
      }
    }
    if (!currentUser) {
      fetchUser();
    }

  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
