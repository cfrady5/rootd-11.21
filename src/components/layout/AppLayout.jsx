import React from 'react';
import { Outlet } from 'react-router-dom';
import AppShell from './AppShell.jsx';
import MessagingDrawer from '../MessagingDrawer.jsx';

export default function AppLayout() {
  return (
    <AppShell>
      <div style={{ paddingBottom: '96px' }}>
        <Outlet />
      </div>
      <MessagingDrawer />
    </AppShell>
  );
}
