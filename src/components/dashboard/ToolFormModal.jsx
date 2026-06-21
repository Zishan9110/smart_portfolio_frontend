import { useEffect, useState } from 'react';
import Modal from '../common/Modal';

export default function ToolFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({ name: '', icon: '', category: 'General' });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        icon: initialData.icon || '',
        category: initialData.category || 'General',
      });
    } else {
      setForm({ name: '', icon: '', category: 'General' });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Tool' : 'Add Tool'} maxWidth="max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-ink-muted mb-2 block">Tool Name</label>
          <input name="name" required value={form.name} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="text-sm text-ink-muted mb-2 block">Icon (emoji or image URL, optional)</label>
          <input name="icon" value={form.icon} onChange={handleChange} placeholder="🐳 or https://..." className="input-field" />
        </div>
        <div>
          <label className="text-sm text-ink-muted mb-2 block">Category</label>
          <input name="category" value={form.category} onChange={handleChange} className="input-field" />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {initialData ? 'Save Changes' : 'Add Tool'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
