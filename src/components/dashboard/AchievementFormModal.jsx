import { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import ImageUploader from './ImageUploader';
import { toInputDate } from '../../utils/dateHelpers';

export default function AchievementFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({ title: '', description: '', date: '' });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        date: toInputDate(initialData.date),
      });
    } else {
      setForm({ title: '', description: '', date: '' });
    }
    setImageFile(null);
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (imageFile) formData.append('badgeImage', imageFile);
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Achievement' : 'Add Achievement'} maxWidth="max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <ImageUploader
          label="Badge Image"
          currentImageUrl={initialData?.badgeImage?.url}
          onFileSelect={setImageFile}
          shape="square"
        />

        <div>
          <label className="text-sm text-ink-muted mb-2 block">Achievement Title</label>
          <input name="title" required value={form.title} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="text-sm text-ink-muted mb-2 block">Date</label>
          <input type="date" name="date" required value={form.date} onChange={handleChange} className="input-field" />
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
            {initialData ? 'Save Changes' : 'Add Achievement'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
