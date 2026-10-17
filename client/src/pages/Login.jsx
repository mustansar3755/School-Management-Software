import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Lock, Hash } from "lucide-react";
import Input from "../components/Input";

export default function Login() {
  const navigate = useNavigate();

  const [schoolCode, setSchoolCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Abhi backend nahi hai, isliye seedha dashboard pe bhej dete hain
    toast.success("Welcome back!");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <h2 className="text-2xl font-extrabold tracking-tight">Log in</h2>
      <p className="mt-1 text-sm text-muted">Enter your details to open your dashboard.</p>

      <div className="mt-6 space-y-4">
        <Input label="School code" icon={Hash} placeholder="SCH-0001" value={schoolCode} onChange={(e) => setSchoolCode(e.target.value)} required />
        <Input label="Email" type="email" icon={Mail} placeholder="you@school.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="Password" type="password" icon={Lock} placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>

      <button type="submit" className="mt-6 w-full rounded-lg bg-brand py-2.5 text-sm font-semibold text-white hover:bg-brand-dark">
        Log in
      </button>
    </form>
  );
}