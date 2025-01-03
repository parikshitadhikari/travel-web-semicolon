import { BackgroundBeams } from "@/components/ui/background-beams";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Box from "./components/Box";

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
        </div>
      </div>
    </div>
  );
}
