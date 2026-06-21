import Modal from './Modal';
import { FiAlertTriangle } from 'react-icons/fi';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmLabel = 'Delete',
  isLoading = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" maxWidth="max-w-md">
      <div className="flex flex-col items-center text-center gap-4 -mt-8">
        <div className="h-14 w-14 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">
          <FiAlertTriangle size={26} />
        </div>
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        <p className="text-sm text-ink-muted">{message}</p>
        <div className="flex gap-3 w-full mt-2">
          <button onClick={onClose} className="btn-secondary flex-1" disabled={isLoading}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium text-sm transition-colors disabled:opacity-60"
          >
            {isLoading ? 'Deleting…' : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
