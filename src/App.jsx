import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AppShell from './components/layout/AppShell.jsx';
import DashboardShell from './layouts/DashboardShell.jsx';
import Home from './pages/public/Home.jsx';
import Demo from './pages/public/Demo.jsx';
import About from './pages/public/About.jsx';
import Overview from './pages/dashboard/Overview.jsx';
import Matches from './pages/dashboard/Matches.jsx';
import Deals from './pages/dashboard/Deals.jsx';
import Compliance from './pages/dashboard/Compliance.jsx';
import Profile from './pages/dashboard/Profile.jsx';
import Cockpit from './pages/dashboard/Cockpit.jsx';
import DirectorLayout from './director/layouts/DirectorLayout.jsx';
import DirectorDashboard from './director/pages/DirectorDashboard.jsx';
import DirectorRoster from './director/pages/DirectorRoster.jsx';
import DirectorDeals from './director/pages/DirectorDeals.jsx';
import DirectorCompliance from './director/pages/DirectorCompliance.jsx';
import DirectorProfile from './director/pages/DirectorProfile.jsx';
import AthleteLayout from './athlete/layouts/AthleteLayout.jsx';
import AthleteOverview from './athlete/pages/AthleteOverview.jsx';
import AthleteMatches from './athlete/pages/AthleteMatches.jsx';
import AthleteEditProfile from './athlete/pages/AthleteEditProfile.jsx';

function PublicLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

function DashboardLayout() {
  return (
    <DashboardShell>
      <Outlet />
    </DashboardShell>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="demo" element={<Demo />} />
          <Route path="about" element={<About />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="matches" element={<Matches />} />
          <Route path="deals" element={<Deals />} />
          <Route path="cockpit" element={<Cockpit />} />
          <Route path="compliance" element={<Compliance />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/director" element={<DirectorLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DirectorDashboard />} />
          <Route path="roster" element={<DirectorRoster />} />
          <Route path="deals" element={<DirectorDeals />} />
          <Route path="compliance" element={<DirectorCompliance />} />
          <Route path="profile" element={<DirectorProfile />} />
        </Route>

        <Route path="/athlete" element={<AthleteLayout />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<AthleteOverview />} />
          <Route path="matches" element={<AthleteMatches />} />
          <Route path="edit-profile" element={<AthleteEditProfile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
