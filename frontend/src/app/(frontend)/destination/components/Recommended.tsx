"use client";
import React, { useState, useEffect } from "react";
import ItenariesCard from "./ItenariesCard";
import "@mantine/core/styles.css";
import { Carousel } from "@mantine/carousel";
import axios from "axios";
interface Label {
  id: number;
  name: string;
}

interface Place {
  id: number;
  name: string;
  description: string;
  price: number;
  guide: number;
  interested_users: string[];
  img: string;
  label: Label[];
}
interface UserInfo {
  username: string;
  email: string;
  password: string;
  interests: string[];
}

const Recommended = () => {
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const storedUserInfo = localStorage.getItem("userInfo");

        if (storedUserInfo) {
          const userInfo: UserInfo = JSON.parse(storedUserInfo);

          if (userInfo.interests) {
            const response = await axios.get(
              "http://127.0.0.1:8000/auth/destination/"
            );

            const recommendedPlaces = response.data.filter((place: Place) =>
              place.label.some((label) =>
                userInfo.interests.includes(label.name)
              )
            );

            setFilteredPlaces(recommendedPlaces);
          }
        }
      } catch (error) {
        console.error("Error fetching places:", error);
        setError("Failed to load places.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="px-20">
      <h1 className="font-bold text-xl mb-3">RECOMMENDED FOR YOU</h1>
      <Carousel
        // withIndicators
        slideSize="33.333333%"
        slideGap="md"
        loop
        align="start"
        slidesToScroll={3}
        style={{ width: "100%" }}
      >
        {filteredPlaces.length > 0 ? (
          filteredPlaces.map((place) => (
            <Carousel.Slide key={place.name}>
              <ItenariesCard place={place} />
            </Carousel.Slide>
          ))
        ) : (
          <p>No places match your interests.</p>
        )}
      </Carousel>
    </div>
  );
};

export default Recommended;
