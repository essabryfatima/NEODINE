
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="space-y-4">
            <h2 className="text-2xl font-display font-black text-white">NEO DINE</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
                Merging culinary arts with advanced technology to create a dining experience that transcends reality.
            </p>
            <div className="flex items-center space-x-4">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                    <a key={i} href="#" onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-neon-blue transition-colors">
                        <Icon className="w-5 h-5" />
                    </a>
                ))}
            </div>
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
            <div className="space-y-2 text-sm text-gray-400">
                <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Mon - Thu</span>
                    <span>17:00 - 23:00</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Fri - Sat</span>
                    <span className="text-neon-green">17:00 - 02:00</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Sunday</span>
                    <span>16:00 - 23:00</span>
                </div>
            </div>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
            <h3 className="text-white font-bold tracking-widest text-sm uppercase">Cyber Newsletter</h3>
            <p className="text-xs text-gray-500">Subscribe for secret menu drops.</p>
            <div className="flex gap-2">
                <input type="email" placeholder="Email address" className="bg-white/5 border border-white/10 rounded px-4 py-2 w-full text-sm focus:border-neon-blue outline-none" />
                <button 
                  onClick={() => alert('Welcome to the inner circle. Check your neural inbox.')}
                  className="bg-neon-blue text-black px-4 py-2 rounded font-bold hover:bg-white transition-colors"
                >
                    GO
                </button>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-600">© 2026 NEO DINE GROUP. All rights reserved.</p>
        <div className="flex gap-6 text-xs text-gray-600">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
