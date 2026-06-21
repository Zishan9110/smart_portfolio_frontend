import { motion } from 'framer-motion';
import AnimatedCounter from '../common/AnimatedCounter';

export default function StatCard({ icon: Icon, label, value, suffix = '', accent = 'indigo', delay = 0 }) {
  const accentMap = {
    indigo: 'from-accent-indigo/20 to-accent-indigo/5 text-accent-indigo',
    violet: 'from-accent-violet/20 to-accent-violet/5 text-accent-violet',
    cyan: 'from-accent-cyan/20 to-accent-cyan/5 text-accent-cyan',
    amber: 'from-amber-500/20 to-amber-500/5 text-amber-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center ${accentMap[accent]}`}>
          <Icon size={18} />
        </div>
      </div>
      <div className="text-2xl font-display font-bold text-ink">
        <AnimatedCounter value={value} suffix={suffix} />
      </div>
      <p className="text-xs text-ink-muted mt-1">{label}</p>
    </motion.div>
  );
}
