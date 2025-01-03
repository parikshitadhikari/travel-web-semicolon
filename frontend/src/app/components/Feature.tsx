import { GiDiscussion } from "react-icons/gi";
import { MdInterests } from "react-icons/md";
import { SiPowerpages } from "react-icons/si";
import { FaRocket } from "react-icons/fa";

/**
 * Feature component displays a list of key features of the TravelWeb platform.
 * Each feature is represented with an icon, a title, and a short description.
 *
 * @returns {JSX.Element} The rendered Feature component.
 */
const Feature = () => {
  // Array of feature details including icon, title, and description.
  const features = [
    {
      id: 1,
      icon: <GiDiscussion className="bg-blue-500 text-6xl p-3 rounded-full" />,
      title: "Travel Forums",
      description: "Connect with fellow travelers and share experiences.",
    },
    {
      id: 2,
      icon: <MdInterests className="bg-blue-400 text-6xl p-3 rounded-full" />,
      title: "Personalized Interests",
      description:
        "Explore destinations that match your personal interests and preferences.",
    },
    {
      id: 3,
      icon: <SiPowerpages className="bg-blue-300 text-6xl p-3 rounded-full" />,
      title: "Expand Your Horizons",
      description:
        "Discover new travel opportunities and expand your travel plans.",
    },
    {
      id: 4,
      icon: <FaRocket className="bg-blue-200 text-6xl p-2 rounded-full" />,
      title: "Customized Itineraries",
      description:
        "Get tailored travel itineraries designed specifically for you.",
    },
  ];
  return (
    <div className="flex justify-center items-center flex-col space-y-16 my-10">
      <div className="">
        <h1 className="text-5xl font-extrabold m-4 mb-6 text-center">
          Our Features
        </h1>
        <p className="text-md text-gray-400 text-center mx-96">
          TravelWeb redefines travel with personalized recommendations, seamless
          trip planning, and a vibrant travel community. Explore new
          destinations, optimize your travel experiences, and stay connected
          with like-minded travelers through our innovative platform.
        </p>
      </div>
      <div className="m-3 mx-50 p-3 flex justify-around space-x-24">
        {features.map(({ id, icon, title, description }) => (
          <div
            className="flex justify-center items-center flex-col space-y-3"
            key={id}
          >
            <div>{icon}</div>
            <div className="text-lg font-extrabold text-center ">{title}</div>
            <div className="text-center">{description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
