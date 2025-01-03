"use client";
import React, { useState, useEffect } from "react";
import ItenariesCard from "./ItenariesCard";
import "@mantine/core/styles.css";
import { Carousel } from "@mantine/carousel";
import mockPlaces from "../data/mockPlaces";

interface Label {
  id: number;
  name: string;
}

interface Place {
  id: number;
  label: Label[];
  interested_users: string[];
  name: string;
  img: string;
  price: number;
  description: string;
  business: number;
  guide: number;
}

const parseMinBudget = (budget: number) => {
  return budget;
};
const fetchPlaces = async (): Promise<Place[]> => {
  try {
    const response = await fetch("http://127.0.0.1:8000/auth/destination");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
};

const getTopLowBudgetPlaces = (places: Place[]) => {
  // Sort places by price in ascending order
  const sortedPlaces = places.sort((a, b) => a.price - b.price);

  // Return top 5 low-budget places
  return sortedPlaces.slice(0, 5);
};

const LowBudget = () => {
  const [lowBudgetPlaces, setLowBudgetPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const loadLowBudgetPlaces = async () => {
      const places = await fetchPlaces();
      const topLowBudgetPlaces = getTopLowBudgetPlaces(places); // Get top 5 low-budget places
      setLowBudgetPlaces(topLowBudgetPlaces);
    };

    loadLowBudgetPlaces();
  }, []);

  return (
    <div className="px-20">
      <h1 className="font-bold text-xl mb-3 mt-20">TOP 5 LOW BUDGET PLACES</h1>
      <Carousel
        // withIndicators
        slideSize="33.333333%"
        slideGap="md"
        loop
        align="start"
        slidesToScroll={3}
        style={{ width: "100%" }}
      >
        {lowBudgetPlaces.length > 0 ? (
          lowBudgetPlaces.map((place) => (
            <Carousel.Slide key={place.name}>
              <ItenariesCard place={place} />
            </Carousel.Slide>
          ))
        ) : (
          <p>No low-budget places available.</p>
        )}
      </Carousel>
    </div>
  );
};

export default LowBudget;
