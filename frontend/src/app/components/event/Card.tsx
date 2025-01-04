"use client";
import Image from "next/image";
import { JSX } from "react";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/app/hooks/use-outside-click";
import axios from "axios";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Icons for favorite

// Define the type structure for a card
type Card = {
  id: number; // Add 'id' for API calls
  title: string;
  description: string;
  image: string;
  isFavorite: boolean;
  content: () => JSX.Element | string;
};

export default function ExpandableCardDemo() {
  const [cards, setCards] = useState<Card[]>([]);
  const [active, setActive] = useState<Card | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const truncate = (input: string) =>
    input?.length > 10 ? `${input.substring(0, 10)}` : input;

  const staticUsername = "Rohan"; // Static username for the API request

  // Fetch data from API and transform it to match the Card structure
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/auth/events/");
        const transformedCards = response.data.map((item: any) => ({
          id: item.id, // Get event ID for the API
          title: item.name,
          description: truncate(item.created_at),
          image: item.img,
          isFavorite: item.interested_users.includes(staticUsername), // Initially, all events are not favorited
          content: () => item.description,
        }));
        setCards(transformedCards);
      } catch (error) {
        console.error("Error fetching events data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle API call to toggle favorite status
  const toggleFavorite = async (card: Card) => {
    try {
      // Toggle favorite state before API call for immediate UI feedback
      setCards((prevCards) =>
        prevCards.map((c) =>
          c.id === card.id ? { ...c, isFavorite: !c.isFavorite } : c
        )
      );

      // Send data to API (event ID and username)
      await axios.post("http://127.0.0.1:8000/auth/events/interested/", {
        id: card.id,
        username: staticUsername,
      });
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  // Handle closing the expanded card with ESC key
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="absolute top-2 right-2 lg:hidden bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.image}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  {/* Favorite Heart Button */}
                  <motion.button
                    layoutId={`favorite-${active.title}-${id}`}
                    onClick={() => toggleFavorite(active)}
                    className="text-red-500 hover:scale-110 transition-all"
                  >
                    {active.isFavorite ? (
                      <AiFillHeart className="h-6 w-6 text-red-500" />
                    ) : (
                      <AiOutlineHeart className="h-6 w-6" />
                    )}
                  </motion.button>
                </div>

                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400"
                  >
                    {active.content()}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ul className="max-w-6xl mx-auto w-full gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={index}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.image}
                  alt={card.title}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div>
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>

            {/* Favorite Heart Icon */}
            <motion.button
              layoutId={`favorite-${card.title}-${id}`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent opening the card when clicking the heart
                toggleFavorite(card);
              }}
              className="text-red-500 hover:scale-110 transition-all mt-4 md:mt-0"
            >
              {card.isFavorite ? (
                <AiFillHeart className="h-6 w-6 text-red-500" />
              ) : (
                <AiOutlineHeart className="h-6 w-6" />
              )}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

// Close Icon component
export const CloseIcon = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.05 } }}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-black"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);
