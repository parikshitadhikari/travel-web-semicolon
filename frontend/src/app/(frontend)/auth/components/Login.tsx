"use client";
import React, { useState } from "react";
import mockUsers from "../data/mockUsers";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter()

  // const handleFormSubmit = (e: any) => {
  //   e.preventDefault();
  //   const user = mockUsers.find(
  //     (user) => user.email === email && user.password === password
  //   );
  //   if (user) {
  //     localStorage.setItem("userInfo", JSON.stringify(user));
  //     router.push("/community-post");
  //     toast.success("User successfully logged in.");
  //   } else {
  //     toast.error("Invalid credentials.");
  //   }
  // };
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send a request to the backend for authentication
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/travellers/login/", // Update with your actual login endpoint
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response)
      // Assuming the backend sends user data (like token, user info)
      if (response.data) {
        // Save user info to localStorage or sessionStorage (or use context for global state)
        localStorage.setItem("userInfo", JSON.stringify(response.data));

        // Redirect user to community post page
        router.push("/community-post");
        toast.success("User successfully logged in.");
      }
    } catch (error: any) {
      console.log(error)
      // Log error and show a friendly message to the user
      console.error("Login error:", error);
      toast.error("Invalid credentials or something went wrong.");
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
