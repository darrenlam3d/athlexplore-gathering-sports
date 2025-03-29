
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';

// Interface for waitlist registration data
interface WaitlistRegistration {
  email: string;
  role: string;
  feedback: string;
  timestamp: string;
  gdprConsent: boolean;
}

const SignUpSection = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [feedback, setFeedback] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [showAdminSettings, setShowAdminSettings] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!role) {
      toast.error("Please select your role");
      return;
    }
    
    if (!gdprConsent) {
      toast.error("Please accept the privacy policy");
      return;
    }
    
    // Simulate form submission
    setIsSubmitting(true);
    
    // Create waitlist registration object
    const registration: WaitlistRegistration = {
      email,
      role,
      feedback,
      timestamp: new Date().toISOString(),
      gdprConsent
    };
    
    // Save to localStorage for now (in a real app, you'd send this to a server)
    saveWaitlistRegistration(registration);
    
    // Send email if admin email is set
    if (adminEmail) {
      sendEmailNotification(registration);
    }
    
    setTimeout(() => {
      console.log("Registration saved:", registration);
      
      // Reset form
      setEmail('');
      setRole('');
      setFeedback('');
      setGdprConsent(false);
      setIsSubmitting(false);
      
      // Show success message
      toast.success("You're in! We'll be in touch soon.");
    }, 1500);
  };

  // Function to save registration to localStorage
  const saveWaitlistRegistration = (registration: WaitlistRegistration) => {
    try {
      // Get existing registrations
      const existingRegistrationsJSON = localStorage.getItem('waitlistRegistrations');
      let registrations: WaitlistRegistration[] = existingRegistrationsJSON 
        ? JSON.parse(existingRegistrationsJSON) 
        : [];
      
      // Add new registration
      registrations.push(registration);
      
      // Save back to localStorage
      localStorage.setItem('waitlistRegistrations', JSON.stringify(registrations));
      
      console.log(`Registration saved successfully. Total registrations: ${registrations.length}`);
    } catch (error) {
      console.error('Error saving registration:', error);
    }
  };

  // Function to send email notification
  const sendEmailNotification = (registration: WaitlistRegistration) => {
    // In a production environment, this would be a server API call
    // For now, we'll use mailto for demonstration purposes
    try {
      const subject = encodeURIComponent("New ATHLEX Waitlist Registration");
      const body = encodeURIComponent(`
New waitlist registration:

Email: ${registration.email}
Role: ${registration.role}
Feedback: ${registration.feedback}
Timestamp: ${registration.timestamp}
GDPR Consent: ${registration.gdprConsent ? "Yes" : "No"}
      `);
      
      // Create a hidden link to trigger the email
      const mailtoLink = document.createElement('a');
      mailtoLink.href = `mailto:${adminEmail}?subject=${subject}&body=${body}`;
      document.body.appendChild(mailtoLink);
      mailtoLink.click();
      document.body.removeChild(mailtoLink);
      
      console.log("Email notification sent to:", adminEmail);
    } catch (error) {
      console.error("Error sending email notification:", error);
    }
  };

  // Toggle admin settings
  const toggleAdminSettings = () => {
    setShowAdminSettings(!showAdminSettings);
  };

  return (
    <section id="signup" className="section-padding bg-athlex-background">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Early. Shape the Future.</h2>
          <p className="text-white/70 text-lg">
            Be among the first to experience ATHLEX and help us build the platform that truly serves your needs.
          </p>
          
          {/* Admin settings toggle button */}
          <div className="mt-4">
            <Button 
              variant="outline" 
              className="text-xs opacity-50 hover:opacity-100" 
              onClick={toggleAdminSettings}
            >
              {showAdminSettings ? "Hide Admin Settings" : "Admin Settings"}
            </Button>
          </div>
          
          {/* Admin settings panel */}
          {showAdminSettings && (
            <div className="mt-4 p-4 bg-athlex-gray-900/50 border border-athlex-gray-700 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Admin Email Settings</h3>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  className="bg-athlex-gray-900 border-athlex-gray-700"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    if (adminEmail) {
                      toast.success(`Email notifications will be sent to: ${adminEmail}`);
                    } else {
                      toast.error("Please enter an email address");
                    }
                  }}
                >
                  Save
                </Button>
              </div>
              <p className="text-xs text-white/50 mt-2">
                Enter your email to receive waitlist notifications
              </p>
            </div>
          )}
        </div>

        <div className="bg-athlex-gray-800/40 border border-athlex-gray-700 rounded-lg p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="bg-athlex-gray-900 border-athlex-gray-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium mb-2">
                  Your Role <span className="text-red-400">*</span>
                </label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="bg-athlex-gray-900 border-athlex-gray-700">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-athlex-gray-900 border-athlex-gray-700">
                    <SelectItem value="athlete">Athlete</SelectItem>
                    <SelectItem value="coach">Coach</SelectItem>
                    <SelectItem value="scout">Scout</SelectItem>
                    <SelectItem value="federation">Federation/Organization</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="feedback" className="block text-sm font-medium mb-2">
                  What would you like to see in ATHLEX?
                </label>
                <Textarea
                  id="feedback"
                  placeholder="Share your thoughts..."
                  className="bg-athlex-gray-900 border-athlex-gray-700"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>

              <div className="flex items-start">
                <Checkbox 
                  id="gdpr" 
                  checked={gdprConsent} 
                  onCheckedChange={() => setGdprConsent(!gdprConsent)}
                  className="mt-1"
                />
                <label htmlFor="gdpr" className="ml-2 text-sm text-white/70">
                  I consent to ATHLEX collecting and storing the information I've provided. 
                  I understand I can withdraw my consent at any time. 
                  <a href="#" className="text-athlex-accent hover:underline ml-1">Privacy Policy</a>
                </label>
              </div>

              <Button 
                type="submit" 
                className="cta-button w-full text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Get Early Access"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpSection;
