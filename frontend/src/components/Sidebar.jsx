import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const menus = {
    admin: [
      { name: "Dashboard", path: "/" },
      { name: "Data Pinjaman", path: "/admin/loans" },
      { name: "Data Pelunasan", path: "/admin/settlements" },
      { name: "Daftar Simpanan", path: "/admin/savings" },
      { name: "Tambah Simpanan", path: "/add-savings" },
    ],
    karyawan: [
      { name: "Dashboard", path: "/" },
      { name: "Pinjaman", path: "/employee/add-loans" },
      { name: "Daftar Pinjaman", path: "/employee/loans" },
      { name: "Daftar Simpanan", path: "/employee/savings" },
    ],
  };

  const roleMenus = user ? menus[user.role] : [];

  return (
    <aside className="w-64 bg-base-100 border-r border-gray-300">
      <div className="flex items-center justify-center text-xl font-bold border-b border-gray-300 h-16">
        <NavLink to="/" end className="text-center">
          Koperasi App
        </NavLink>
      </div>
      <nav className="p-4 space-y-2">
        {roleMenus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            end
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive ? "bg-primary text-white" : "hover:bg-base-300"
              }`
            }
          >
            {menu.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
