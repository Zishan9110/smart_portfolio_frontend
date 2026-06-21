import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-7xl sm:text-9xl font-display font-bold text-gradient"
      >
        404
      </motion.h1>
      <p className="text-ink-muted mt-4 mb-8">This page doesn't exist.</p>
      <Link to="/" className="btn-primary">
        Back to home
      </Link>
    </main>
  );
}
