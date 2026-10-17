import { Users, GraduationCap, CalendarCheck, Wallet } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";


// Dummy data. Backend banne ke baad ye API se aayega.
const stats = [
  { icon: Users, label: "Total students", value: "342" },
  { icon: GraduationCap, label: "Teachers", value: "24", color: "bg-sky-50 text-sky-700" },
  { icon: CalendarCheck, label: "Present today", value: "318", color: "bg-green-50 text-green-700" },
  { icon: Wallet, label: "Fees pending", value: "Rs. 85,000", color: "bg-amber/20 text-amber-800" },
];

const recentPayments = [
  { id: 1, student: "Ali Raza", amount: 3500, date: "15 Oct 2026" },
  { id: 2, student: "Ayesha Khan", amount: 3500, date: "15 Oct 2026" },
  { id: 3, student: "Hamza Ahmed", amount: 4000, date: "14 Oct 2026" },
  { id: 4, student: "Fatima Noor", amount: 3000, date: "14 Oct 2026" },
];

export default function Dashboard() {
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Aaj ka overview" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-line bg-white">
        <h2 className="border-b border-line px-5 py-4 font-bold">Recent fee payments</h2>

        <ul className="divide-y divide-line">
          {recentPayments.map((p) => (
            <li key={p.id} className="flex items-center justify-between px-5 py-3.5">
              <div>
                <p className="font-semibold">{p.student}</p>
                <p className="text-xs text-muted">{p.date}</p>
              </div>
              <p className="font-bold text-brand-dark">Rs. {p.amount.toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}