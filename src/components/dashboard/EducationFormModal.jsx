import { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import { toInputDate } from '../../utils/dateHelpers';

export default function EducationFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    degree: '',
    institution: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    grade: '',
    description: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        degree: initialData.degree || '',
        institution: initialData.institution || '',
        startDate: toInputDate(initialData.startDate),
        endDate: toInputDate(initialData.endDate),
        isCurrent: initialData.isCurrent || false,
        grade: initialData.grade || '',
        description: initialData.description || '',
      });
    } else {
      setForm({ degree: '', institution: '', startDate: '', endDate: '', isCurrent: false, grade: '', description: '' });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, endDate: form.isCurrent ? undefined : form.endDate || undefined });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Education' : 'Add Education'} maxWidth="max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-ink-muted mb-2 block">Degree</label>
          <input name="degree" required value={form.degree} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="text-sm text-ink-muted mb-2 block">Institution</label>
          <input name="institution" required value={form.institution} onChange={handleChange} className="input-field" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-ink-muted mb-2 block">Start Date</label>
            <input type="date" name="startDate" required value={form.startDate} onChange={handleChange} className="input-field" />
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
          Currently studying here
        </label>

        <div>
          <label className="text-sm text-ink-muted mb-2 block">Grade (optional)</label>
          <input name="grade" value={form.grade} onChange={handleChange} placeholder="e.g. 3.8 GPA" className="input-field" />
        </div>

        <div>
          <label className="text-sm text-ink-muted mb-2 block">Description</label>
          <textarea name="description" rows={3} value={form.description} onChange={handleChange} className="input-field resize-none" />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {initialData ? 'Save Changes' : 'Add Education'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
