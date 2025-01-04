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
const getTopPlaces = (places: Place[]) => {
  const placesWithLikes = places.map((place) => ({
    ...place,
    likeCount: place.interested_users.length, // Count of people liking this place
  }));

  const sortedPlaces = placesWithLikes.sort((a, b) => b.likeCount - a.likeCount);

  return sortedPlaces.slice(0, 3);
};

const fetchTrendingPlaces = async (): Promise<Place[]> => {
  try {
    const response = await fetch("http://127.0.0.1:8000/auth/destination");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching trending places:", error);
    return [];
  }
};

const Trending = () => {
  const [trendingPlaces, setTrendingPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const loadTrendingPlaces = async () => {
      const places = await fetchTrendingPlaces();
      const topPlaces = getTopPlaces(places); // Get top 3 places based on likes
      setTrendingPlaces(topPlaces);
    };

    loadTrendingPlaces();
  }, []);

  return (
    <div className="px-20">
      <h1 className="font-bold text-xl mb-3 mt-20">TOP 3 TRENDING PLACES</h1>
      <Carousel
        // withIndicators
        slideSize="33.333333%"
        slideGap="md"
        loop
        align="start"
        slidesToScroll={3}
        style={{ width: "100%" }}
      >
        {trendingPlaces.length > 0 ? (
          trendingPlaces.map((place) => (
            <Carousel.Slide key={place.name}>
              <ItenariesCard place={place} />
            </Carousel.Slide>
          ))
        ) : (
          <p>No trending places available.</p>
        )}
      </Carousel>
    </div>
  );
};

export default Trending;
