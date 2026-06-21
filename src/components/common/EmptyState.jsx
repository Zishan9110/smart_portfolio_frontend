export default function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      {Icon && (
        <div className="h-16 w-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-ink-faint mb-4">
          <Icon size={28} />
        </div>
      )}
      <h3 className="text-base font-medium text-ink mb-1">{title}</h3>
      {message && <p className="text-sm text-ink-muted max-w-sm mb-4">{message}</p>}
      {action}
    </div>
  );
}
