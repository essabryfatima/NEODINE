import React, { useState } from 'react';
import { MapPin, Phone, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { motion as m } from 'framer-motion';
import SocialLinks from './SocialLinks';

const motion = m as any;

interface FooterProps {
  onLegalClick: (page: 'privacy' | 'terms' | 'cookies') => void;
  onNavigate: (tab: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onLegalClick, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    // Simulate API call then redirect to Menu
    setTimeout(() => {
      setStatus('idle');
      setEmail('');
      onNavigate('Menu');
    }, 1000);
  };

  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 relative z-10">
        {/* Brand */}
        <div className="space-y-4">
            <h2 className="text-2xl font-display font-black text-white">NEO DINE</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
                Merging culinary arts with advanced technology to create a dining experience that transcends reality.
            </p>
            <SocialLinks />
        </div>

        {/* Contact */}
        <div className="space-y-4">
            <h3 className="text-white font-bold tracking-widest text-sm uppercase">Contact</h3>
            <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 text-neon-pink" />
                    <span>Sector 7, Neo-Tokyo 2077</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                    <Phone className="w-4 h-4 text-neon-pink" />
                    <span>+88 (0) 123 456 7890</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                    <Mail className="w-4 h-4 text-neon-pink" />
                    <span>reservations@neodine.com</span>
                </div>
            </div>
        </div>

        {/* Hours */}
        <div className="space-y-4">
            <h3 className="text-white font-bold tracking-widest text-sm uppercase">Opening Hours</h3>
            <div className="space-y-3 text-sm text-gray-400">
                <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white font-bold">Mon - Fri</span>
                    <span className="text-neon-green font-bold">08:00 - 23:00</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white font-bold">Sat - Sun</span>
                    <span className="text-neon-green font-bold">08:00 - 02:00</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white font-bold">Breakfast</span>
                    <span className="text-neon-pink font-bold">08:00 - 11:00</span>
                </div>
            </div>
        </div>

        {/* Cyber Newsletter */}
        <div className="space-y-4">
            <h3 className="text-white font-bold tracking-widest text-sm uppercase">Cyber Newsletter</h3>
            <p className="text-xs text-gray-500">Subscribe for secret menu drops.</p>
            
            <div className="relative h-32 rounded-lg overflow-hidden border border-white/10 bg-slate-900 group">
                <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubscribe}
                    className="absolute inset-0 flex flex-col justify-center p-4"
                >
                    <div className="relative flex gap-2">
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Neural ID (Email)" 
                            className="bg-white/5 border border-white/10 rounded px-3 py-2 w-full text-xs text-white focus:border-neon-blue outline-none transition-colors placeholder:text-gray-600"
                            disabled={status === 'loading'}
                        />
                        <button 
                          type="submit"
                          disabled={status === 'loading'}
                          className="bg-neon-blue text-black px-3 py-2 rounded font-bold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[3rem]"
                        >
                            {status === 'loading' ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <ArrowRight className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                    <p className="text-[10px] text-gray-600 mt-2">
                        *Encrypted via Quantum-256
                    </p>
                </motion.form>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="text-xs text-gray-600">© 2026 NEO DINE GROUP. All rights reserved.</p>
        <div className="flex gap-6 text-xs text-gray-600">
            <button onClick={() => onLegalClick('privacy')} className="hover:text-white transition-colors">Privacy</button>
            <button onClick={() => onLegalClick('terms')} className="hover:text-white transition-colors">Terms</button>
            <button onClick={() => onLegalClick('cookies')} className="hover:text-white transition-colors">Cookies</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;