import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Camera } from "lucide-react";
import Button from "./Button";

export default function ImageUpload({ label, onChange }) {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return toast.error("Sirf image file chuno");
    if (file.size > 2 * 1024 * 1024) return toast.error("Image 2MB se kam honi chahiye");

    setPreview(URL.createObjectURL(file)); // screen pe dikhane ke liye
    onChange(file); // asli file parent (form) ko de di
  };

  const handleRemove = () => {
    URL.revokeObjectURL(preview);
    setPreview(null);
    onChange(null);
    inputRef.current.value = ""; // wahi file dobara chunne par bhi kaam kare
  };

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium">{label}</span>

      <div className="flex items-center gap-4">
        <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full border border-dashed border-line bg-chalk text-muted">
          {preview ? <img src={preview} alt="Preview" className="h-full w-full object-cover" /> : <Camera size={24} />}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="secondary" onClick={() => inputRef.current.click()}>
            {preview ? "Change" : "Upload photo"}
          </Button>
          {preview && (
            <Button type="button" variant="danger" onClick={handleRemove}>
              Remove
            </Button>
          )}
        </div>

        <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </div>

      <p className="mt-1.5 text-xs text-muted">Optional. JPG ya PNG, 2MB se kam.</p>
    </div>
  );
}