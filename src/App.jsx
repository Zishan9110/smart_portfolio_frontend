import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { fetchCurrentUser } from './features/auth/authSlice';

import ProtectedRoute from './components/common/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

import PortfolioHome from './pages/public/PortfolioHome';
import ProjectDetail from './pages/public/ProjectDetail';
import NotFound from './pages/public/NotFound';

import AdminLogin from './pages/dashboard/AdminLogin';
import DashboardHome from './pages/dashboard/DashboardHome';
import ProfileManager from './pages/dashboard/ProfileManager';
import ProjectsManager from './pages/dashboard/ProjectsManager';
import SkillsManager from './pages/dashboard/SkillsManager';
import ExperienceManager from './pages/dashboard/ExperienceManager';
import EducationManager from './pages/dashboard/EducationManager';
import CertificationsManager from './pages/dashboard/CertificationsManager';
import AchievementsManager from './pages/dashboard/AchievementsManager';
import TimelineView from './pages/dashboard/TimelineView';
import ToolsManager from './pages/dashboard/ToolsManager';
import MessagesManager from './pages/dashboard/MessagesManager';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#16161F',
            color: '#F5F5F7',
            border: '1px solid #23232E',
          },
        }}
      />
      <Routes>
        {/* Public portfolio site */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin auth */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin dashboard (protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<ProfileManager />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="skills" element={<SkillsManager />} />
          <Route path="experience" element={<ExperienceManager />} />
          <Route path="education" element={<EducationManager />} />
          <Route path="certifications" element={<CertificationsManager />} />
          <Route path="achievements" element={<AchievementsManager />} />
          <Route path="timeline" element={<TimelineView />} />
          <Route path="tools" element={<ToolsManager />} />
          <Route path="messages" element={<MessagesManager />} />
        </Route>
      </Routes>
    </>
  );
}
