import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form>
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 p-3 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-3 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
