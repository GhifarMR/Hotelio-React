import React, { useState } from "react";
import Navbar from "./Navbar";
import AccBox from "./LoginRegister/AccBox";
import AccButton from "./LoginRegister/AccButton";
import AccImage from "./LoginRegister/AccImage";
import AccGoogleButton from "./LoginRegister/AccGoogleButton";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirm) {
      setError("Password does not match");
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
          src="https://plus.unsplash.com/premium_photo-1676488643831-1c5fda040662?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
          text="Create Your Journey"
          subText="Join us and start planning your next amazing stay"
        />

        <div className="flex flex-col justify-center px-10 py-12">
          <h2 className="text-2xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Fill the form below to create your account
          </p>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">

            <AccBox
              label="Username"
              type="text"
              placeholder="yourname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

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

            <AccBox
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
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

export default RegisterPage;
