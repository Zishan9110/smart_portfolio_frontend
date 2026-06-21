import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import Seo from '../../components/common/Seo';
import LoadingScreen from '../../components/common/LoadingScreen';
import Hero from '../../components/public/Hero';
import About from '../../components/public/About';
import SkillsSection from '../../components/public/SkillsSection';
import ProjectsSection from '../../components/public/ProjectsSection';
import ExperienceSection from '../../components/public/ExperienceSection';
import EducationSection from '../../components/public/EducationSection';
import CertificationsSection from '../../components/public/CertificationsSection';
import AchievementsSection from '../../components/public/AchievementsSection';
import TimelineSection from '../../components/public/TimelineSection';
import ToolsSection from '../../components/public/ToolsSection';
import ContactSection from '../../components/public/ContactSection';

import { fetchProjects } from '../../features/projects/projectsSlice';
import { fetchSkills } from '../../features/skills/skillsSlice';
import { fetchExperience } from '../../features/experience/experienceSlice';
import { fetchEducation } from '../../features/education/educationSlice';
import { fetchCertifications } from '../../features/certifications/certificationsSlice';
import { fetchAchievements } from '../../features/achievements/achievementsSlice';
import { fetchTools } from '../../features/tools/toolsSlice';
import { fetchTimeline } from '../../features/timeline/timelineSlice';

export default function PortfolioHome() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    Promise.all([
      dispatch(fetchProjects({ limit: 9, sortBy: 'displayOrder', order: 'asc' })),
      dispatch(fetchSkills()),
      dispatch(fetchExperience()),
      dispatch(fetchEducation()),
      dispatch(fetchCertifications()),
      dispatch(fetchAchievements()),
      dispatch(fetchTools()),
      dispatch(fetchTimeline()),
    ]).finally(() => {
      // Minimum loader duration for a smoother perceived transition
      setTimeout(() => setShowLoader(false), 500);
    });
  }, [dispatch]);

  return (
    <>
      <Seo
        title={profile?.name ? `${profile.name} — ${profile.designation || 'Portfolio'}` : 'Portfolio'}
        description={profile?.bio || 'Full-stack developer portfolio.'}
      />

      <AnimatePresence>{showLoader && <LoadingScreen key="loader" />}</AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: showLoader ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <About />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <CertificationsSection />
        <AchievementsSection />
        <TimelineSection />
        <ToolsSection />
        <ContactSection />
      </motion.main>
    </>
  );
}
