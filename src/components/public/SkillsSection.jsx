import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import EmptyState from '../common/EmptyState';
import { FiCode } from 'react-icons/fi';

export default function SkillsSection() {
  const skills = useSelector((state) => state.skills.items);

  const grouped = skills.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="section-container">
        <SectionHeading
          eyebrow="Skills"
          title="Technologies I work with"
          description="A toolkit refined through real production work across the stack."
        />

        {categories.length === 0 ? (
          <EmptyState icon={FiCode} title="Skills coming soon" message="Check back shortly." />
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category, catIdx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: catIdx * 0.05 }}
                className="glass-card p-6"
              >
                <h3 className="text-sm uppercase tracking-wider text-accent-cyan font-mono mb-5">
                  {category}
                </h3>
                <div className="flex flex-col gap-5">
                  {grouped[category].map((skill) => (
                    <SkillBar key={skill._id} skill={skill} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SkillBar({ skill }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-ink font-medium">{skill.name}</span>
        <span className="text-xs text-ink-muted font-mono">{skill.proficiency}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-accent"
        />
      </div>
    </div>
  );
}
