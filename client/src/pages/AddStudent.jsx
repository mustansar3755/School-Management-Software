import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PageHeader from "../components/PageHeader";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import ImageUpload from "../components/ImageUpload";

const classes = ["Nursery", "KG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const sections = ["A", "B", "C"];

export default function AddStudent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    father: "",
    rollNo: "",
    gender: "",
    className: "",
    section: "",
    phone: "",
    address: "",
  });

  // Image alag state mein, kyunke ye text nahi balki file hai
  const [image, setImage] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...form, image }); // backend ke baad ye API ko jayega
    toast.success("Student added");
    navigate("/students");
  };

  return (
    <>
      <PageHeader title="Add Student" subtitle="Naye student ka admission" />

      <form onSubmit={handleSubmit} className="max-w-3xl rounded-xl border border-line bg-white p-5 sm:p-6">
        <ImageUpload label="Profile photo" onChange={setImage} />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Input label="Student name" name="name" value={form.name} onChange={handleChange} required />
          <Input label="Father name" name="father" value={form.father} onChange={handleChange} required />
          <Input label="Roll no" name="rollNo" value={form.rollNo} onChange={handleChange} required />
          <Select label="Gender" name="gender" options={["Male", "Female"]} placeholder="Select gender" value={form.gender} onChange={handleChange} required />
          <Select label="Class" name="className" options={classes} placeholder="Select class" value={form.className} onChange={handleChange} required />
          <Select label="Section" name="section" options={sections} placeholder="Select section" value={form.section} onChange={handleChange} required />
          <Input label="Phone" name="phone" placeholder="0300-1234567" value={form.phone} onChange={handleChange} />
          <Input label="Address" name="address" value={form.address} onChange={handleChange} />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" to="/students">Cancel</Button>
          <Button type="submit">Save student</Button>
        </div>
      </form>
    </>
  );
}