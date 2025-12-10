import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Menu, X, UtensilsCrossed } from 'lucide-react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../constants';
import { CartItem } from '../types';
import SocialLinks from './SocialLinks';

const motion = m as any;

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onLoginClick: () => void;
  isLoggedIn: boolean;
  activeTab: string;
  onNavClick: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, onLoginClick, isLoggedIn, activeTab, onNavClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-transparent ${
        isScrolled 
          ? 'bg-slate-950/90 backdrop-blur-md border-neon-blue/20 shadow-lg shadow-neon-blue/5' 
          : 'bg-gradient-to-b from-black/90 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <motion.button 
              onClick={() => onNavClick('Home')}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-neon-blue/20 p-2 rounded-lg border border-neon-blue/50 group-hover:bg-neon-blue/40 transition-colors">
                <UtensilsCrossed className="w-6 h-6 text-neon-blue" />
              </div>
              <span className="text-3xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-green drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                NEO DINE
              </span>
            </motion.button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {NAV_LINKS.map((link) => (
                <motion.button
                  key={link}
                  onClick={() => onNavClick(link)}
                  className={`text-sm font-medium tracking-wide uppercase transition-all relative ${
                    activeTab === link ? 'text-neon-blue' : 'text-gray-300 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.1, textShadow: "0 0 8px #00f3ff" }}
                >
                  {link}
                  {activeTab === link && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neon-blue shadow-[0_0_10px_#00f3ff]" 
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6 text-gray-300">
            {/* Social Links Removed from Header */}

            <motion.button 
              whileHover={{ scale: 1.2, color: '#00f3ff' }}
              onClick={onCartClick}
              className="relative group"
            >
              <ShoppingBag className="w-6 h-6 group-hover:fill-neon-blue/20 transition-all" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-neon-pink text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-[0_0_10px_#bc13fe]"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              onClick={onLoginClick}
              className="hidden md:flex items-center gap-2"
            >
              <div className={`w-9 h-9 rounded-full p-[2px] ${isLoggedIn ? 'bg-gradient-to-br from-neon-green to-emerald-500' : 'bg-gradient-to-br from-neon-purple to-neon-blue'}`}>
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <User className={`w-5 h-5 ${isLoggedIn ? 'text-neon-green' : 'text-gray-300'}`} />
                </div>
              </div>
            </motion.button>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950 border-b border-white/10 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    onNavClick(link);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-neon-blue hover:bg-white/5"
                >
                  {link}
                </button>
              ))}
              <div className="px-3 py-4 border-t border-white/10 mt-2">
                  <p className="text-xs text-gray-500 mb-2 font-bold uppercase">Follow Us</p>
                  <SocialLinks />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;