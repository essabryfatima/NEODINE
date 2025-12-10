
import React, { useState, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Cookie, X, Shield, Settings } from 'lucide-react';

const motion = m as any;

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentProps {
  onViewPolicy: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onViewPolicy }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem('neo-dine-cookie-consent');
    if (!savedConsent) {
      // Show immediately without delay
      setShowBanner(true);
    } else {
      setPreferences(JSON.parse(savedConsent));
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('neo-dine-cookie-consent', JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);
    setShowModal(false);
    
    // Simulate enabling scripts based on preferences
    if (prefs.analytics) console.log('Analytics scripts loaded');
    if (prefs.marketing) console.log('Marketing scripts loaded');
  };

  const handleAcceptAll = () => {
    savePreferences({ necessary: true, analytics: true, marketing: true });
  };

  const handleRejectNonEssential = () => {
    savePreferences({ necessary: true, analytics: false, marketing: false });
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  return (
    <>
      {/* Floating Settings Button (Visible after banner is closed) */}
      {!showBanner && (
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-4 left-4 z-40 p-3 bg-slate-900/80 backdrop-blur border border-white/10 rounded-full hover:bg-slate-800 transition-colors group"
          aria-label="Cookie Preferences"
        >
          <Cookie className="w-5 h-5 text-gray-400 group-hover:text-neon-blue" />
        </button>
      )}

      {/* Banner */}
      <AnimatePresence>
        {showBanner && !showModal && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950 border-t border-neon-blue/20 p-6 md:p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]"
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Cookie className="text-neon-pink w-5 h-5" />
                  Cookie Policy
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
                  We use cookies to enhance your futuristic dining experience. Some are essential for the site to function, while others help us analyze traffic and personalize content. 
                  <br className="hidden md:block" />
                  <button onClick={onViewPolicy} className="text-neon-blue hover:text-white underline font-medium transition-colors mt-1 inline-block">
                    Read our full Cookie Policy.
                  </button>
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-6 py-2 rounded border border-gray-600 text-gray-300 hover:border-white hover:text-white transition-colors text-sm font-bold"
                >
                  Preferences
                </button>
                <button
                  onClick={handleRejectNonEssential}
                  className="px-6 py-2 rounded border border-gray-600 text-gray-300 hover:border-white hover:text-white transition-colors text-sm font-bold"
                >
                  Reject Optional
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 rounded bg-neon-blue text-black font-bold hover:bg-white transition-colors text-sm shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                >
                  Accept All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-950">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-neon-blue" />
                  Cookie Preferences
                </h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Necessary */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="font-bold text-white">Strictly Necessary</span>
                    </div>
                    <p className="text-xs text-gray-400">Essential for the website to function properly. Cannot be disabled.</p>
                  </div>
                  <div className="relative inline-flex items-center cursor-not-allowed opacity-50">
                    <input type="checkbox" checked readOnly className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white">Analytics</span>
                    </div>
                    <p className="text-xs text-gray-400">Help us understand how you use the site to improve functionality.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={preferences.analytics} 
                      onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-700 rounded-full peer-focus:outline-none peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>

                {/* Marketing */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white">Marketing</span>
                    </div>
                    <p className="text-xs text-gray-400">Used to show you relevant ads and content.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={preferences.marketing} 
                      onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-700 rounded-full peer-focus:outline-none peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-pink"></div>
                  </label>
                </div>
              </div>

              <div className="p-6 bg-slate-950 border-t border-white/10 flex justify-end gap-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded text-gray-400 hover:text-white font-medium text-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSavePreferences}
                  className="px-6 py-2 rounded bg-white text-black font-bold hover:bg-gray-200 transition-colors text-sm"
                >
                  Save Preferences
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsent;
