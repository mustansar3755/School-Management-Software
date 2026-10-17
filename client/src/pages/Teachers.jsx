import { useState } from "react";
import { Plus, Search } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Input from "../components/Input";
import DataTable from "../components/DataTable";

// Dummy data. Backend banne ke baad ye API se aayega.
const teachers = [
  { id: 1, name: "Kamran Ali", subject: "Mathematics", qualification: "MSc Mathematics", phone: "0300-1111111", joined: "01 Aug 2022" },
  { id: 2, name: "Sana Malik", subject: "English", qualification: "MA English", phone: "0301-2222222", joined: "15 Mar 2023" },
  { id: 3, name: "Bilal Ahmed", subject: "Science", qualification: "BS Chemistry", phone: "0302-3333333", joined: "01 Sep 2021" },
  { id: 4, name: "Hira Fatima", subject: "Urdu", qualification: "MA Urdu", phone: "0303-4444444", joined: "10 Jan 2024" },
];

const columns = [
  {
    header: "Name",
    key: "name",
    // Naam ke saath gol initial wala avatar
    render: (t) => (
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-soft text-xs font-bold text-brand-dark">
          {t.name[0]}
        </span>
        <span className="font-semibold">{t.name}</span>
      </div>
    ),
  },
  { header: "Subject", key: "subject" },
  { header: "Qualification", key: "qualification" },
  { header: "Phone", key: "phone" },
  { header: "Joined", key: "joined" },
];

export default function Teachers() {
  const [search, setSearch] = useState("");

  const filtered = teachers.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <PageHeader
        title="All Teachers"
        subtitle={`${filtered.length} teachers`}
        action={
          <Button icon={Plus} to="/teachers/add">
            Add teacher
          </Button>
        }
      />

      <div className="mb-4 sm:w-80">
        <Input icon={Search} placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <DataTable columns={columns} rows={filtered} emptyText="Koi teacher nahi mila" />
    </>
  );
}