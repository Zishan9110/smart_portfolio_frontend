import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProfile, incrementPortfolioView } from '../features/profile/profileSlice';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';

export default function PublicLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(incrementPortfolioView());
  }, [dispatch]);

  return (
    <div id="top" className="min-h-screen bg-base relative overflow-x-hidden">
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none" aria-hidden="true" />
      <div className="relative z-10">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
