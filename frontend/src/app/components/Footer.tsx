import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";

import Button from "../components/Button";

/**
 * Footer component that provides input fields for user interaction,
 * links to social media accounts, and copyright information.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = () => {
  return (
    <div className="bg-slate-800 text-white py-12 mt-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2">
          <div className="text-4xl font-bold mb-6 px-6">
            <div>Need advice for</div>
            <div>your next TRAVEL!</div>
          </div>
          <div className="md:px-6 ">
            {/* Input fields */}
            <input
              type="text"
              placeholder="Enter your name..."
              className="border-b-2 mb-3 py-2 px-4 mr-10 focus:outline-none focus:border-green-500 bg-transparent text-white"
            />
            <input
              type="text"
              placeholder="Enter your phone number"
              className="border-b-2 py-2 px-4 focus:outline-none focus:border-green-500 bg-transparent text-white"
            />
            {/* More input fields */}
            <div className="flex-col mb-6">
              <input
                type="email"
                placeholder="example@gmail.com.np"
                className="border-b-2 mb-3 py-2 px-4 mr-10 focus:outline-none focus:border-green-500 bg-transparent text-white"
              />
              <input
                type="text"
                placeholder="Tell us about yourself"
                className="border-b-2 py-2 px-4 focus:outline-none focus:border-green-500 bg-transparent text-white"
              />
            </div>
            {/* Submit button */}
            <button className="w-40 h-10 rounded-xl bg-blue-500 text-slate-200 border border-black  text-sm">
              Send Message
            </button>
          </div>
        </div>

        {/* Social media links section */}
        <div className="md:w-1/2 grid place-content-center md:gap-8">
          <div className="mb-4 md:mb-0">
            <p className="text-6xl font-bold mb-6">Follow Us</p>
            <div className="flex justify-center items-center space-x-4 ">
              <p>
                <SiFacebook className="text-3xl " />
              </p>
              <p>
                <AiFillInstagram className="text-3xl" />
              </p>
              <p>
                <FaLinkedin className="text-3xl" />
              </p>
              <p>
                <FaYoutube className="text-3xl " />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright notice */}
      {/* <hr className="my-6 border-slate-200 sm:mx-auto dark:border-slate-700 lg:my-6" /> */}
      <span className="block text-sm text-slate-500 bottom-3 sm:text-center dark:text-slate-400">
        © 2024{" "}
        <a href="#" className="hover:underline">
          TravelWeb™
        </a>
        . All Rights Reserved.
      </span>
    </div>
  );
};

export default Footer;
