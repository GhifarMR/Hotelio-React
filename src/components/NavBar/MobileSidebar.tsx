// import { useState } from "react";
// import NavButton from "./NavButton";
// import NavItem from "./NavItem";
// import { X } from "lucide-react";


// const MobileSidebar = () => {

//     const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div>
//       {/* Sidebar (Mobile) */}
//       <div
//         className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 md:hidden flex flex-col p-6 gap-4 transition-transform duration-300 ease-in-out ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Close Button */}
//         <div className="flex justify-end mb-2">
//           <button onClick={() => setIsOpen(false)}>
//             <X size={26} />
//           </button>
//         </div>

//         {/* Nav Items */}
//         {menuItems.map((item) => (
//           <NavItem key={item.label} item={item.label} to={item.to} />
//         ))}

//         {/* Buttons */}
//         <div className="flex flex-col gap-3 mt-4">
//           <NavButton to="/login" className="w-full text-center py-2">
//             Login
//           </NavButton>
//           <NavButton to="/register" className="w-full text-center py-2">
//             Register
//           </NavButton>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MobileSidebar;