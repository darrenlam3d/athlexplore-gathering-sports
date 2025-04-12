
import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, Utensils, User, Users, SwitchCamera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserRole } from '@/contexts/UserRoleContext';
import { useToast } from '@/hooks/use-toast';
import { toast as sonnerToast } from 'sonner';

const QuickNavigation = () => {
  const { setUserRole } = useUserRole();
  const { toast } = useToast();
  
  const quickLinks = [
    {
      text: 'Log Training',
      icon: ClipboardList,
      path: '/training-log',
      color: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      text: 'Log Meal',
      icon: Utensils,
      path: '/nutrition',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      text: 'Update Profile',
      icon: User,
      path: '/settings',
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      text: 'View Community',
      icon: Users,
      path: '/community',
      color: 'bg-orange-600 hover:bg-orange-700',
    },
  ];

  const handleRoleSwitch = (role) => {
    setUserRole(role);
    sonnerToast.success(`Role switched to ${role}`, {
      description: `You are now viewing the app as a ${role}`,
      duration: 3000,
    });
  };

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Quick Actions</h2>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleRoleSwitch('athlete')}
            className="text-xs border-athlex-gray-700"
          >
            <SwitchCamera className="h-3 w-3 mr-1" />
            Switch to Athlete View
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinks.map((link, index) => (
          <Link to={link.path} key={index} className="w-full">
            <Button 
              className={`w-full h-20 flex flex-col items-center justify-center ${link.color}`}
            >
              <link.icon className="h-6 w-6 mb-2" />
              <span>{link.text}</span>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickNavigation;
