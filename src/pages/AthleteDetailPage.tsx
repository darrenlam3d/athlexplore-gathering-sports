
import React, { useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { toast } from 'sonner';
import { useUserRole } from '@/contexts/UserRoleContext';
import { getAthleteById } from '@/utils/athleteDetailUtils';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScoutLayout from '@/layouts/ScoutLayout';
import CoachLayout from '@/layouts/CoachLayout';

// Import all the components we created
import AthleteHeader from '@/components/athlete/AthleteHeader';
import AthletePassport from '@/components/athlete/AthletePassport';
import RecentTraining from '@/components/athlete/RecentTraining';
import PerformanceMetrics from '@/components/athlete/PerformanceMetrics';
import GoalOverview from '@/components/athlete/GoalOverview';
import ScoutingActions from '@/components/athlete/ScoutingActions';
// Import our new components
import NutritionOverview from '@/components/athlete/NutritionOverview';
import ScoutingNotes from '@/components/athlete/ScoutingNotes';

const AthleteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { userRole } = useUserRole();
  const navigate = useNavigate();
  
  // Log the current user role for debugging
  useEffect(() => {
    console.log("Current user role on athlete detail page:", userRole);
  }, [userRole]);
  
  // Allow both scouts and coaches to view athlete profiles
  const hasAccess = userRole === 'scout' || userRole === 'coach';
  
  if (!hasAccess) {
    console.log("Access denied: user role is", userRole);
    toast.error("You don't have permission to view athlete profiles");
    return <Navigate to="/athlete-dashboard" />;
  }

  // Query for athlete data
  const { data: athlete, isLoading, isError } = useQuery({
    queryKey: ['athlete', id],
    queryFn: async () => {
      if (!id) {
        throw new Error('Athlete ID is required');
      }
      return await getAthleteById(id, isSupabaseConfigured(), supabase);
    }
  });

  const handleAddToShortlist = () => {
    if (athlete) {
      toast.success(`${athlete.name} added to shortlist`);
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };
  
  const handleAssignTraining = () => {
    navigate(`/assign-training?athlete_id=${id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-athlex-background text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-athlex-accent"></div>
      </div>
    );
  }

  if (isError || !athlete) {
    return (
      <div className="min-h-screen bg-athlex-background text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Athlete Not Found</h2>
          <p className="text-gray-400 mb-6">The athlete you're looking for might not exist or you don't have permission to view it.</p>
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Render content with the appropriate layout based on user role
  const renderContent = () => {
    const content = (
      <>
        <div className="max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          {/* Athlete Header with Assign Training button for coaches */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-1">
              <AthleteHeader 
                athlete={athlete} 
                onAddToShortlist={handleAddToShortlist} 
              />
            </div>
            
            {/* Add Assign Training button for coaches */}
            {userRole === 'coach' && (
              <div className="md:self-start md:mt-4">
                <Button 
                  className="w-full md:w-auto bg-athlex-accent hover:bg-athlex-accent/90"
                  onClick={handleAssignTraining}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Assign Training to {athlete.name.split(' ')[0]}
                </Button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Athlete Passport Summary and Recent Training */}
            <div className="md:col-span-1 space-y-6">
              <AthletePassport athlete={athlete} />
              <RecentTraining sessions={athlete?.training_sessions || []} />
              <div className="md:hidden">
                <ScoutingActions athleteId={id || ''} />
              </div>
            </div>
            
            {/* Right Column - Performance Data and Goals */}
            <div className="md:col-span-2 space-y-6">
              <PerformanceMetrics performanceData={athlete?.performance_metrics} />
              <GoalOverview goals={athlete?.goals || []} />
              
              {/* Add Nutrition Overview for coaches */}
              {userRole === 'coach' && (
                <NutritionOverview athleteId={id || ''} />
              )}
              
              {/* Scouting Notes section for both scouts and coaches */}
              <ScoutingNotes athleteId={id || ''} />
            </div>

            {/* Scouting Actions - Desktop Only */}
            <div className="hidden md:block md:col-span-1">
              <ScoutingActions athleteId={id || ''} />
            </div>
          </div>
        </div>
      </>
    );

    if (userRole === 'coach') {
      return <CoachLayout>{content}</CoachLayout>;
    }
    
    // Default to Scout layout
    return <ScoutLayout>{content}</ScoutLayout>;
  };

  return renderContent();
};

export default AthleteDetailPage;
