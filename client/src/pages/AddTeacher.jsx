import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PageHeader from "../components/PageHeader";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import ImageUpload from "../components/ImageUpload";

const subjects = ["Mathematics", "English", "Urdu", "Science", "Islamiat", "Computer", "Social Studies"];

export default function AddTeacher() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    gender: "",
    subject: "",
    qualification: "",
    phone: "",
    email: "",
    joined: "",
    address: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...form, image }); // backend ke baad ye API ko jayega
    toast.success("Teacher added");
    navigate("/teachers");
  };

  return (
    <>
      <PageHeader title="Add Teacher" subtitle="Naye teacher ki details" />

      <form onSubmit={handleSubmit} className="max-w-3xl rounded-xl border border-line bg-white p-5 sm:p-6">
        <ImageUpload label="Profile photo" onChange={setImage} />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Input label="Teacher name" name="name" value={form.name} onChange={handleChange} required />
          <Select label="Gender" name="gender" options={["Male", "Female"]} placeholder="Select gender" value={form.gender} onChange={handleChange} required />
          <Select label="Subject" name="subject" options={subjects} placeholder="Select subject" value={form.subject} onChange={handleChange} required />
          <Input label="Qualification" name="qualification" placeholder="e.g. MSc Mathematics" value={form.qualification} onChange={handleChange} required />
          <Input label="Phone" name="phone" placeholder="0300-1234567" value={form.phone} onChange={handleChange} required />
          <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
          <Input label="Joining date" name="joined" type="date" value={form.joined} onChange={handleChange} required />
          <Input label="Address" name="address" value={form.address} onChange={handleChange} />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" to="/teachers">Cancel</Button>
          <Button type="submit">Save teacher</Button>
        </div>
      </form>
    </>
  );
}