export default function Textarea({ label, rows = 4, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium">{label}</span>}

      <textarea
        rows={rows}
        {...props}
        className="w-full resize-y rounded-lg border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
    </label>
  );
}