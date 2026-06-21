import { useEffect, useState } from 'react';
import { FiX, FiPlus } from 'react-icons/fi';
import Modal from '../common/Modal';

const CATEGORIES = ['Web Development', 'Mobile App', 'Full-Stack', 'Frontend', 'Backend', 'Other'];

export default function ProjectFormModal({ isOpen, onClose, onSubmit, initialData, onDeleteImage }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Web Development',
    technologies: '',
    githubLink: '',
    liveLink: '',
    featured: false,
    displayOrder: 0,
  });
  const [newImages, setNewImages] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'Web Development',
        technologies: (initialData.technologies || []).join(', '),
        githubLink: initialData.githubLink || '',
        liveLink: initialData.liveLink || '',
        featured: initialData.featured || false,
        displayOrder: initialData.displayOrder || 0,
      });
    } else {
      setForm({
        title: '',
        description: '',
        category: 'Web Development',
        technologies: '',
        githubLink: '',
        liveLink: '',
        featured: false,
        displayOrder: 0,
      });
    }
    setNewImages([]);
    setNewImagePreviews([]);
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImagesSelect = (e) => {
    const files = Array.from(e.target.files || []);
    setNewImages((prev) => [...prev, ...files]);
    setNewImagePreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeNewImage = (idx) => {
    setNewImages((prev) => prev.filter((_, i) => i !== idx));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('category', form.category);
    formData.append(
      'technologies',
      JSON.stringify(form.technologies.split(',').map((t) => t.trim()).filter(Boolean))
    );
    formData.append('githubLink', form.githubLink);
    formData.append('liveLink', form.liveLink);
    formData.append('featured', form.featured);
    formData.append('displayOrder', form.displayOrder);
    newImages.forEach((img) => formData.append('images', img));

    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Project' : 'Add Project'} maxWidth="max-w-3xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-ink-muted mb-2 block">Title</label>
          <input name="title" required value={form.title} onChange={handleChange} className="input-field" />
        </div>

        <div>
          <label className="text-sm text-ink-muted mb-2 block">Description</label>
          <textarea
            name="description"
            required
            rows={4}
            value={form.description}
            onChange={handleChange}
            className="input-field resize-none"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
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
            <label className="text-sm text-ink-muted mb-2 block">Display Order</label>
            <input
              type="number"
              name="displayOrder"
              value={form.displayOrder}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-ink-muted mb-2 block">Technologies (comma separated)</label>
          <input
            name="technologies"
            value={form.technologies}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            className="input-field"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-ink-muted mb-2 block">GitHub Link</label>
            <input name="githubLink" value={form.githubLink} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="text-sm text-ink-muted mb-2 block">Live Link</label>
            <input name="liveLink" value={form.liveLink} onChange={handleChange} className="input-field" />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-ink-muted">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="accent-accent-indigo" />
          Mark as featured project
        </label>

        <div>
          <label className="text-sm text-ink-muted mb-2 block">Images</label>

          {initialData?.images?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {initialData.images.map((img) => (
                <div key={img._id || img.public_id} className="relative h-20 w-20 rounded-lg overflow-hidden group">
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => onDeleteImage(initialData._id, img._id)}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  >
                    <FiX className="text-white" size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {newImagePreviews.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {newImagePreviews.map((src, idx) => (
                <div key={src} className="relative h-20 w-20 rounded-lg overflow-hidden group">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeNewImage(idx)}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  >
                    <FiX className="text-white" size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-white/15 hover:border-accent-indigo/50 cursor-pointer transition-colors text-sm text-ink-muted">
            <FiPlus size={14} /> Add images
            <input type="file" accept="image/*" multiple onChange={handleImagesSelect} className="hidden" />
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {initialData ? 'Save Changes' : 'Create Project'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
