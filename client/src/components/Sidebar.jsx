import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, GraduationCap, CalendarCheck, Wallet, NotebookPen, X } from "lucide-react";
import { FaGraduationCap } from "react-icons/fa6";

// Menu ki list. Naya page add karna ho to bas yahan ek line add karo.
const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/students", label: "Students", icon: Users },
  { to: "/teachers", label: "Teachers", icon: GraduationCap },
  { to: "/attendance", label: "Attendance", icon: CalendarCheck },
  { to: "/fees", label: "Fees", icon: Wallet },
  { to: "/diary", label: "Daily Diary", icon: NotebookPen },
];

export default function Sidebar({ open, onClose }) {
  // Sidebar ka andar ka hissa. Desktop aur mobile dono mein yahi use hota hai.
  const content = (
    <>
      <div className="flex items-center gap-2.5 px-5 py-5">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber text-ink">
          <FaGraduationCap size={20} />
        </span>
        <span className="text-lg font-extrabold text-white">SchoolDesk</span>
      </div>

      <nav className="space-y-1 px-3">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg border-l-[3px] px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "border-amber bg-white/10 text-white"
                  : "border-transparent text-white/70 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop: hamesha dikhta hai (lg = 1024px se bara screen) */}
      <aside className="hidden w-64 shrink-0 bg-ink lg:block">{content}</aside>

      {/* Mobile: sirf tab dikhta hai jab open === true */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-ink">
            <button onClick={onClose} aria-label="Close menu" className="absolute right-3 top-4 text-white/70">
              <X size={20} />
            </button>
            {content}
          </aside>
        </div>
      )}
    </>
  );
}