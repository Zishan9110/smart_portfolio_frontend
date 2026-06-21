import { motion } from 'framer-motion';
import { FiPlusCircle, FiEdit2, FiTrash2, FiActivity } from 'react-icons/fi';
import EmptyState from '../common/EmptyState';

const ACTION_ICON = {
  created: { icon: FiPlusCircle, color: 'text-emerald-400' },
  updated: { icon: FiEdit2, color: 'text-accent-cyan' },
  deleted: { icon: FiTrash2, color: 'text-red-400' },
};

function timeAgo(dateString) {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  const intervals = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  for (const [label, secs] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count} ${label}${count > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

export default function ActivityFeed({ activities = [] }) {
  if (activities.length === 0) {
    return <EmptyState icon={FiActivity} title="No recent activity" message="Changes you make will show up here." />;
  }

  return (
    <div className="flex flex-col">
      {activities.map((activity, idx) => {
        const config = ACTION_ICON[activity.action] || ACTION_ICON.updated;
        const Icon = config.icon;
        return (
          <motion.div
            key={activity._id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.04 }}
            className="flex items-start gap-3 py-3 border-b border-white/[0.05] last:border-0"
          >
            <div className={`mt-0.5 ${config.color}`}>
              <Icon size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-ink">{activity.description}</p>
              <p className="text-xs text-ink-faint mt-0.5">{timeAgo(activity.createdAt)}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
