export default function DataTable({
  columns,
  rows,
  emptyText = "No Record Found",
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-line bg-chalk text-xs text-muted">
          <tr>
            {columns.map((col) => (
              <th key={col.header} className="px-5 py-3 font-semibold">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-line">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-chalk/60">
              {columns.map((col) => (
                <td key={col.header} className="px-5 py-3.5">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}

          {rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-5 py-10 text-center text-muted"
              >
                {emptyText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
