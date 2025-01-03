"use client";
import React, { useEffect, useState } from "react";
import SidebarDemo from "@/app/components/Sidebar";
import axios from "axios";

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

  useEffect(() => {
    const fetchDestinations = async () => {
      if (!username) {
        console.error("Username not found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/auth/travellers/${username}/`
        );
        setDestinations(response.data.selected_destinations);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [username]);

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

  return (
    <>
      <SidebarDemo />
      <div className="bg-gradient-to-br from-blue-500 to-blue-200 min-h-screen p-8">
        <h1 className="text-center text-white text-4xl font-bold mb-6">
          Explore Your Destination
        </h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : destinations.length > 0 ? (
          <div className="destination-selector bg-white rounded-lg shadow-lg p-6 m-4 max-w-md mx-auto">
            <h2 className="text-xl font-semibold">Select a Destination</h2>
            <select
              onChange={handleDestinationSelect}
              value={selectedDestinationId ?? ""}
              className="mt-2 bg-gray-100 p-2 rounded w-full"
            >
              <option value="" disabled>
                -- Select a Destination --
              </option>
              {destinations.map((destination) => (
                <option key={destination.id} value={destination.id}>
                  {destination.name}
                </option>
              ))}
            </select>
            {tripDetails && ( // Display trip details as bullet points
              <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
                <h4 className="font-semibold text-lg mb-5">Trip Requirements:</h4>
                {renderTripDetails(tripDetails)}
              </div>
            )}
          </div>
        ) : (
          <p className="text-center">No destination found.</p>
        )}
      </div>
    </>
  );
};

export default Traverce;
