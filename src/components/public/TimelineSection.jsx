import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiBriefcase, FiBook, FiAward, FiStar } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import EmptyState from '../common/EmptyState';
import { formatMonthYear } from '../../utils/dateHelpers';

const TYPE_CONFIG = {
  experience: { icon: FiBriefcase, color: 'text-accent-indigo', label: 'Experience' },
  education: { icon: FiBook, color: 'text-accent-violet', label: 'Education' },
  certification: { icon: FiAward, color: 'text-accent-cyan', label: 'Certification' },
  achievement: { icon: FiStar, color: 'text-amber-400', label: 'Achievement' },
};

export default function TimelineSection() {
  const timeline = useSelector((state) => state.timeline.items);

  return (
    <section id="timeline" className="relative py-28 sm:py-36">
      <div className="section-container">
        <SectionHeading
          eyebrow="Journey"
          title="My complete timeline"
          description="Education, experience, certifications, and milestones — all in one place."
        />

        {timeline.length === 0 ? (
          <EmptyState icon={FiStar} title="Timeline will appear here" />
        ) : (
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-accent-indigo/60 via-white/10 to-transparent" />

            <div className="flex flex-col gap-8">
              {timeline.map((item, idx) => {
                const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.achievement;
                const Icon = config.icon;
                return (
                  <motion.div
                    key={`${item.type}-${item.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.45, delay: (idx % 8) * 0.04 }}
                    className="relative pl-14"
                  >
                    <div
                      className={`absolute left-0 top-0 h-10 w-10 rounded-full glass-panel flex items-center justify-center ${config.color} z-10`}
                    >
                      <Icon size={16} />
                    </div>

                    <div className="glass-card p-4">
                      <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                        <span className={`text-[10px] uppercase tracking-wider font-mono ${config.color}`}>
                          {config.label}
                        </span>
                        <span className="text-xs text-ink-faint font-mono">{formatMonthYear(item.date)}</span>
                      </div>
                      <h3 className="font-display font-semibold text-ink">{item.title}</h3>
                      {item.subtitle && <p className="text-sm text-ink-muted">{item.subtitle}</p>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
