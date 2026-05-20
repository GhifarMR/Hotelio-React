import { useState } from "react";

import { Menu, X } from "lucide-react";
import Logo from "../NavBar/Logo";
import Sublogo from "../NavBar/SubLogo";
import NavItem from "../NavBar/NavItem";
import NavButton from "../NavBar/NavButton";
import { Footer } from "react-day-picker";

// import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

const NavbarOwner = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Home", to: "/" },
    { label: "Message", to: "/explore" },
    { label: "Help", to: "/help" },
    { label: "Be a Partner", to: "/be-a-partner" },
    { label: "About Us", to: "/about-us" },
  ];

  return (
    <>
      <div className="w-full z-50 bg-white p-3 shadow flex justify-between font-[Arial] h-16 ">
        {/* Left Side */}
        <div className="flex items-center">
          <Logo link="/owner-dashboard" />
          <Sublogo title="|owner"/>
          {/* <AnimatedThemeToggler variant="star" /> */}
        </div>

        {/* Right Side (Desktop) */}
        <div className="hidden md:flex gap-4">
          <div className="hidden md:flex gap-4 mt-2">
            {menuItems.map((item) => (
              <NavItem key={item.label} item={item.label} to={item.to} />
            ))}
          </div>
          <NavButton to="/login" className="pl-4 pr-4 pt-1.5 pb-1.5 ml-3">
            Login
          </NavButton>
          <NavButton
            to="/register"
            className="pl-3 pr-3 pt-1.5 pb-1.5 ml-1 mr-6"
          >
            Register
          </NavButton>
        </div>

        {/* Menu Button (Mobile) */}
        <button
          className="md:hidden flex items-center p-2 z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar (Mobile) */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 md:hidden flex flex-col p-6 gap-4 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end mb-2">
          <button onClick={() => setIsOpen(false)}>
            <X size={26} />
          </button>
        </div>

        {/* Nav Items */}
        {menuItems.map((item) => (
          <NavItem key={item.label} item={item.label} to={item.to} />
        ))}

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-4">
          <NavButton to="/login" className="w-full text-center py-2">
            Login
          </NavButton>
          <NavButton to="/register" className="w-full text-center py-2">
            Register
          </NavButton>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default NavbarOwner;
