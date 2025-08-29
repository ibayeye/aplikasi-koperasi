import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../components/SideBar";
import { logout } from "../store/slices/authSlice";

export default function MainLayout() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirect ke login jika tidak authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    // Navigation akan ditangani oleh useEffect di atas
  };

  // Loading state saat belum ada user data
  if (!isAuthenticated || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-base-200">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-base-200">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="navbar bg-base-100 border-b border-gray-300 h-16">
          <div className="flex-1 px-2 text-xl font-semibold"></div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              Hallo, {user.name || "User"}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-sm"
            >
              <li>
                <button onClick={handleLogout} className="btn btn-sm btn-error">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
