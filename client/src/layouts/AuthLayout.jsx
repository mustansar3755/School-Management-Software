import { Outlet } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa6";
import { CheckCircle2 } from "lucide-react";

const points = [
  "Mark attendance in under a minute",
  "Collect fees and print receipts",
  "Keep parents informed with the daily diary",
];

export default function AuthLayout() {
  return (
    <div className="grid min-h-full lg:grid-cols-2">
      {/* Left: brand panel (sirf bari screen pe) */}
      <div className="hidden flex-col justify-between bg-ink p-12 text-white lg:flex">
        <div className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-amber text-ink">
            <FaGraduationCap size={22} />
          </span>
          <span className="text-xl font-extrabold">SchoolDesk</span>
        </div>

        <div>
          <h1 className="max-w-md text-4xl font-extrabold leading-tight">Your whole school, one desk.</h1>
          <ul className="mt-8 space-y-3 text-white/80">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-amber" /> {p}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-white/50">&copy; {new Date().getFullYear()} SchoolDesk</p>
      </div>

      {/* Right: yahan Login form aayega */}
      <div className="grid place-items-center p-6">
        <Outlet />
      </div>
    </div>
  );
}