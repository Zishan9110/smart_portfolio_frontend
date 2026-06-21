import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiLogOut } from 'react-icons/fi';
import { logout } from '../../features/auth/authSlice';

export default function Topbar({ onMenuClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/admin/login', { replace: true });
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-base-surface/40 backdrop-blur-xl sticky top-0 z-30">
      <button onClick={onMenuClick} className="lg:hidden text-ink-muted hover:text-ink" aria-label="Open menu">
        <FiMenu size={20} />
      </button>

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm text-ink">{user?.name || 'Admin'}</span>
          <span className="text-xs text-ink-faint">{user?.email}</span>
        </div>
        <div className="h-9 w-9 rounded-full bg-gradient-accent flex items-center justify-center text-white text-sm font-medium">
          {user?.name?.[0]?.toUpperCase() || 'A'}
        </div>
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-white/[0.05] transition-colors"
          aria-label="Logout"
          title="Logout"
        >
          <FiLogOut size={18} />
        </button>
      </div>
    </header>
  );
}
