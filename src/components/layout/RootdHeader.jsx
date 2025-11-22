import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import RootdLogo from '../../assets/branding/rootd-logo.png';

export default function RootdHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const goToAuth = (path) => {
    navigate(path);
  };

  const goToDashboard = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signin', { state: { from: { pathname: '/dashboard' } } });
    }
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between py-3">
        
        {/* Logo */}
        <button 
          onClick={() => navigate('/')}
          aria-label="Rootd home" 
          className="flex items-center"
        >
          <img
            src={RootdLogo}
            alt="Rootd"
            className="h-6 w-auto object-contain"
          />
        </button>

        {/* Nav links */}
        <nav className="flex items-center gap-8 text-[17px] font-medium">
          <NavLink
            to="/"
            className={location.pathname === '/' 
              ? "text-[#4a5838] underline underline-offset-4"
              : "text-slate-600 hover:text-slate-800 transition"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/demo"
            className={location.pathname === '/demo'
              ? "text-[#4a5838] underline underline-offset-4"
              : "text-slate-600 hover:text-slate-800 transition"
            }
          >
            Demo
          </NavLink>
          <NavLink
            to="/about"
            className={location.pathname === '/about'
              ? "text-[#4a5838] underline underline-offset-4"
              : "text-slate-600 hover:text-slate-800 transition"
            }
          >
            About
          </NavLink>
        </nav>

        {/* Right-side actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => goToAuth('/signin')}
            className="rounded-full border border-gray-300 px-4 py-1.5 text-slate-700 text-sm hover:bg-gray-50 transition"
          >
            Sign in
          </button>

          <button 
            onClick={goToDashboard}
            className="rounded-full bg-[#4a5838] text-white px-4 py-1.5 text-sm hover:bg-[#3f4c31] transition"
          >
            Dashboard
          </button>
        </div>

      </div>
    </header>
  );
}