import { BackgroundBeams } from "@/components/ui/background-beams";
import Box from "./components/Box";
import Feature from "./components/Feature";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Service from "./components/Service";
import Testimonial from "./components/Testimonial";
// import SidebarDemo from "./components/Sidebar";

export default function Home() {
  return (
    <div>
      <div className="">
        <BackgroundBeams />
      </div>
      <div className="z-10">
        <div>
          <NavBar />
          <Hero />
          <Box />
          <Service />
          <Feature />
          <Testimonial />
          <Footer />
        </div>
      </div>
    </div>
  );
}
