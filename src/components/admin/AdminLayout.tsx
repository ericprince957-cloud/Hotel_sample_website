import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { ToastContainer } from "@/components/admin/ToastContainer";
import {
  LayoutDashboard,
  MessageSquare,
  Bed,
  Image,
  Settings,
  ExternalLink,
  LogOut,
} from "lucide-react";

const navItems = [
  { path: "/admin", label: "Overview", icon: LayoutDashboard },
  { path: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
  { path: "/admin/rooms", label: "Rooms", icon: Bed },
  { path: "/admin/gallery", label: "Gallery", icon: Image },
  { path: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-[#E2DBC9]">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-[#E2DBC9]">
            <Link to="/admin" className="text-[20px] font-[Fraunces] font-semibold text-[#0F3D3E]">
              Admin Dashboard
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-[10px] text-[14px] font-medium transition-colors ${
                    isActive
                      ? "bg-[#0F3D3E] text-white"
                      : "text-[#4A5553] hover:bg-[#EDE8DC]"
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-[#E2DBC9] space-y-1">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-3 py-2 rounded-[10px] text-[14px] font-medium text-[#4A5553] hover:bg-[#EDE8DC] transition-colors"
            >
              <ExternalLink size={18} />
              View website
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 rounded-[10px] text-[14px] font-medium text-[#B3372F] hover:bg-[#EDE8DC] transition-colors w-full text-left"
            >
              <LogOut size={18} />
              Log out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        <main className="min-h-screen pb-20 md:pb-0">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2DBC9] z-40">
        <nav className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-[10px] transition-colors ${
                  isActive ? "text-[#0F3D3E]" : "text-[#4A5553]"
                }`}
              >
                <item.icon size={20} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <ToastContainer />
    </div>
  );
}
