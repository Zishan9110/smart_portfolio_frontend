import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiBriefcase, FiBook, FiAward, FiStar, FiClock } from 'react-icons/fi';
import PageHeader from '../../components/dashboard/PageHeader';
import EmptyState from '../../components/common/EmptyState';
import Spinner from '../../components/common/Spinner';
import Seo from '../../components/common/Seo';
import { fetchTimeline } from '../../features/timeline/timelineSlice';
import { formatMonthYear } from '../../utils/dateHelpers';

const TYPE_CONFIG = {
  experience: { icon: FiBriefcase, color: 'text-accent-indigo', label: 'Experience' },
  education: { icon: FiBook, color: 'text-accent-violet', label: 'Education' },
  certification: { icon: FiAward, color: 'text-accent-cyan', label: 'Certification' },
  achievement: { icon: FiStar, color: 'text-amber-400', label: 'Achievement' },
};

export default function TimelineView() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.timeline);

  useEffect(() => {
    dispatch(fetchTimeline());
  }, [dispatch]);

  return (
    <div>
      <Seo title="Timeline — Admin" />
      <PageHeader
        title="Timeline"
        description="A read-only, unified view of your education, experience, certifications, and achievements — exactly as it appears on your public site."
      />

      {status === 'loading' && items.length === 0 ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : items.length === 0 ? (
        <EmptyState icon={FiClock} title="Nothing to show yet" message="Add experience, education, certifications, or achievements to populate your timeline." />
      ) : (
        <div className="glass-card p-6">
          <div className="flex flex-col gap-2">
            {items.map((item) => {
              const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.achievement;
              const Icon = config.icon;
              return (
                <div
                  key={`${item.type}-${item.id}`}
                  className="flex items-center gap-4 py-3 border-b border-white/[0.05] last:border-0"
                >
                  <div className={`h-9 w-9 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 ${config.color}`}>
                    <Icon size={15} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-ink font-medium truncate">{item.title}</p>
                    {item.subtitle && <p className="text-xs text-ink-muted truncate">{item.subtitle}</p>}
                  </div>
                  <span className={`text-[10px] uppercase tracking-wider font-mono shrink-0 ${config.color}`}>
                    {config.label}
                  </span>
                  <span className="text-xs text-ink-faint font-mono shrink-0 w-20 text-right">
                    {formatMonthYear(item.date)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
