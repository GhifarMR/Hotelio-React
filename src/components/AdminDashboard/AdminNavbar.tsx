import { useState } from "react";
import AdminNavbarButton from "./AdminNavbarButton";

const AdminNavbar = () => {
  const [showLogMenu, setShowLogMenu] = useState(false);

  return (
    <nav className="sticky top-0 left-0 z-1000 bg-white/70 p-3 flex justify-between font-[Arial] h-16 backdrop-blur-md">
      <div>
        <button
          className="text-2xl font-bold cursor-pointer"
          onClick={() => setShowLogMenu(!showLogMenu)}
        >
          BABA.CO
        </button>

        {showLogMenu && (
          <div className="absolute bg-white bottom rounded p-2 cursor-pointer shadow">
            <a href="/">Log Out</a>
          </div>
        )}
      </div>

      <div className="flex gap-1">
        <AdminNavbarButton source="/admin-dashboard" name="Home"/>
        <AdminNavbarButton source="/admin-dashboard-add" name="New Hotel" />
        <AdminNavbarButton source="/admin-dashboard-edit" name="Edit Hotel" />
      </div>
    </nav>
  );
};

export default AdminNavbar;
