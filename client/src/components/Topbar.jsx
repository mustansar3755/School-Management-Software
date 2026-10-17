import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Menu, LogOut } from "lucide-react";

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-line bg-white px-4 sm:px-6">
      {/* Hamburger button: sirf mobile pe dikhta hai */}
      <button onClick={onMenuClick} aria-label="Open menu" className="rounded-lg p-2 hover:bg-black/5 lg:hidden">
        <Menu size={20} />
      </button>

      {/* School ka naam: sirf desktop pe */}
      <p className="hidden text-sm text-muted lg:block">Green Valley School</p>

      <div className="flex items-center gap-3">
        <div className="text-right leading-tight">
          <p className="text-sm font-semibold">Mustansar Hussain</p>
          <p className="text-xs text-muted">Admin</p>
        </div>

        <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-soft text-sm font-bold text-brand-dark">
          MH
        </span>

        <button onClick={handleLogout} title="Log out" className="rounded-lg p-2 text-muted hover:bg-red-50 hover:text-red-600">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}