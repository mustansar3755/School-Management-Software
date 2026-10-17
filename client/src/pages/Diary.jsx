import { useState } from "react";
import toast from "react-hot-toast";
import { Send } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Select from "../components/Select";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import DiaryCard from "../components/DiaryCard";

const classes = ["Nursery", "KG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const sections = ["A", "B", "C"];
const subjects = ["Mathematics", "English", "Urdu", "Science", "Islamiat", "Computer", "Social Studies"];

// Dummy data. Backend banne ke baad ye API se aayega.
const initialEntries = [
  { id: 1, className: "5", section: "A", subject: "Mathematics", text: "Exercise 4.2, questions 1 to 10 copy mein complete karo.", date: "15 Oct 2026" },
  { id: 2, className: "6", section: "A", subject: "English", text: "Essay likho: My Best Friend (150 words).\nSpelling test kal hoga.", date: "14 Oct 2026" },
];

export default function Diary() {
  const [entries, setEntries] = useState(initialEntries);
  const [form, setForm] = useState({ className: "5", section: "A", subject: "", text: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      id: Date.now(), // temporary unique id, backend ke baad database dega
      ...form,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    };

    setEntries([newEntry, ...entries]); // nayi entry sab se upar
    setForm({ ...form, subject: "", text: "" }); // class aur section wahi rehne do, agli entry jaldi ho
    toast.success("Diary posted");
  };

  return (
    <>
      <PageHeader title="Daily Diary" subtitle="Homework aur notes parents tak pohanchao" />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: form */}
        <form onSubmit={handleSubmit} className="h-fit space-y-4 rounded-xl border border-line bg-white p-5 lg:col-span-1">
          <h2 className="font-bold">New entry</h2>

          <div className="grid grid-cols-2 gap-3">
            <Select label="Class" name="className" options={classes} value={form.className} onChange={handleChange} />
            <Select label="Section" name="section" options={sections} value={form.section} onChange={handleChange} />
          </div>

          <Select label="Subject" name="subject" options={subjects} placeholder="Select subject" value={form.subject} onChange={handleChange} required />
          <Textarea label="Homework / note" name="text" placeholder="Aaj ka homework likho" value={form.text} onChange={handleChange} required />

          <Button type="submit" icon={Send} className="w-full">
            Post diary
          </Button>
        </form>

        {/* Right: entries */}
        <div className="space-y-4 lg:col-span-2">
          {entries.length === 0 ? (
            <p className="rounded-xl border border-dashed border-line bg-white p-10 text-center text-sm text-muted">Abhi koi diary entry nahi</p>
          ) : (
            entries.map((e) => <DiaryCard key={e.id} entry={e} />)
          )}
        </div>
      </div>
    </>
  );
}