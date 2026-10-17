const options = [
  { value: "present", label: "Present", active: "bg-green-600 text-white" },
  { value: "absent", label: "Absent", active: "bg-red-600 text-white" },
  { value: "leave", label: "Leave", active: "bg-amber text-ink" },
];

export default function StatusToggle({ value, onChange }) {
  return (
    <div className="inline-flex rounded-lg bg-chalk p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-pressed={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
            value === opt.value ? opt.active : "text-muted hover:text-ink"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}