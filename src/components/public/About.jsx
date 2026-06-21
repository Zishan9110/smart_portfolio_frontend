import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import AnimatedCounter from '../common/AnimatedCounter';

export default function About() {
  const profile = useSelector((state) => state.profile.data);
  const projects = useSelector((state) => state.projects.items);
  const experience = useSelector((state) => state.experience.items);

  const yearsExperience = experience.length
    ? Math.max(
        1,
        new Date().getFullYear() -
          new Date(Math.min(...experience.map((e) => new Date(e.startDate).getTime()))).getFullYear()
      )
    : 0;

  const stats = [
    { label: 'Projects Shipped', value: projects.length || 0, suffix: '+' },
    { label: 'Years Experience', value: yearsExperience, suffix: '+' },
    { label: 'Happy Clients', value: 12, suffix: '+' },
  ];

  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="section-container">
        <SectionHeading eyebrow="About" title="A little about my journey" align="center" />

        <div className="grid md:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="md:col-span-5 flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-accent rounded-3xl blur-2xl opacity-20" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden glass-panel">
                {profile?.profilePhoto?.url ? (
                  <img
                    src={profile.profilePhoto.url}
                    alt={profile?.name || 'Profile'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-base-surface text-6xl font-display font-bold text-gradient">
                    {profile?.name?.[0] || '?'}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-7"
          >
            <p className="text-ink-muted text-base sm:text-lg leading-relaxed whitespace-pre-line">
              {profile?.bio ||
                'Passionate developer with a love for crafting elegant solutions to complex problems. I specialize in building full-stack applications with modern technologies, always focused on performance, accessibility, and clean code.'}
            </p>

            <div className="flex flex-col gap-3 mt-8">
              {profile?.location && (
                <div className="flex items-center gap-3 text-sm text-ink-muted">
                  <FiMapPin className="text-accent-cyan shrink-0" />
                  {profile.location}
                </div>
              )}
              {profile?.email && (
                <div className="flex items-center gap-3 text-sm text-ink-muted">
                  <FiMail className="text-accent-cyan shrink-0" />
                  {profile.email}
                </div>
              )}
              {profile?.phone && (
                <div className="flex items-center gap-3 text-sm text-ink-muted">
                  <FiPhone className="text-accent-cyan shrink-0" />
                  {profile.phone}
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-gradient">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-ink-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
