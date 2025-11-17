import React, { useState } from "react";
import Navbar from "./Navbar";
import AccBox from "./LoginRegister/AccBox";
import AccButton from "./LoginRegister/AccButton";
import AccImage from "./LoginRegister/AccImage";
import AccGoogleButton from "./LoginRegister/AccGoogleButton";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Invalid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");
    alert("REGISTER SUCCESS (TESTING)");
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-6 overflow-hidden">
      <Navbar />

      <div className="w-full relative mt-[6vh] min-h-[75vh] rounded-3xl overflow-hidden bg-white grid grid-cols-1 md:grid-cols-2 shadow-xl">
        <AccImage
          src="https://images.unsplash.com/photo-1748775038871-3f988bf6381e?q=80&w=1170&auto=format&fit=crop"
          alt="Background"
          text="Turn Vacations Into Stories"
          subText="Unforgettable stays, tailored just for you"
        />

        <div className="flex flex-col justify-center px-10 py-12">
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Enter your email and password to access your account
          </p>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <AccBox
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <AccBox
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm h-4">{error}</p>}

            <AccButton text="Register" />
            <AccGoogleButton />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
