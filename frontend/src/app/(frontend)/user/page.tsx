"use client";
import ProfilePageComponent from "@/app/components/profile/Profile";
import SidebarDemo from "@/app/components/Sidebar";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [userData, setUserData] = useState<any>({
    username: "",
    email: "",
    password: "",
    interests: [],
    mood: "",
  });

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const handleMoodChange = (mood: string) => {
    setUserData((prev: any) => ({ ...prev, mood }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-200 p-10">
      <SidebarDemo/>
      <ProfilePageComponent/>
      {/* Travel Quote
      <div className="flex justify-center items-center mb-12">
        <blockquote className="text-4xl italic font-bold text-white text-center max-w-3xl opacity-0 animate-fadeIn">
          "Traveling – it leaves you speechless, then turns you into a
          storyteller."
        </blockquote>
      </div>

      Profile and Mood Sections
      <div className="flex flex-col lg:flex-row justify-around items-start space-y-10 lg:space-y-0 lg:space-x-10">
        Profile Card 
        <div className="bg-white shadow-lg rounded-lg p-8 w-full lg:w-1/3 transform hover:scale-105 transition-transform duration-500 ease-in-out">
          <div className="flex flex-col items-center">
            <img
              src={"/images/logo-travel-web.png"}
              alt="Profile"
              className="rounded-full h-36 w-36 object-cover border-4 border-white shadow-md"
            />
            <h2 className="text-3xl font-bold mt-6 text-indigo-600 animate-fadeIn">
              {userData.username || "Traveler"}
            </h2>
            <p className="text-gray-600">
              {userData.email || "you@example.com"}
            </p>
          </div>

          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold text-indigo-500">
              What's your mood today?
            </h3>
            <div className="flex justify-center space-x-6 mt-4 animate-fadeIn">
              <button
                onClick={() => handleMoodChange("Happy")}
                className={`p-4 rounded-full ${
                  userData.mood === "Happy"
                    ? "bg-yellow-300 scale-110"
                    : "bg-gray-200"
                } transition-transform duration-300 ease-in-out hover:scale-110`}
              >
                😊
              </button>
              <button
                onClick={() => handleMoodChange("Adventurous")}
                className={`p-4 rounded-full ${
                  userData.mood === "Adventurous"
                    ? "bg-green-300 scale-110"
                    : "bg-gray-200"
                } transition-transform duration-300 ease-in-out hover:scale-110`}
              >
                🧗‍♂️
              </button>
              <button
                onClick={() => handleMoodChange("Relaxed")}
                className={`p-4 rounded-full ${
                  userData.mood === "Relaxed"
                    ? "bg-blue-300 scale-110"
                    : "bg-gray-200"
                } transition-transform duration-300 ease-in-out hover:scale-110`}
              >
                😌
              </button>
            </div>
            <p className="text-gray-500 mt-4">
              Current Mood:{" "}
              <span className="font-semibold">
                {userData.mood || "Not Selected"}
              </span>
            </p>
          </div>
        </div>

        Interests and About Me Sections
        <div className="bg-white shadow-lg rounded-lg p-8 w-full lg:w-2/3 space-y-10">
          Interested Places
          <div className="animate-slideInRight">
            <h3 className="text-2xl font-bold text-indigo-500">
              Places I'm Interested In
            </h3>
            <ul className="list-disc list-inside mt-4 text-gray-600">
              {userData.interests.length > 0 ? (
                userData.interests.map((interest: string, index: number) => (
                  <li key={index} className="text-lg">
                    {interest}
                  </li>
                ))
              ) : (
                <p className="text-gray-400">
                  You haven't added any places yet. Explore the world!
                </p>
              )}
            </ul>
          </div>

          About Me Section
          <div className="animate-slideInLeft">
            <h3 className="text-2xl font-bold text-indigo-500">About Me</h3>
            <p className="text-lg text-gray-600 mt-4">
              I'm a passionate traveler who loves exploring new places and
              cultures. I enjoy hiking, photography, and meeting new people
              along the way. Whether it's scaling mountains or relaxing by the
              beach, every adventure is a new story waiting to be told. Let's
              connect and explore the world together!
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ProfilePage;
