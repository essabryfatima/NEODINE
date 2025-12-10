
import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

interface SocialLinksProps {
  className?: string;
}

// Custom icons for TikTok and Telegram since they might not be in standard Lucide version or specific style is needed
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    aria-label="TikTok"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    aria-label="Telegram"
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

const SocialLinks: React.FC<SocialLinksProps> = ({ className = "w-5 h-5" }) => {
  return (
    <div className="flex items-center gap-4">
      <a 
        href={SOCIAL_LINKS.instagram} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-400 hover:text-neon-pink transition-colors"
        aria-label="Instagram"
      >
        <Instagram className={className} />
      </a>
      <a 
        href={SOCIAL_LINKS.tiktok} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-400 hover:text-neon-blue transition-colors"
        aria-label="TikTok"
      >
        <TikTokIcon className={className} />
      </a>
      <a 
        href={SOCIAL_LINKS.facebook} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-400 hover:text-blue-500 transition-colors"
        aria-label="Facebook"
      >
        <Facebook className={className} />
      </a>
      <a 
        href={SOCIAL_LINKS.telegram} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-400 hover:text-neon-green transition-colors"
        aria-label="Telegram"
      >
        <TelegramIcon className={className} />
      </a>
    </div>
  );
};

export default SocialLinks;