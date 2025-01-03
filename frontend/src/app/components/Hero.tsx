import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Link from "next/link";
import React from "react";

const Hero = () => {
  const words = [
    {
      text: "Your",
    },
    {
      text: "Tribe,",
    },
    {
      text: "Your",
    },
    {
      text: "Journey.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="m-4 mx-60 my-20 flex justify-between items-center">
      {/* Text section with headings and description */}
      <div className="m-10 space-y-10 flex flex-col justify-evenly w-3/5">
        {/* Heading */}
        {/* <div>
          <h1 className="my-4 text-5xl font-extrabold text-black">
            TravelWeb: Here to <span className="text-green-400">Transform</span>
          </h1>
          <h1 className="my-4 text-5xl font-extrabold text-black">
            The Way We Travel.
          </h1>
        </div> */}
        <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
          The road to freedom starts from here
        </p>
        <TypewriterEffectSmooth words={words} />
        {/* Description */}
        {/* <div className="text-gray-400 text-md">
            Set out on a path of discovery, TravelWeb emerges as a gateway to
            adventure. In the ever-expanding world of travel, it paves the way for
            new experiences, equipping explorers with eco-friendly options and
            unlocking unforgettable journeys, while promoting a deeper connection
            with the world.
          </div> */}
        <div className="text-gray-400 text-md">
          Discover new places with people who get you. Connect, plan, and create
          epic travel stories together—because adventures are better shared.
        </div>

        {/* Call to action and additional link */}
        {/* <div className="flex space-x-5 items-center mt-10">
            <button className="w-40 bg-green-600 text-white hover:bg-green-700 rounded-lg text-lg px-2 py-2 text-center">
              Join Free
            </button>
            {/* <span className="text-xl">Watch Video</span> 
          </div>
          */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <Link href={"/auth"}>
            <button className="w-40 h-10 rounded-xl bg-slate-800 border dark:border-white border-transparent text-white text-sm">
              Join now
            </button>
          </Link>
          {/* <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
              Signup
            </button> */}
        </div>
      </div>

      {/* Image section */}
      <div>
        <img
          src={"/images/logo-travel-web.jpg"}
          className="object-cover h-96"
          alt="image description"
        />
      </div>
    </div>
  );
};

export default Hero;
