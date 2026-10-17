import { useState } from "react";
import { Plus, Search } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Input from "../components/Input";
import DataTable from "../components/DataTable";

// Dummy data. Backend banne ke baad ye API se aayega.
const students = [
  { id: 1, rollNo: "101", name: "Ali Raza", className: "5-A", father: "Raza Hussain", phone: "0300-1234567" },
  { id: 2, rollNo: "102", name: "Ayesha Khan", className: "5-A", father: "Imran Khan", phone: "0301-2345678" },
  { id: 3, rollNo: "201", name: "Hamza Ahmed", className: "6-B", father: "Ahmed Ali", phone: "0302-3456789" },
  { id: 4, rollNo: "202", name: "Fatima Noor", className: "6-B", father: "Noor Muhammad", phone: "0303-4567890" },
  { id: 5, rollNo: "301", name: "Usman Tariq", className: "7-A", father: "Tariq Mehmood", phone: "0304-5678901" },
];

// Table ke columns
const columns = [
  { header: "Roll no", key: "rollNo" },
  { header: "Name", key: "name", render: (s) => <span className="font-semibold">{s.name}</span> },
  { header: "Class", key: "className" },
  { header: "Father name", key: "father" },
  { header: "Phone", key: "phone" },
];

export default function Students() {
  const [search, setSearch] = useState("");

  // Search box mein jo likha hai, uske hisab se list chhoti ho jati hai
  const filtered = students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <PageHeader
        title="All Students"
        subtitle={`${filtered.length} students`}
        action={
          <Button icon={Plus} to="/students/add">
            Add student
          </Button>
        }
      />

      <div className="mb-4 sm:w-80">
        <Input icon={Search} placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <DataTable columns={columns} rows={filtered} emptyText="Koi student nahi mila" />
    </>
  );
}