"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className="flex flex-col items-center w-full transition-all duration-300 ease-out"
    >
      <div
        className={cn(
          "relative rounded-xl bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full",
          hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
        )}
      >
        <Image src={card.src} alt={card.title} fill className="object-cover" />
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 bg-black/50 text-white text-lg font-semibold p-4 transition-opacity duration-300",
            hovered === index ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="flex justify-between">
            <div>{card.title}</div>
            <p className="font-medium">${card.price}</p>
          </div>
        </div>
        <div
          className={cn(
            "absolute inset-0 bg-black/80 flex flex-col justify-between items-start py-6 px-6 transition-opacity duration-300",
            hovered === index ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="text-lg md:text-2xl font-semibold text-neutral-100 mt-2">
            {card.title}
          </div>
          <div className="text-lg md:text-xl font-semibold text-neutral-100 mt-2">
            ${card.price}
          </div>
          <div className="text-sm md:text-sm font-regular text-neutral-300 mt-2">
            {card.description}
          </div>
          <div className="flex w-full">
            <button
              className={cn(
                "mt-4 py-2 px-4 text-white bg-blue-500 rounded-full transition-opacity duration-300 w-full",
                hovered === index ? "opacity-100" : "opacity-0"
              )}
            >
              Buy
            </button>
            <button
              className={cn(
                "mt-4 py-2 px-4 text-blue-500 font-semibold hover:underline rounded-full transition-opacity duration-300 w-full",
                hovered === index ? "opacity-100" : "opacity-0"
              )}
            >
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
  price: number;
  description: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
