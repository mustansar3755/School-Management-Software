import { useState } from "react";
import toast from "react-hot-toast";
import { Save, RotateCcw } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Select from "../components/Select";
import Input from "../components/Input";
import Button from "../components/Button";
import StatusToggle from "../components/StatusToggle";

const classes = [
  "Nursery",
  "KG",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
];
const sections = ["A", "B", "C"];

// Dummy data. Backend banne ke baad ye API se aayega.
const students = [
  { id: 1, rollNo: "101", name: "Ali Raza", className: "5", section: "A" },
  { id: 2, rollNo: "102", name: "Ayesha Khan", className: "5", section: "A" },
  { id: 3, rollNo: "103", name: "Hamza Ahmed", className: "5", section: "A" },
  { id: 4, rollNo: "201", name: "Fatima Noor", className: "5", section: "B" },
  { id: 5, rollNo: "202", name: "Usman Tariq", className: "5", section: "B" },
  { id: 6, rollNo: "301", name: "Zainab Fatima", className: "6", section: "A" },
  { id: 7, rollNo: "302", name: "Hassan Raza", className: "6", section: "A" },
];

const statusStyle = {
  present: "bg-green-50 text-green-700",
  absent: "bg-red-50 text-red-700",
  leave: "bg-amber/20 text-amber-800",
};

export default function Attendance() {
  const [className, setClassName] = useState("5");
  const [section, setSection] = useState("A");
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA")); // aaj ki date (YYYY-MM-DD)
  const [records, setRecords] = useState({}); // { 1: "absent", 3: "leave" }, jo nahi likha wo present

  // Sirf chuni hui class aur section ke students
  const list = students.filter(
    (s) => s.className === className && s.section === section,
  );

  const statusOf = (id) => records[id] || "present";
  const mark = (id, status) => setRecords({ ...records, [id]: status });
  const count = (status) =>
    list.filter((s) => statusOf(s.id) === status).length;

  const handleSave = () => {
    const data = list.map((s) => ({ studentId: s.id, status: statusOf(s.id) }));
    console.log({ className, section, date, data }); // backend ke baad ye API ko jayega
    toast.success("Attendance saved");
  };

  return (
    <>
      <PageHeader
        title="Attendance"
        subtitle="Class chuno aur har student ki hazri lagao"
      />

      {/* Filters */}
      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <Select
          label="Class"
          options={classes}
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <Select
          label="Section"
          options={sections}
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />
        <Input
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Summary */}
      <div className="mb-4 flex flex-wrap gap-2 text-sm">
        {Object.keys(statusStyle).map((status) => (
          <span
            key={status}
            className={`rounded-full px-3 py-1 font-semibold capitalize ${statusStyle[status]}`}
          >
            {status}: {count(status)}
          </span>
        ))}
      </div>

      {/* Students */}
      <div className="rounded-xl border border-line bg-white">
        {list.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-muted">
            Is class aur section mein koi student nahi
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {list.map((s) => (
              <li
                key={s.id}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5"
              >
                <div>
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-xs text-muted">Roll no {s.rollNo}</p>
                </div>
                <StatusToggle
                  value={statusOf(s.id)}
                  onChange={(status) => mark(s.id, status)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Actions */}
      <div className="mt-5 flex justify-end gap-3">
        <Button
          variant="secondary"
          icon={RotateCcw}
          onClick={() => setRecords({})}
        >
          All present
        </Button>
        <Button icon={Save} onClick={handleSave} disabled={list.length === 0}>
          Submit attendance
        </Button>
      </div>
    </>
  );
}
