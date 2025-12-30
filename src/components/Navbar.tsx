import React, { useState } from "react";
import Logo from "./NavBar/Logo";
import Sublogo from "./NavBar/SubLogo";
import NavItem from "./NavBar/NavItem";
import NavButton from "./NavBar/NavButton";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Explore",
      to: "/explore",
    },
    {
      label: "Help",
      to: "/help",
    },
    {
      label: "Be a Partner",
      to: "/be-a-partner",
    },
    {
      label: "About Us",
      to: "/about-us",
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-1000 bg-white/70 p-3 shadow flex justify-between font-[Arial] h-16 backdrop-blur-md">
      {/* Left Side */}
      <div className="flex items-center">
        <Logo />
        <Sublogo />
      </div>

      {/* Right Side (Desktop) */}
      <div className="hidden md:flex gap-4">
        
        <div className="hidden md:flex gap-4 mt-2">
          {menuItems.map((item) => (
            <NavItem key={item.label} item={item.label} to={item.to} />
          ))}
        </div>
        
        {/* Button Login & Register */}
        <div onClick={() => (window.location.href = "/login")}>
          <NavButton className="pl-4 pr-4 pt-1.5 pb-1.5 ml-3">Login</NavButton>
        </div>
        <div onClick={() => (window.location.href = "/register")}>
          <NavButton className="pl-3 pr-3 pt-1.5 pb-1.5 ml-1 mr-6">Register</NavButton>
        </div>
      </div>

      {/* Menu Button (Mobile) */}
      <button
        className="md:hidden flex items-center p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Dropdown Menu (Mobile) */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start p-4 gap-3 md:hidden">
          {menuItems.map((item) => (
            <NavItem key={item.label} item={item.label} to={item.to} />
          ))}
          <div className="flex w-full gap-3 mt-2">
            <div
              className="flex-1"
              onClick={() => (window.location.href = "/login")}
            >
              <NavButton className="w-full">Login</NavButton>
            </div>
            <div
              className="flex-1"
              onClick={() => (window.location.href = "/register")}
            >
              <NavButton className="w-full">Register</NavButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
