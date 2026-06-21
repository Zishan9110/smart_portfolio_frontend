import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiBriefcase } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import EmptyState from '../common/EmptyState';
import { formatDuration } from '../../utils/dateHelpers';

export default function ExperienceSection() {
  const experience = useSelector((state) => state.experience.items);
  const sorted = [...experience].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  return (
    <section id="experience" className="relative py-28 sm:py-36">
      <div className="section-container">
        <SectionHeading eyebrow="Experience" title="Where I've worked" />

        {sorted.length === 0 ? (
          <EmptyState icon={FiBriefcase} title="Experience coming soon" />
        ) : (
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-indigo/50 via-white/10 to-transparent sm:-translate-x-1/2" />

            <div className="flex flex-col gap-12">
              {sorted.map((exp, idx) => (
                <motion.div
                  key={exp._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5 }}
                  className={`relative pl-12 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-10 ${
                    idx % 2 === 0 ? '' : 'sm:[&>div:first-child]:order-2'
                  }`}
                >
                  <div className="absolute left-4 sm:left-1/2 top-1.5 -translate-x-1/2 h-3 w-3 rounded-full bg-gradient-accent ring-4 ring-base z-10" />

                  <div className={idx % 2 === 0 ? 'sm:text-right' : ''}>
                    <span className="text-xs font-mono text-accent-cyan">
                      {formatDuration(exp.startDate, exp.endDate, exp.isCurrent)}
                    </span>
                  </div>

                  <div className="glass-card p-5 mt-2 sm:mt-0">
                    <h3 className="font-display font-semibold text-ink text-lg">{exp.position}</h3>
                    <p className="text-sm text-accent-violet mb-2">{exp.company}</p>
                    {exp.description && (
                      <p className="text-sm text-ink-muted leading-relaxed mb-3">{exp.description}</p>
                    )}
                    {exp.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-ink-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
