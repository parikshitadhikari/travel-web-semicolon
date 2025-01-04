"use client";
import React, { useState } from "react";
import mockUsers from "../data/mockUsers";
import { toast } from "react-toastify";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const user = mockUsers.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      localStorage.setItem("userInfo", JSON.stringify(user));
      toast.success("User successfully logged in.");
    } else {
      toast.error("Invalid credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center z-10 relative min-h-[30vh]">
      <div className="bg-white w-[30rem] border-4 rounded-xl shadow-xl p-8 py-12">
        <form className="mx-auto space-y-6" onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <label className="block text-xl font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="username"
              className="mt-3 p-3 w-full bg-white border rounded-md focus:ring-blue-500 focus:border-blue-500 text-md"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-xl font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-3 p-3 w-full bg-white border rounded-md focus:ring-blue-500 focus:border-blue-500 text-md"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter your password."
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xl font-medium rounded-md py-3"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
