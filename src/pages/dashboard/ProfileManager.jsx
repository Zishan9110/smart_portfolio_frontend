import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiSave, FiFileText } from 'react-icons/fi';
import {
  fetchProfile,
  updateProfile,
  uploadProfilePhoto,
  uploadCoverBanner,
  uploadResume,
} from '../../features/profile/profileSlice';
import PageHeader from '../../components/dashboard/PageHeader';
import ImageUploader from '../../components/dashboard/ImageUploader';
import Seo from '../../components/common/Seo';

const SOCIAL_FIELDS = [
  { key: 'github', label: 'GitHub' },
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'leetcode', label: 'LeetCode' },
  { key: 'geeksforgeeks', label: 'GeeksforGeeks' },
  { key: 'twitter', label: 'Twitter / X' },
  { key: 'instagram', label: 'Instagram' },
];

export default function ProfileManager() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);

  const [form, setForm] = useState({
    name: '',
    designation: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    socialLinks: {},
  });
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || '',
        designation: profile.designation || '',
        bio: profile.bio || '',
        email: profile.email || '',
        phone: profile.phone || '',
        location: profile.location || '',
        socialLinks: profile.socialLinks || {},
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSocialChange = (key, value) => {
    setForm((prev) => ({ ...prev, socialLinks: { ...prev.socialLinks, [key]: value } }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(form));
  };

  const handlePhotoSelect = (file) => {
    if (file) dispatch(uploadProfilePhoto(file));
  };

  const handleBannerSelect = (file) => {
    if (file) dispatch(uploadCoverBanner(file));
  };

  const handleResumeSelect = (file) => {
    setResumeFile(file);
    if (file) dispatch(uploadResume(file));
  };

  return (
    <div>
      <Seo title="Profile — Admin" />
      <PageHeader title="Profile" description="Manage your public profile information." />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="glass-card p-6">
            <h3 className="text-sm font-medium text-ink mb-4">Profile Photo</h3>
            <ImageUploader
              currentImageUrl={profile?.profilePhoto?.url}
              onFileSelect={handlePhotoSelect}
              shape="circle"
            />
          </div>

          <div className="glass-card p-6">
            <h3 className="text-sm font-medium text-ink mb-4">Cover Banner</h3>
            <ImageUploader
              currentImageUrl={profile?.coverBanner?.url}
              onFileSelect={handleBannerSelect}
              shape="banner"
            />
          </div>

          <div className="glass-card p-6">
            <h3 className="text-sm font-medium text-ink mb-4">Resume</h3>
            <label className="flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-white/15 hover:border-accent-indigo/50 cursor-pointer transition-colors">
              <FiFileText className="text-accent-cyan shrink-0" />
              <span className="text-sm text-ink-muted truncate">
                {resumeFile?.name || (profile?.resume?.url ? 'Resume uploaded — click to replace' : 'Upload PDF resume')}
              </span>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => handleResumeSelect(e.target.files?.[0])}
              />
            </label>
            {profile?.resume?.url && (
              <a
                href={profile.resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent-cyan hover:underline mt-2 inline-block"
              >
                View current resume →
              </a>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-2 glass-card p-6 flex flex-col gap-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-ink-muted mb-2 block">Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="text-sm text-ink-muted mb-2 block">Designation</label>
              <input
                name="designation"
                value={form.designation}
                onChange={handleChange}
                placeholder="e.g. Full-Stack Developer"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-ink-muted mb-2 block">Bio</label>
            <textarea name="bio" rows={4} value={form.bio} onChange={handleChange} className="input-field resize-none" />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-ink-muted mb-2 block">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="text-sm text-ink-muted mb-2 block">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="text-sm text-ink-muted mb-2 block">Location</label>
              <input name="location" value={form.location} onChange={handleChange} className="input-field" />
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-5">
            <h3 className="text-sm font-medium text-ink mb-4">Social Links</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {SOCIAL_FIELDS.map((field) => (
                <div key={field.key}>
                  <label className="text-xs text-ink-muted mb-1.5 block">{field.label}</label>
                  <input
                    value={form.socialLinks[field.key] || ''}
                    onChange={(e) => handleSocialChange(field.key, e.target.value)}
                    placeholder={`https://...`}
                    className="input-field !py-2 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary self-start mt-2">
            <FiSave size={14} /> Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
