import { FiEdit2, FiTrash2 } from 'react-icons/fi';

/**
 * Generic list rendering for simple CRUD managers (Skills, Education, Tools, etc).
 * `columns` is an array of { label, render(item) }.
 */
export default function CrudList({ items, columns, onEdit, onDelete }) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] text-left">
              {columns.map((col) => (
                <th key={col.label} className="px-5 py-3 text-xs font-medium text-ink-muted uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
              <th className="px-5 py-3 text-xs font-medium text-ink-muted uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]">
                {columns.map((col) => (
                  <td key={col.label} className="px-5 py-3.5 text-ink">
                    {col.render(item)}
                  </td>
                ))}
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-white/[0.06] transition-colors"
                    >
                      <FiEdit2 size={14} />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="p-2 rounded-lg text-ink-muted hover:text-red-400 hover:bg-white/[0.06] transition-colors"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
