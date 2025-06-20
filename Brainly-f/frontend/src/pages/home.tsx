import { BrainIcon } from "../components/icons/brainicon";
import Button from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  function handleSignup() {
    navigate("/signin");
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-blue-500">
      <div className="w-[800px] h-[600px] bg-blue-500 flex flex-col items-center justify-center space-y-8">
        <div className="flex items-center space-x-4 text-white">
          <BrainIcon />
          <h1 className="text-white font-extrabold text-6xl">Second Brain</h1>
        </div>
        <h3 className="text-center text-white text-3xl font-medium px-4">
          "Never lose a golden link again — <span className="font-semibold">Second Brain</span> remembers what you forget, exactly when you need it."
        </h3>
        <Button text="Get Started" variant="start" size="lg" onClick={handleSignup} />
      </div>
    </div>
  );
}
