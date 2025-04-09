
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { UserRoleProvider } from "@/contexts/UserRoleContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import Legal from "./pages/Legal";
import EdgeSignup from "./pages/EdgeSignup";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Performance from "./pages/Performance";
import Training from "./pages/Training";
import Community from "./pages/Community";
import TalentDiscovery from "./pages/TalentDiscovery";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import ScoutDashboard from "./pages/ScoutDashboard";
import CoachDashboard from "./pages/CoachDashboard";
import Dashboard from "./pages/Dashboard";
import AthleteProfileView from "./pages/AthleteProfileView";
import Login from "./pages/Login";
import ScoutingReports from "./pages/ScoutingReports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ProfileProvider>
        <UserRoleProvider>
          <Toaster />
          <Sonner position="top-center" />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/edge-signup" element={<EdgeSignup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/home" element={<Home />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/training" element={<Training />} />
              <Route path="/community" element={<Community />} />
              <Route path="/talent-discovery" element={<TalentDiscovery />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/scout-dashboard" element={<ScoutDashboard />} />
              <Route path="/coach-dashboard" element={<CoachDashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/athlete-profile" element={<AthleteProfileView />} />
              <Route path="/scouting-reports" element={<ScoutingReports />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserRoleProvider>
      </ProfileProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
