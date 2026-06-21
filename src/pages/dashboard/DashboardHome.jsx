import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { FiFolder, FiCode, FiEye, FiMail, FiStar } from 'react-icons/fi';

import StatCard from '../../components/dashboard/StatCard';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import Seo from '../../components/common/Seo';
import {
  fetchDashboardStats,
  fetchProjectAnalytics,
  fetchSkillsAnalytics,
  fetchRecentActivities,
} from '../../features/dashboard/dashboardSlice';

const PIE_COLORS = ['#6366F1', '#A855F7', '#22D3EE', '#F59E0B', '#34D399', '#F472B6'];

export default function DashboardHome() {
  const dispatch = useDispatch();
  const { stats, projectAnalytics, skillsAnalytics, activities } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchProjectAnalytics());
    dispatch(fetchSkillsAnalytics());
    dispatch(fetchRecentActivities());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-8">
      <Seo title="Dashboard — Admin" />

      <div>
        <h1 className="text-2xl font-display font-semibold text-ink">Dashboard</h1>
        <p className="text-sm text-ink-muted mt-1">Overview of your portfolio content and activity.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FiFolder} label="Total Projects" value={stats?.totalProjects || 0} accent="indigo" delay={0} />
        <StatCard icon={FiStar} label="Featured Projects" value={stats?.featuredProjects || 0} accent="violet" delay={0.05} />
        <StatCard icon={FiCode} label="Skills Listed" value={stats?.totalSkills || 0} accent="cyan" delay={0.1} />
        <StatCard icon={FiEye} label="Portfolio Views" value={stats?.portfolioViews || 0} accent="amber" delay={0.15} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FiFolder} label="Experience Entries" value={stats?.totalExperience || 0} accent="indigo" delay={0.2} />
        <StatCard icon={FiFolder} label="Education Entries" value={stats?.totalEducation || 0} accent="violet" delay={0.25} />
        <StatCard icon={FiFolder} label="Certifications" value={stats?.totalCertifications || 0} accent="cyan" delay={0.3} />
        <StatCard icon={FiMail} label="Unread Messages" value={stats?.unreadMessages || 0} accent="amber" delay={0.35} />
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 glass-card p-6">
          <h2 className="text-sm font-medium text-ink mb-1">Top Viewed Projects</h2>
          <p className="text-xs text-ink-muted mb-6">Engagement across your portfolio projects</p>
          {projectAnalytics?.topViewed?.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={projectAnalytics.topViewed} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#23232E" horizontal={false} />
                <XAxis type="number" stroke="#5B5F6B" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="title"
                  stroke="#5B5F6B"
                  fontSize={12}
                  width={120}
                  tickFormatter={(val) => (val.length > 14 ? `${val.slice(0, 14)}…` : val)}
                />
                <Tooltip
                  contentStyle={{ background: '#16161F', border: '1px solid #23232E', borderRadius: 8 }}
                  labelStyle={{ color: '#F5F5F7' }}
                />
                <Bar dataKey="views" radius={[0, 6, 6, 0]} fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-ink-faint py-10 text-center">No project view data yet.</p>
          )}
        </div>

        <div className="lg:col-span-2 glass-card p-6">
          <h2 className="text-sm font-medium text-ink mb-1">Skills by Category</h2>
          <p className="text-xs text-ink-muted mb-6">Distribution across categories</p>
          {skillsAnalytics?.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={skillsAnalytics}
                  dataKey="count"
                  nameKey="category"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {skillsAnalytics.map((entry, index) => (
                    <Cell key={entry.category} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#16161F', border: '1px solid #23232E', borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-ink-faint py-10 text-center">No skills data yet.</p>
          )}
        </div>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-sm font-medium text-ink mb-1">Recent Activity</h2>
        <p className="text-xs text-ink-muted mb-4">Latest changes across your dashboard</p>
        <ActivityFeed activities={activities} />
      </div>
    </div>
  );
}
