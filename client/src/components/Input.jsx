export default function Input({ label, icon: Icon, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>

      <span className="relative block">
        {Icon && <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />}

        <input
          {...props}
          className={`w-full rounded-lg border border-line bg-white py-2.5 pr-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 ${
            Icon ? "pl-9" : "pl-3"
          }`}
        />
      </span>
    </label>
  );
}