import { NavLink } from 'react-router-dom';
import {
  FiGrid,
  FiUser,
  FiFolder,
  FiCode,
  FiBriefcase,
  FiBook,
  FiAward,
  FiStar,
  FiClock,
  FiTool,
  FiExternalLink,
  FiMail,
} from 'react-icons/fi';
import { cn } from '../../utils/cn';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/dashboard/profile', label: 'Profile', icon: FiUser },
  { to: '/dashboard/projects', label: 'Projects', icon: FiFolder },
  { to: '/dashboard/skills', label: 'Skills', icon: FiCode },
  { to: '/dashboard/experience', label: 'Experience', icon: FiBriefcase },
  { to: '/dashboard/education', label: 'Education', icon: FiBook },
  { to: '/dashboard/certifications', label: 'Certifications', icon: FiAward },
  { to: '/dashboard/achievements', label: 'Achievements', icon: FiStar },
  { to: '/dashboard/timeline', label: 'Timeline', icon: FiClock },
  { to: '/dashboard/tools', label: 'Tools', icon: FiTool },
  { to: '/dashboard/messages', label: 'Messages', icon: FiMail },
];

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="flex flex-col h-full w-64 shrink-0 border-r border-white/[0.06] bg-base-surface/60 backdrop-blur-xl">
      <div className="px-6 py-6 border-b border-white/[0.06]">
        <span className="font-display font-semibold text-lg text-ink">
          Admin<span className="text-gradient">.</span>
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-gradient-accent text-white shadow-glow'
                  : 'text-ink-muted hover:text-ink hover:bg-white/[0.05]'
              )
            }
          >
            <item.icon size={16} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-white/[0.06]">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm text-ink-muted hover:text-ink hover:bg-white/[0.05] transition-colors"
        >
          <FiExternalLink size={16} />
          View Portfolio
        </a>
      </div>
    </aside>
  );
}
