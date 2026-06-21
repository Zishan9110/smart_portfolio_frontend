import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import EmptyState from '../common/EmptyState';
import { formatDate } from '../../utils/dateHelpers';

export default function AchievementsSection() {
  const achievements = useSelector((state) => state.achievements.items);

  return (
    <section id="achievements" className="relative py-28 sm:py-36">
      <div className="section-container">
        <SectionHeading eyebrow="Achievements" title="Milestones & recognition" />

        {achievements.length === 0 ? (
          <EmptyState icon={FiAward} title="Achievements coming soon" />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((ach, idx) => (
              <motion.div
                key={ach._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: (idx % 6) * 0.06 }}
                whileHover={{ y: -4 }}
                className="glass-card p-5 text-center"
              >
                <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-accent/15 border border-accent-indigo/30 flex items-center justify-center mb-4 overflow-hidden">
                  {ach.badgeImage?.url ? (
                    <img src={ach.badgeImage.url} alt={ach.title} className="w-full h-full object-cover" />
                  ) : (
                    <FiAward className="text-accent-cyan" size={26} />
                  )}
                </div>
                <h3 className="font-display font-semibold text-ink mb-1">{ach.title}</h3>
                <p className="text-xs text-ink-muted mb-2">{formatDate(ach.date)}</p>
                {ach.description && <p className="text-sm text-ink-muted leading-relaxed">{ach.description}</p>}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
