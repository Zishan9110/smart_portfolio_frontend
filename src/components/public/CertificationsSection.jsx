import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiAward, FiExternalLink } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import EmptyState from '../common/EmptyState';
import { formatDate } from '../../utils/dateHelpers';

export default function CertificationsSection() {
  const certifications = useSelector((state) => state.certifications.items);

  return (
    <section id="certifications" className="relative py-28 sm:py-36">
      <div className="section-container">
        <SectionHeading eyebrow="Certifications" title="Credentials & courses" />

        {certifications.length === 0 ? (
          <EmptyState icon={FiAward} title="Certifications coming soon" />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (idx % 6) * 0.06 }}
                className="glass-card p-5 flex flex-col"
              >
                {cert.image?.url ? (
                  <img
                    src={cert.image.url}
                    alt={cert.name}
                    className="w-full h-36 object-cover rounded-lg mb-4"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-36 rounded-lg bg-base-surface flex items-center justify-center mb-4">
                    <FiAward className="text-accent-cyan" size={28} />
                  </div>
                )}
                <h3 className="font-display font-semibold text-ink">{cert.name}</h3>
                <p className="text-sm text-accent-violet mb-1">{cert.organization}</p>
                <p className="text-xs text-ink-muted mb-3">{formatDate(cert.issueDate)}</p>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 text-xs text-accent-cyan hover:underline"
                  >
                    View credential <FiExternalLink size={12} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
