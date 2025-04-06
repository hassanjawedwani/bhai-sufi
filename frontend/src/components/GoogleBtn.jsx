import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleBtn() {
  function googleHandler() {
    console.log("googleHandler"); // ! production
  }

  return (
    <button
      type="button"
      className="bg-gray-300 w-full p-2 flex flex-row justify-center items-center gap-2 font-semibold mt-5 hover:bg-gray-200"
      onClick={googleHandler}
    >
      <FcGoogle className="text-2xl" />
      <span>Continue with Google</span>
    </button>
  );
}
