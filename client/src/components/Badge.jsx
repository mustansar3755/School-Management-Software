const tones = {
  green: "bg-green-50 text-green-700",
  red: "bg-red-50 text-red-700",
  amber: "bg-amber/20 text-amber-800",
  blue: "bg-brand-soft text-brand-dark",
  gray: "bg-black/5 text-muted",
};

export default function Badge({ tone = "gray", children }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}