import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiBook } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import EmptyState from '../common/EmptyState';
import { formatDuration } from '../../utils/dateHelpers';

export default function EducationSection() {
  const education = useSelector((state) => state.education.items);
  const sorted = [...education].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  return (
    <section id="education" className="relative py-28 sm:py-36">
      <div className="section-container">
        <SectionHeading eyebrow="Education" title="Academic background" />

        {sorted.length === 0 ? (
          <EmptyState icon={FiBook} title="Education info coming soon" />
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {sorted.map((edu, idx) => (
              <motion.div
                key={edu._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="glass-card p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-xl bg-gradient-accent/20 border border-accent-indigo/30 flex items-center justify-center shrink-0">
                    <FiBook className="text-accent-cyan" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-ink text-lg">{edu.degree}</h3>
                    <p className="text-sm text-accent-violet mb-1">{edu.institution}</p>
                    <span className="text-xs font-mono text-ink-muted">
                      {formatDuration(edu.startDate, edu.endDate, edu.isCurrent)}
                    </span>
                    {edu.grade && (
                      <p className="text-xs text-ink-muted mt-2">
                        Grade: <span className="text-ink">{edu.grade}</span>
                      </p>
                    )}
                    {edu.description && (
                      <p className="text-sm text-ink-muted mt-3 leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
