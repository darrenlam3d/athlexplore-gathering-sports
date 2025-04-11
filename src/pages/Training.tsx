
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import TodaysTraining from '@/components/training/TodaysTraining';
import TrainingCalendar from '@/components/training/TrainingCalendar';
import SkillBuilder from '@/components/training/SkillBuilder';
import RecoveryReadiness from '@/components/training/RecoveryReadiness';
import InsightsFeed from '@/components/training/InsightsFeed';
import AiCoach from '@/components/training/AiCoach';
import TrainingGoalAlignment from '@/components/training/TrainingGoalAlignment';
import { Button } from '@/components/ui/button';
import { ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

const Training = () => {
  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-6">Training & Insights</h1>
                <Link to="/training-log">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4" />
                    <span>Training Log</span>
                  </Button>
                </Link>
              </div>
              
              {/* Today's Training Recommendation */}
              <div className="mt-5">
                <TodaysTraining />
              </div>
              
              {/* Training Calendar */}
              <div className="mt-5">
                <TrainingCalendar />
              </div>
              
              {/* Skill Builder Programs */}
              <div className="mt-5">
                <SkillBuilder />
              </div>
              
              {/* Recovery & Readiness */}
              <div className="mt-5">
                <RecoveryReadiness />
              </div>
              
              {/* Insights Feed */}
              <div className="mt-5">
                <InsightsFeed />
              </div>
              
              {/* Ask the AI Coach */}
              <div className="mt-5">
                <AiCoach />
              </div>
              
              {/* Training-to-Goal Alignment */}
              <div className="mt-5 mb-5">
                <TrainingGoalAlignment />
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Training;
