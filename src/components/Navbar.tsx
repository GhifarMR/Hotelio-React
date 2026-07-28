import { useState, useEffect } from "react";
import Logo from "./NavBar/Logo";
import Sublogo from "./NavBar/SubLogo";
import NavItem from "./NavBar/NavItem";
import NavButton from "./NavBar/NavButton";
import { Menu, X, LogOut, ClipboardList } from "lucide-react";
import Footer from "./MainDashboard/Footer";
import { useNavigate } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CUSTOMER_MENU = [
  { label: "Home", to: "/" },
  { label: "Explore", to: "/explore" },
  { label: "Help", to: "/help" },
  { label: "Be a Partner", to: "/be-a-partner" },
  { label: "About Us", to: "/about-us" },
];

const OWNER_MENU = [
  { label: "My Hotels", to: "/owner" },
  { label: "Add Hotel", to: "/owner/add-hotel" },
  { label: "Bookings", to: "/owner/bookings" },
];

const ADMIN_MENU = [{ label: "Dashboard", to: "/admin" }];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUserName(localStorage.getItem("name"));
    setRole(localStorage.getItem("role"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    setUserName(null);
    setRole(null);
    navigate({ to: "/" });
  };

  const menuItems =
    role === "owner" ? OWNER_MENU : role === "admin" ? ADMIN_MENU : CUSTOMER_MENU;

  const primaryAction = () =>
    navigate({ to: role === "owner" ? "/owner" : "/explore" });

  return (
    <>
      <div className="w-full z-50 bg-white p-3 shadow flex justify-between font-[Arial] h-16 ">
        <div className="flex items-center">
          <Logo link={role === "owner" ? "/owner" : "/explore"} />
          <Sublogo />
        </div>

        <div className="hidden md:flex gap-4">
          <div className="hidden md:flex gap-4 mt-2">
            {menuItems.map((item) => (
              <NavItem key={item.label} item={item.label} to={item.to} />
            ))}
          </div>

          {userName ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 ml-3 mr-6 self-center px-3 py-1.5 rounded-full hover:bg-gray-100 transition">
                  <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-sm">{userName}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={primaryAction}>
                  <ClipboardList className="mr-2 h-4 w-4" />
                  {role === "owner" ? "My Hotels" : "My Orders"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <NavButton to="/login" className="pl-4 pr-4 pt-1.5 pb-1.5 ml-3">
                Login
              </NavButton>
              <NavButton to="/register" className="pl-3 pr-3 pt-1.5 pb-1.5 ml-1 mr-6">
                Register
              </NavButton>
            </>
          )}
        </div>

        <button className="md:hidden flex items-center p-2 z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 md:hidden flex flex-col p-6 gap-4 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end mb-2">
          <button onClick={() => setIsOpen(false)}>
            <X size={26} />
          </button>
        </div>

        {menuItems.map((item) => (
          <NavItem key={item.label} item={item.label} to={item.to} />
        ))}

        <div className="flex flex-col gap-3 mt-4">
          {userName ? (
            <>
              <div className="flex items-center gap-2 py-1">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold">{userName}</span>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  primaryAction();
                }}
                className="w-full text-left py-2 text-sm text-gray-700 hover:text-black flex items-center gap-2"
              >
                <ClipboardList size={16} /> {role === "owner" ? "My Hotels" : "My Orders"}
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 text-sm text-red-600 hover:text-red-700 flex items-center gap-2"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <NavButton to="/login" className="w-full text-center py-2">Login</NavButton>
              <NavButton to="/register" className="w-full text-center py-2">Register</NavButton>
            </>
          )}
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Navbar;