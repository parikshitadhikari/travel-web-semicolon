"use client";
import React, { useEffect, useState } from "react";
import SidebarDemo from "@/app/components/Sidebar";
import axios from "axios";
import { FocusCards } from "@/components/ui/focus-cards";

interface Destination {
  id: number;
  name: string;
  description: string; // This can still be kept if you want it for any other purpose
}

const Traverce: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestinationId, setSelectedDestinationId] = useState<
    number | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>({
    username: "",
    email: "",
    password: "",
    interests: [],
    mood: "",
  });
  const [tripDetails, setTripDetails] = useState<string | null>(null); // Change type to string

  useEffect(() => {
    const storedData = localStorage.getItem("userInfo");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const username = userData?.username;

  // useEffect(() => {
  //   const fetchDestinations = async () => {
  //     if (!username) {
  //       console.error("Username not found");
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const response = await axios.get(
  //         `http://127.0.0.1:8000/auth/travellers/${username}/`
  //       );
  //       setDestinations(response.data.selected_destinations);
  //     } catch (error) {
  //       console.error("Error fetching destinations:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDestinations();
  // }, [username]);

  const handleExplore = async (destinationId: number) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/traverse/",
        { id: destinationId }
      );
      setTripDetails(response.data); // Store the trip details from the response
    } catch (error) {
      console.error("Error fetching trip details:", error);
    }
  };

  const handleDestinationSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const destinationId = parseInt(e.target.value);
    setSelectedDestinationId(destinationId);
    setTripDetails(null); // Reset trip details when a new destination is selected
    handleExplore(destinationId); // Call API when destination is selected
  };

  const renderTripDetails = (details: string) => {
    // Split the details string into an array based on newline characters
    const items = details.split("\n").filter((item) => item.trim() !== "");

    return (
      <ul className="list-disc pl-6">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700 list-none mb-3">
            {item.trim()}
          </li>
        ))}
      </ul>
    );
  };

  const cards = [
    {
      title: "Forest Adventure",
      src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 1000,
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis vero, maxime at odit impedit dolores quibusdam quae illo eveniet dolorem, consectetur suscipit tempore odio rem est nemo cupiditate. Doloribus, tenetur?",
    },
  ];

  return (
    <>
      <SidebarDemo />
      <div className="bg-gradient-to-br from-blue-500 to-blue-200 min-h-screen p-8">
        <h1 className="text-center text-white text-4xl font-bold mb-6">
          Explore Your Destination
        </h1>
        <div>
          <FocusCards cards={cards} />
          <p className="text-center">No destination found.</p>
        </div>
      </div>
    </>
  );
};

export default Traverce;
