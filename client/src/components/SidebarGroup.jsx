import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function SidebarGroup({ label, icon: Icon, base, items, onNavigate }) {
  const { pathname } = useLocation();

  // Hum is section ke andar kisi page pe hain?
  const isInside = pathname.startsWith(base);

  // Agar andar hain to dropdown shuru se khula rahe
  const [open, setOpen] = useState(isInside);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center gap-3 rounded-lg border-l-[3px] px-3 py-2.5 text-sm font-medium transition ${
          isInside
            ? "border-amber bg-white/10 text-white"
            : "border-transparent text-white hover:bg-white/5 hover:text-white"
        }`}
      >
        <Icon size={18} />
        {label}
        <ChevronDown size={16} className={`ml-auto transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="ml-6 mt-1 space-y-1 border-l border-white/10 pl-3">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              onClick={onNavigate}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm transition ${
                  isActive ? "font-semibold text-amber" : "text-white/60 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}