import { useRef } from "react";
import { Input } from "../components/ui/input";
import Button from "../components/ui/button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const navigate=useNavigate();
  const usernameref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);

  async function signup() {
    const username = usernameref.current?.value;
    const password = passwordref.current?.value;

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });
      alert("Signed in successfully!");
      console.log("Response:", response.data);
      navigate("../dashbord")

    } catch (err) {
      console.error("Signin error:", err);
      alert("Signin failed.");
    }
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 sm:p-14 w-full max-w-md flex flex-col items-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Create Your Account
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Start saving your smartest links with context.
        </p>

        <div className="w-full space-y-4">
          <Input ref={usernameref} placeholder="Username" />
          <Input ref={passwordref} type="password" placeholder="Password" />
          <Button
            variant="primary"
            text="Sign In"
            size="lg"
            onClick={signup}
          />
        </div>

        <p className="text-sm text-gray-600 pt-2">
          Already have an account?{" "}
          <a href="/signup" className="text-blue-600 font-medium hover:underline">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}
