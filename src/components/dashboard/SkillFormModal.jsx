import { useEffect, useState } from 'react';
import Modal from '../common/Modal';

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 'Programming Languages', 'Tools'];

export default function SkillFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({ name: '', icon: '', proficiency: 70, category: 'Frontend' });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        icon: initialData.icon || '',
        proficiency: initialData.proficiency ?? 70,
        category: initialData.category || 'Frontend',
      });
    } else {
      setForm({ name: '', icon: '', proficiency: 70, category: 'Frontend' });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'proficiency' ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Skill' : 'Add Skill'} maxWidth="max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-ink-muted mb-2 block">Skill Name</label>
          <input name="name" required value={form.name} onChange={handleChange} className="input-field" />
        </div>

        <div>
          <label className="text-sm text-ink-muted mb-2 block">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="input-field">
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-ink-muted mb-2 block">Icon (emoji or image URL, optional)</label>
          <input name="icon" value={form.icon} onChange={handleChange} placeholder="⚛️ or https://..." className="input-field" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-ink-muted">Proficiency</label>
            <span className="text-xs text-accent-cyan font-mono">{form.proficiency}%</span>
          </div>
          <input
            type="range"
            name="proficiency"
            min={0}
            max={100}
            value={form.proficiency}
            onChange={handleChange}
            className="w-full accent-accent-indigo"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {initialData ? 'Save Changes' : 'Add Skill'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
