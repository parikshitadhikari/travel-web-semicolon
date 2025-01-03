import { FaRocket } from "react-icons/fa";
import { HiSupport } from "react-icons/hi";
import { AiOutlineTeam } from "react-icons/ai";

/**
 * Component to display the services offered by the tourism platform.
 * It showcases various services such as travel community, 24/7 support, and dedicated tour guides.
 *
 * Each service is represented with an icon, a title, and a description, which are defined in the services array.
 *
 * @returns {JSX.Element} The Service component.
 */
const Service = () => {
  // Defines the list of services with their respective icons, titles, and descriptions.

  const services = [
    {
      id: 1,
      icon: (
        <FaRocket className="my-auto mr-4 bg-blue-300 rounded-full text-4xl p-2" />
      ),
      title: "Travel Community",
      description:
        "Join our vibrant travel community where you can connect with fellow adventurers, share experiences, and discover new destinations!",
    },
    {
      id: 2,
      icon: (
        <HiSupport className="my-auto mr-4 rounded-full bg-blue-300 text-black text-4xl p-1" />
      ),
      title: "24/7 Travel Support",
      description:
        "We offer around-the-clock support for all your travel needs. Get in touch with us anytime for assistance with bookings, itineraries, and more.",
    },
    {
      id: 3,
      icon: (
        <AiOutlineTeam className="my-auto mr-4 bg-blue-300 rounded-full text-4xl p-1" />
      ),
      title: "Dedicated Travel Guides",
      description:
        "Our team of experienced travel guides ensures that your journey is smooth, enjoyable, and unforgettable. Join a guided tour today!",
    },
  ];

  // JSX structure for the component
  return (
    <div className="flex mx-40 space-x-16">
      <div className="left flex justify-center items-center ">
        <img src={"/images/travelling.jpg"} alt="Tourists exploring a city" />
      </div>
      <div className="right p-4 flex space-y-6 flex-col">
        <div className="text-4xl font-bold mb-2">Why Choose Us</div>
        <div className="text-zinc-400 mb-4">
          <div>
            Choose us for the best travel experience, where we combine local
            expertise, personalized itineraries, and a passionate travel
            community to help you explore the world effortlessly.
          </div>
          <div className="mt-2">
            From planning to discovering new places, we make travel simple and
            memorable.
          </div>
        </div>
        <ul>
          {services.map(({ id, icon, title, description }) => {
            return (
              <li
                key={id}
                className="mb-5 font-semibold flex flex-col space-y-3"
              >
                <div className="flex space-x-4 justify-start items-center">
                  {icon}
                  <h4>{title}</h4>
                </div>
                <div className="text-gray-400">{description}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Service;
