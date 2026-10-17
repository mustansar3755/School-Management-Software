import Badge from "./Badge";

export default function DiaryCard({ entry }) {
  return (
    <div className="rounded-xl border border-line bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <Badge tone="blue">
            Class {entry.className}-{entry.section}
          </Badge>
          <Badge>{entry.subject}</Badge>
        </div>
        <span className="text-xs text-muted">{entry.date}</span>
      </div>

      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed">{entry.text}</p>
    </div>
  );
}