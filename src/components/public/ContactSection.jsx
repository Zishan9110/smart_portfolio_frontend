import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiMapPin, FiDownload, FiGithub, FiLinkedin } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { submitContactForm } from '../../features/contact/contactSlice';

export default function ContactSection() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const submitStatus = useSelector((state) => state.contact.submitStatus);

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(submitContactForm(form));
    if (submitContactForm.fulfilled.match(result)) {
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div className="section-container">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          description="Have a project in mind or just want to say hi? My inbox is always open."
        />

        <div className="grid md:grid-cols-12 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 flex flex-col gap-4"
          >
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="glass-card p-5 flex items-center gap-4 group">
                <div className="h-11 w-11 rounded-xl bg-gradient-accent/20 flex items-center justify-center text-accent-cyan shrink-0">
                  <FiMail />
                </div>
                <div>
                  <p className="text-xs text-ink-muted">Email</p>
                  <p className="text-sm text-ink group-hover:text-accent-cyan transition-colors">{profile.email}</p>
                </div>
              </a>
            )}

            {profile?.location && (
              <div className="glass-card p-5 flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-gradient-accent/20 flex items-center justify-center text-accent-cyan shrink-0">
                  <FiMapPin />
                </div>
                <div>
                  <p className="text-xs text-ink-muted">Location</p>
                  <p className="text-sm text-ink">{profile.location}</p>
                </div>
              </div>
            )}

            {profile?.resume?.url && (
              <a
                href={profile.resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-5 flex items-center gap-4 group"
              >
                <div className="h-11 w-11 rounded-xl bg-gradient-accent/20 flex items-center justify-center text-accent-cyan shrink-0">
                  <FiDownload />
                </div>
                <div>
                  <p className="text-xs text-ink-muted">Resume</p>
                  <p className="text-sm text-ink group-hover:text-accent-cyan transition-colors">Download PDF</p>
                </div>
              </a>
            )}

            <div className="flex gap-3 mt-2">
              {profile?.socialLinks?.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-full glass-card text-ink-muted hover:text-ink"
                >
                  <FiGithub size={16} />
                </a>
              )}
              {profile?.socialLinks?.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-full glass-card text-ink-muted hover:text-ink"
                >
                  <FiLinkedin size={16} />
                </a>
              )}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="md:col-span-7 glass-panel p-6 sm:p-8 flex flex-col gap-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className="input-field"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              className="input-field"
            />
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              className="input-field resize-none"
            />
            <button type="submit" disabled={submitStatus === 'loading'} className="btn-primary self-start disabled:opacity-60">
              {submitStatus === 'loading' ? 'Sending…' : 'Send message'}
              <FiSend size={14} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
