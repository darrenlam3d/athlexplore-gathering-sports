import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';
import { Phone } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const SignUpSection = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [feedback, setFeedback] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendNotification = async (registrationData) => {
    try {
      const response = await fetch('https://dndudgqkoiybenqnavoi.supabase.co/functions/v1/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'waitlist',
          data: registrationData
        })
      });
      
      if (!response.ok) {
        console.warn(`Notification failed with status: ${response.status}`);
        toast.warning('Notification could not be sent, but registration was successful');
      }
    } catch (error) {
      console.warn('Failed to send notification:', error);
      toast.warning('Notification could not be sent, but registration was successful');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    
    setIsSubmitting(true);
    
    try {
      // Prepare registration data
      const registrationData = {
        email,
        role,
        feedback: feedback || null,
        gdpr_consent: gdprConsent,
        created_at: new Date().toISOString()
      };
      
      // Insert data into Supabase
      const { error } = await supabase
        .from('waitlist_registrations')
        .insert([registrationData]);

      if (error) {
        throw error;
      }
      
      // Try to send notification
      await sendNotification(registrationData);
      
      // Reset form
      setEmail('');
      setPhoneNumber('');
      setRole('');
      setFeedback('');
      setGdprConsent(false);
      
      toast.success("You're in! We'll be in touch soon.");
    } catch (error) {
      console.error('Error during registration process:', error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="signup" className="section-padding bg-athlex-background">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the Movement.<br />
            <span className="text-athlex-accent">Elevate the Next Generation</span>
          </h2>
          <p className="text-white/70 text-lg">
            Be the first to experience ATHLEX and help define the future of athletic development.
          </p>
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
                <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Phone size={16} />
                  Phone Number <span className="text-white/50 text-xs">(Optional)</span>
                </label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+1 (234) 567-8910"
                  className="bg-athlex-gray-900 border-athlex-gray-700"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
                  If you have any questions or would like further clarification about ATHLEX, feel free to let us know.
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
