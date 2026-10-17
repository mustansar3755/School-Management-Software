import { useState } from "react";
import toast from "react-hot-toast";
import { Wallet, CheckCircle2, Clock } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import Select from "../components/Select";
import Badge from "../components/Badge";
import DataTable from "../components/DataTable";

// Dummy data. Backend banne ke baad ye API se aayega.
const initialFees = [
  { id: 1, student: "Ali Raza", className: "5-A", month: "October", amount: 3500, status: "paid" },
  { id: 2, student: "Ayesha Khan", className: "5-A", month: "October", amount: 3500, status: "paid" },
  { id: 3, student: "Hamza Ahmed", className: "5-A", month: "October", amount: 3500, status: "pending" },
  { id: 4, student: "Fatima Noor", className: "5-B", month: "October", amount: 3500, status: "pending" },
  { id: 5, student: "Usman Tariq", className: "5-B", month: "October", amount: 3500, status: "paid" },
  { id: 6, student: "Ali Raza", className: "5-A", month: "September", amount: 3500, status: "paid" },
  { id: 7, student: "Hamza Ahmed", className: "5-A", month: "September", amount: 3500, status: "pending" },
];

const months = ["All", "October", "September"];
const statuses = ["All", "Paid", "Pending"];

const rs = (n) => `Rs. ${n.toLocaleString()}`;

export default function Fees() {
  const [fees, setFees] = useState(initialFees);
  const [month, setMonth] = useState("October");
  const [status, setStatus] = useState("All");

  // Filters ke hisab se list
  const filtered = fees.filter(
    (f) => (month === "All" || f.month === month) && (status === "All" || f.status === status.toLowerCase())
  );

  // Cards ke total, filtered list se hi nikalte hain
  const sum = (list) => list.reduce((total, f) => total + f.amount, 0);
  const collected = sum(filtered.filter((f) => f.status === "paid"));
  const pending = sum(filtered.filter((f) => f.status === "pending"));

  const handleCollect = (fee) => {
    setFees(fees.map((f) => (f.id === fee.id ? { ...f, status: "paid" } : f)));
    toast.success(`${rs(fee.amount)} received from ${fee.student}`);
  };

  // Columns component ke andar hain, kyunke Collect button ko handleCollect chahiye
  const columns = [
    { header: "Student", key: "student", render: (f) => <span className="font-semibold">{f.student}</span> },
    { header: "Class", key: "className" },
    { header: "Month", key: "month" },
    { header: "Amount", key: "amount", render: (f) => rs(f.amount) },
    {
      header: "Status",
      key: "status",
      render: (f) => <Badge tone={f.status === "paid" ? "green" : "amber"}>{f.status === "paid" ? "Paid" : "Pending"}</Badge>,
    },
    {
      header: "Action",
      key: "action",
      render: (f) =>
        f.status === "pending" && (
          <button
            onClick={() => handleCollect(f)}
            className="rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-dark"
          >
            Collect
          </button>
        ),
    },
  ];

  return (
    <>
      <PageHeader title="Fees" subtitle="Fee collection aur pending dues" />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Wallet} label="Total" value={rs(collected + pending)} />
        <StatCard icon={CheckCircle2} label="Collected" value={rs(collected)} color="bg-green-50 text-green-700" />
        <StatCard icon={Clock} label="Pending" value={rs(pending)} color="bg-amber/20 text-amber-800" />
      </div>

      <div className="my-5 grid gap-4 sm:max-w-md sm:grid-cols-2">
        <Select label="Month" options={months} value={month} onChange={(e) => setMonth(e.target.value)} />
        <Select label="Status" options={statuses} value={status} onChange={(e) => setStatus(e.target.value)} />
      </div>

      <DataTable columns={columns} rows={filtered} emptyText="Koi fee record nahi mila" />
    </>
  );
}