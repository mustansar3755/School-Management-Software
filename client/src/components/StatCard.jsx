export default function StatCard({ icon: Icon, label, value, color = "bg-brand-soft text-brand-dark" }) {
  return (
    <div className="rounded-xl border border-line bg-white p-5">
      <span className={`grid h-10 w-10 place-items-center rounded-lg ${color}`}>
        <Icon size={20} />
      </span>

      <p className="mt-4 text-3xl font-extrabold">{value}</p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}