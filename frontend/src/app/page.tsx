import { BackgroundBeams } from "@/components/ui/background-beams";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div>
      <div className="">
        <BackgroundBeams />
      </div>
      <div className="z-10">
        <div>
          <NavBar />
        </div>
      </div>
    </div>
  );
}
