import React, { useState } from "react";
import Navbar from "./Navbar";
import AccGoogleButton from "./LoginRegister/AccGoogleButton";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // validation
    if (!email.includes("@")) {
      setError("Invalid email");
      return;
    }

    if (password.length < 6) {
      setError("Password minimum 6 character");
      return;
    }

    // TESTING
    setError("");
    alert("LOGIN SUCCESS (TESTING)");
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-6">
      <Navbar />
      
      <div className="w-full relative mt-[6vh] h-[87vh] rounded-3xl overflow-hidden bg-white grid grid-cols-1 md:grid-cols-2 shadow-xl">
        
        {/* Left Image Section */}
        <div className="relative h-80 md:h-auto">
          <img
            src="https://images.unsplash.com/photo-1748775038871-3f988bf6381e?q=80&w=1170&auto=format&fit=crop"
            alt="Hotel"
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-2xl font-bold">Turn Vacations Into Stories</h2>
            <p className="opacity-90 text-sm">Unforgettable stays, tailored just for you</p>
          </div>
        </div>

        {/* Right Login Section */}
        <div className="flex flex-col justify-center px-10 py-12">
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Enter your email and password to access your account
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-3 rounded-xl bg-gray-100 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-3 rounded-xl bg-gray-100 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-500 text-sm -mt-2">{error}</p>
            )}

            {/* Options */}
            <div className="flex items-center justify-between text-sm mt-1">
              <label className="flex items-center gap-2">
                <input type="checkbox" /> Remember me
              </label>
              <button className="text-gray-500 hover:underline">Forgot Password</button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="bg-black text-white py-3 rounded-xl hover:opacity-90 mt-2"
            >
              Login
            </button>

            {/* Google Button */}
            <AccGoogleButton />
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
