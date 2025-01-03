"use client";
import NavBar from "@/app/components/NavBar";
import { BackgroundBeams } from "@/components/ui/background-beams";
import React, { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = () => {
  const [formType, setFormType] = useState("login");

  return (
    <div className="relative min-h-screen bg-white">
      <div className="absolute inset-0 z-0">
        <BackgroundBeams />
      </div>

      {/* <NavBar /> */}

      <div className="flex justify-center pt-10 space-x-4 z-10 relative">
        <button
          onClick={() => setFormType("login")}
          className={`px-6 py-3 font-medium text-lg ${
            formType === "login" ? "bg-blue-500 text-white" : "bg-gray-200"
          } hover:bg-blue-600 rounded-md`}
        >
          Login
        </button>
        <button
          onClick={() => setFormType("signup")}
          className={`px-6 py-3 font-medium text-lg ${
            formType === "signup" ? "bg-blue-500 text-white" : "bg-gray-200"
          } hover:bg-blue-600 rounded-md text-black`}
        >
          Sign Up
        </button>
      </div>

      <div className="flex justify-center items-center mt-10 z-10 relative">
        {formType === "login" ? <Login /> : <SignUp />}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Auth;
