import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiTool } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import EmptyState from '../common/EmptyState';

export default function ToolsSection() {
  const tools = useSelector((state) => state.tools.items);

  return (
    <section id="tools" className="relative py-28 sm:py-36">
      <div className="section-container">
        <SectionHeading eyebrow="Toolbox" title="Tools & technologies" />

        {tools.length === 0 ? (
          <EmptyState icon={FiTool} title="Tools coming soon" />
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {tools.map((tool, idx) => (
              <motion.div
                key={tool._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: (idx % 12) * 0.03 }}
                whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
                className="glass-card aspect-square flex flex-col items-center justify-center gap-2 p-3 cursor-default"
              >
                {tool.icon ? (
                  /^https?:\/\//.test(tool.icon) ? (
                    <img src={tool.icon} alt={tool.name} className="h-8 w-8 object-contain" loading="lazy" />
                  ) : (
                    <span className="text-2xl">{tool.icon}</span>
                  )
                ) : (
                  <FiTool className="text-accent-cyan" size={22} />
                )}
                <span className="text-[11px] text-ink-muted text-center leading-tight">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
