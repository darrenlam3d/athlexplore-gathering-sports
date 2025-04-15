
import React from 'react';
import { Route } from 'react-router-dom';
import RouteGuard from '@/components/auth/RouteGuard';
import ScoutDashboard from '@/pages/ScoutDashboard';
import AthleteDetailPage from '@/pages/AthleteDetailPage';
import ScoutingReports from '@/pages/ScoutingReports';
import ScoutNotes from '@/pages/ScoutNotes';

export const scoutRoutes = [
  <Route key="scout-dashboard" path="/scout-dashboard" element={
    <RouteGuard requiredRole="scout">
      <ScoutDashboard />
    </RouteGuard>
  } />,
  <Route key="athlete-detail" path="/athlete/:id" element={
    <RouteGuard requiredRole="scout">
      <AthleteDetailPage />
    </RouteGuard>
  } />,
  <Route key="scout-reports" path="/scout-reports" element={
    <RouteGuard requiredRole="scout">
      <ScoutingReports />
    </RouteGuard>
  } />,
  <Route key="scouting-reports" path="/scouting-reports" element={
    <RouteGuard requiredRole="scout">
      <ScoutingReports />
    </RouteGuard>
  } />,
  <Route key="scout-notes" path="/scout-notes" element={
    <RouteGuard requiredRole="scout">
      <ScoutNotes />
    </RouteGuard>
  } />,
];
