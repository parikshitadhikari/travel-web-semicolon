"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import mockPlaces from "../data/mockPlaces";
import { BackgroundBeams } from "@/components/ui/background-beams";
import NavBar from "@/app/components/NavBar";
import { Divider } from "@mantine/core";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import {
  IconTag,
  IconUser,
  IconAt,
  IconHeartFilled,
  IconHeart,
  IconPencil,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { toast } from "react-toastify";

interface Label {
  id: number;
  name: string;
}

interface Place {
  id: number;
  name: string;
  description: string;
  price: number;
  guide: string;
  interested_users: string[];
  img: string;
  label: Label[];
}

const PlaceDetails = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [reviewOpened, { open: openReview, close: closeReview }] =
    useDisclosure(false);

  const [place, setPlace] = useState<Place | undefined>(undefined);
  const [isInterested, setIsInterested] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      setUsername(parsedUserInfo.username);
    }
  }, []);

  useEffect(() => {
    if (username && place?.interested_users.includes(username)) {
      setIsInterested(true);
    }
  }, [place?.interested_users, username]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/auth/destination");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const places: Place[] = await response.json();
        const placeDetails = places.find(
          (place) => place.id === parseInt(id as string)
        );
        setPlace(placeDetails);

        if (username && placeDetails?.interested_users.includes(username)) {
          setIsInterested(true);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, [id, username, isInterested]);

  const handleInterestToggle = async () => {
    if (!username) return;

    const body = {
      id: place?.id,
      username: username,
    };

    try {
      await fetch("http://127.0.0.1:8000/auth/destination/subscribe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      setIsInterested(true);
    } catch (error) {
      console.error("Error while subscribing:", error);
      toast.error("An error occurred while subscribing.");
    }
  };

  if (!place) {
    return <p>Loading...</p>;
  }
  const surnames = ["Jha", "Acharya", "Subedi", "Adhikari"];

  const getRandomSurname = () => {
    return surnames[Math.floor(Math.random() * surnames.length)];
  };

  return (
    <MantineProvider>
      <Modal opened={opened} onClose={close} size="lg">
        <p className="font-bold">
          People interested in travelling to {place.name}
        </p>
        <div className="flex flex-col gap-y-2 mt-4">
          {place.interested_users.map((person, index) => (
            <div
              key={index}
              className="border py-2 px-4 rounded font-bold flex items-center gap-x-4"
            >
              <div className="flex gap-x-2 items-center w-2/5">
                <IconUser size={20} />
                {person} {getRandomSurname()}
              </div>
              <div className="flex gap-x-2 items-center w-3/5">
                <IconAt size={20} />
                {person.toLocaleLowerCase()}@gmail.com
              </div>
            </div>
          ))}
        </div>
      </Modal>
      <Modal opened={reviewOpened} onClose={closeReview} size="lg">
        <h2 className="font-bold text-xl">Write a Review for {place.name}</h2>
        <textarea
          className="w-full h-32 mt-4 p-2 border rounded"
          placeholder="Share your thoughts..."
        />
        <button
          onClick={async () => {
            closeReview();
          }}
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Submit Review
        </button>
      </Modal>
      <div className="relative min-h-screen bg-white">
        <div className="absolute inset-0 z-0">
          <BackgroundBeams />
        </div>

        <NavBar />
        <div className="p-20 z-10 relative">
          <div className="flex gap-x-20 items-center">
            <div className="w-[55%]">
              <h1 className="text-3xl font-bold mb-4">{place.name}</h1>
              <p className="mt-10">{place.description}</p>
              <p className="mt-10 border w-fit py-2 px-4 rounded bg-pink-600 text-white">
                <strong>Budget:</strong> Rs. {place.price} approx.
              </p>
            </div>
            <img
              src={place.img}
              alt={place.name}
              className="w-2/5 h-auto mb-4"
            />
          </div>
          <Divider my="md" />
          <p className="flex justify-around gap-x-10">
            {place.label.slice(0, 7).map((tag, index) => (
              <span
                key={index}
                className="bg-blue-500 py-2 px-4 rounded text-white font-bold flex gap-x-2 items-center"
              >
                <IconTag size={20} />
                {tag.name}
              </span>
            ))}
          </p>
          <Divider my="md" />
          <div className="flex items-center gap-x-10 w-fit">
            <p className="mt-5 bg-gray-200 w-fit p-2 rounded">
              <strong>Guide:</strong> {place.guide}
            </p>
            <button
              onClick={open}
              className="border p-2 mt-5 rounded border-blue-500 hover:bg-blue-500 font-bold hover:text-white"
            >
              People Interested ({place.interested_users.length})
            </button>
            <button
              onClick={handleInterestToggle}
              className={`border p-2 mt-5 rounded flex items-center gap-x-2 ${
                isInterested
                  ? "border-pink-500 bg-pink-500 text-white font-bold"
                  : "border-black bg-white text-black"
              }`}
            >
              {isInterested ? (
                <IconHeartFilled className="text-white" size={20} />
              ) : (
                <IconHeart className="text-black" size={20} />
              )}
              {isInterested ? " Subscribed" : " Subscribe"}
            </button>
          </div>
          <Divider my="lg" />
          <div>
            <h1 className="font-bold text-xl">Traveller's Review</h1>
            <button
              onClick={openReview}
              className="flex items-center gap-x-1 border border-gray-400 rounded w-fit p-1 px-3 mt-2 hover:border-gray-700 hover:cursor-pointer "
            >
              <IconPencil size={20} /> Leave a review...
            </button>
          </div>
        </div>
      </div>
    </MantineProvider>
  );
};

export default PlaceDetails;
