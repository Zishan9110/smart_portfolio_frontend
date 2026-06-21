import { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import { toInputDate } from '../../utils/dateHelpers';

export default function ExperienceFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: '',
    technologies: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        company: initialData.company || '',
        position: initialData.position || '',
        startDate: toInputDate(initialData.startDate),
        endDate: toInputDate(initialData.endDate),
        isCurrent: initialData.isCurrent || false,
        description: initialData.description || '',
        technologies: (initialData.technologies || []).join(', '),
      });
    } else {
      setForm({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        description: '',
        technologies: '',
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      endDate: form.isCurrent ? undefined : form.endDate || undefined,
      technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Experience' : 'Add Experience'} maxWidth="max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-ink-muted mb-2 block">Company</label>
            <input name="company" required value={form.company} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="text-sm text-ink-muted mb-2 block">Position</label>
            <input name="position" required value={form.position} onChange={handleChange} className="input-field" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-ink-muted mb-2 block">Start Date</label>
            <input
              type="date"
              name="startDate"
              required
              value={form.startDate}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="text-sm text-ink-muted mb-2 block">End Date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              disabled={form.isCurrent}
              className="input-field disabled:opacity-40"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-ink-muted">
          <input type="checkbox" name="isCurrent" checked={form.isCurrent} onChange={handleChange} className="accent-accent-indigo" />
          I currently work here
        </label>

        <div>
          <label className="text-sm text-ink-muted mb-2 block">Description</label>
          <textarea
            name="description"
            rows={3}
            value={form.description}
            onChange={handleChange}
            className="input-field resize-none"
          />
        </div>

        <div>
          <label className="text-sm text-ink-muted mb-2 block">Technologies (comma separated)</label>
          <input name="technologies" value={form.technologies} onChange={handleChange} className="input-field" />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {initialData ? 'Save Changes' : 'Add Experience'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
