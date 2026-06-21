import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiArrowDown, FiDownload, FiMail } from 'react-icons/fi';
import ParticleField from './ParticleField';
import Hero3DShape from './Hero3DShape';
import TypingText from './TypingText';

export default function Hero() {
  const profile = useSelector((state) => state.profile.data);

  const roles = ['Full-Stack Developer', 'MERN Stack Engineer', 'UI/UX Enthusiast', 'Problem Solver'];

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Animated gradient backdrop */}
      <div
        className="absolute inset-0 opacity-60 bg-[length:200%_200%] animate-gradient"
        style={{
          backgroundImage:
            'linear-gradient(120deg, rgba(99,102,241,0.12), rgba(168,85,247,0.08), rgba(34,211,238,0.1))',
        }}
        aria-hidden="true"
      />

      {/* 3D wireframe shape, anchored right on desktop */}
      <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-70">
        <Hero3DShape />
      </div>

      <ParticleField />

      <div className="section-container relative z-10 grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-ink-muted">Available for new opportunities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight text-ink text-balance"
          >
            Hi, I'm{' '}
            <span className="text-gradient">{profile?.name || 'Your Name'}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-xl sm:text-2xl md:text-3xl font-display font-medium text-ink-muted h-10"
          >
            <TypingText words={profile?.designation ? [profile.designation, ...roles] : roles} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 text-base sm:text-lg text-ink-muted max-w-xl leading-relaxed text-balance"
          >
            {profile?.bio ||
              'I build fast, accessible, and beautifully crafted web applications from end to end — turning ideas into production-ready products.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button onClick={scrollToProjects} className="btn-primary">
              View My Work
              <FiArrowDown className="rotate-[-45deg]" />
            </button>
            {profile?.resume?.url && (
              <a href={profile.resume.url} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <FiDownload /> Resume
              </a>
            )}
            <a href="#contact" className="btn-secondary">
              <FiMail /> Contact
            </a>
          </motion.div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        onClick={scrollToProjects}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-faint hover:text-ink-muted transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <FiArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
