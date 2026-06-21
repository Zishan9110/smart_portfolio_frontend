import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiMail, FiLogIn } from 'react-icons/fi';
import { login, clearAuthError } from '../../features/auth/authSlice';
import Seo from '../../components/common/Seo';

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, status, error, bootstrapped } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: '', password: '' });

  if (bootstrapped && isAuthenticated) {
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  const handleChange = (e) => {
    dispatch(clearAuthError());
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(form));
    if (login.fulfilled.match(result)) {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base relative overflow-hidden px-4">
      <Seo title="Admin Login" />
      <div className="absolute inset-0 bg-gradient-mesh pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-sm glass-panel p-8"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 rounded-2xl bg-gradient-accent flex items-center justify-center mb-4 shadow-glow">
            <FiLock className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-display font-semibold text-ink">Admin Login</h1>
          <p className="text-sm text-ink-muted mt-1">Sign in to manage your portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" size={16} />
            <input
              type="email"
              name="email"
              required
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="input-field !pl-10"
              autoComplete="email"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" size={16} />
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="input-field !pl-10"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <button type="submit" disabled={status === 'loading'} className="btn-primary mt-2 disabled:opacity-60">
            {status === 'loading' ? 'Signing in…' : 'Sign In'}
            <FiLogIn size={14} />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
