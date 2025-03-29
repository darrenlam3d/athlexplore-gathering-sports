
import React from 'react';
import { Button } from "@/components/ui/button";
import { Share2, Linkedin, Twitter } from "lucide-react";
import { toast } from 'sonner';

const CommunitySection = () => {
  const handleFormRedirect = () => {
    // In a real implementation, this would link to an external form
    window.open("https://forms.google.com/", "_blank");
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };
  
  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out ATHLEX – the platform that's transforming athlete development and discovery!");
    
    let shareUrl = "";
    
    switch (platform) {
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
        break;
    }
    
    window.open(shareUrl, "_blank");
  };
  
  return (
    <section id="community" className="section-padding bg-athlex-background">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Feedback Column */}
          <div className="bg-athlex-gray-800/40 border border-athlex-gray-700 rounded-lg p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Tell Us What Matters to You</h3>
            <p className="text-white/70 mb-6">
              Your input is invaluable as we build ATHLEX. Help shape the platform by sharing your thoughts, needs, and expectations.
            </p>
            <Button 
              className="cta-button w-full md:w-auto"
              onClick={handleFormRedirect}
            >
              Share Your Input
            </Button>
          </div>
          
          {/* Share Column */}
          <div className="bg-athlex-gray-800/40 border border-athlex-gray-700 rounded-lg p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Know someone who needs ATHLEX?</h3>
            <p className="text-white/70 mb-6">
              Help us reach athletes, coaches, and sports organizations who could benefit from ATHLEX.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="bg-transparent border-athlex-gray-700 hover:bg-athlex-gray-700 flex items-center justify-center"
                onClick={() => handleShare("linkedin")}
              >
                <Linkedin className="mr-2 h-5 w-5" />
                <span className="sr-only md:not-sr-only md:text-sm">LinkedIn</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="bg-transparent border-athlex-gray-700 hover:bg-athlex-gray-700 flex items-center justify-center"
                onClick={() => handleShare("twitter")}
              >
                <Twitter className="mr-2 h-5 w-5" />
                <span className="sr-only md:not-sr-only md:text-sm">Twitter</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="bg-transparent border-athlex-gray-700 hover:bg-athlex-gray-700 flex items-center justify-center"
                onClick={() => handleShare("whatsapp")}
              >
                <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="sr-only md:not-sr-only md:text-sm">WhatsApp</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="bg-transparent border-athlex-gray-700 hover:bg-athlex-gray-700 flex items-center justify-center"
                onClick={handleCopyLink}
              >
                <Share2 className="mr-2 h-5 w-5" />
                <span className="sr-only md:not-sr-only md:text-sm">Copy Link</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
