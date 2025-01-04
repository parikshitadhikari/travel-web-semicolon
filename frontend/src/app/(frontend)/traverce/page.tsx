"use client";

import React, { useEffect, useState } from "react";
import SidebarDemo from "@/app/components/Sidebar";
import axios from "axios";
import { FocusCards } from "@/components/ui/focus-cards";

interface Card {
  title: string;
  src: string;
  price: number;
  description: string;
}

const Traverce: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [tripDetails, setTripDetails] = useState<Card[]>([]);

  const handleExplore = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/auth/traverse/");
      setTripDetails(response.data);
      console.log(tripDetails)
      setLoading(false); 
    } catch (error) {
      console.error("Error fetching trip details:", error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    handleExplore();
  }, []);

  return (
    <>
      <SidebarDemo />
      <div className="bg-gradient-to-br from-blue-500 to-blue-200 min-h-screen p-8">
        <h1 className="text-center text-white text-4xl font-bold mb-6">
          Travel Ecommerce
        </h1>
        {loading ? (
          <p className="text-center text-white">Loading destinations...</p>
        ) : tripDetails.length > 0 ? (
          <FocusCards cards={tripDetails} />
        ) : (
          <p className="text-center text-white">No items found.</p>
        )}
      </div>
    </>
  );
};

export default Traverce;
