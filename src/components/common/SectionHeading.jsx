import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const alignClass = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`flex flex-col gap-3 max-w-2xl ${alignClass} mb-14`}
    >
      {eyebrow && <span className="label-eyebrow">{eyebrow}</span>}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-ink text-balance tracking-tight">
        {title}
      </h2>
      {description && <p className="text-ink-muted text-base sm:text-lg leading-relaxed">{description}</p>}
    </motion.div>
  );
}
