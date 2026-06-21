import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-base">
      <div className="relative flex flex-col items-center gap-6">
        <motion.div
          className="relative h-16 w-16"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent-indigo border-r-accent-violet" />
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-accent-cyan" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs uppercase tracking-[0.3em] text-ink-muted font-mono"
        >
          Loading
        </motion.p>
      </div>
    </div>
  );
}
