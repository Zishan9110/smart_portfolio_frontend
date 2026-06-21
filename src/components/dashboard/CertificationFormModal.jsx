import { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import ImageUploader from './ImageUploader';
import { toInputDate } from '../../utils/dateHelpers';

export default function CertificationFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({ name: '', organization: '', issueDate: '', credentialUrl: '' });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        organization: initialData.organization || '',
        issueDate: toInputDate(initialData.issueDate),
        credentialUrl: initialData.credentialUrl || '',
      });
    } else {
      setForm({ name: '', organization: '', issueDate: '', credentialUrl: '' });
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
    if (imageFile) formData.append('image', imageFile);
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Certification' : 'Add Certification'} maxWidth="max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <ImageUploader
          label="Certificate Image"
          currentImageUrl={initialData?.image?.url}
          onFileSelect={setImageFile}
          shape="banner"
        />

        <div>
          <label className="text-sm text-ink-muted mb-2 block">Certificate Name</label>
          <input name="name" required value={form.name} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="text-sm text-ink-muted mb-2 block">Organization</label>
          <input name="organization" required value={form.organization} onChange={handleChange} className="input-field" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-ink-muted mb-2 block">Issue Date</label>
            <input type="date" name="issueDate" required value={form.issueDate} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="text-sm text-ink-muted mb-2 block">Credential URL</label>
            <input name="credentialUrl" value={form.credentialUrl} onChange={handleChange} className="input-field" />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {initialData ? 'Save Changes' : 'Add Certification'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
