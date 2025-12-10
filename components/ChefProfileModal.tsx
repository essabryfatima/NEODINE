import React from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { X, Award, Briefcase, GraduationCap, Zap } from 'lucide-react';
import { Chef } from '../types';

const motion = m as any;

interface ChefProfileModalProps {
  chef: Chef | null;
  onClose: () => void;
  onBook: () => void;
}

const StatBar: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div className="mb-3">
    <div className="flex justify-between text-xs font-bold mb-1 uppercase tracking-wider text-gray-400">
      <span>{label}</span>
      <span style={{ color }}>{value}%</span>
    </div>
    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full rounded-full shadow-[0_0_10px_currentColor]"
        style={{ backgroundColor: color, color }}
      />
    </div>
  </div>
);

const ChefProfileModal: React.FC<ChefProfileModalProps> = ({ chef, onClose, onBook }) => {
  if (!chef) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-950/80 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(121,40,202,0.2)] flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-white hover:text-neon-pink transition-colors border border-white/10"
          >
            <X size={20} />
          </button>

          {/* Left: Image & Quick Info */}
          <div className="md:w-2/5 relative">
            <div className="h-64 md:h-full relative">
                <img src={chef.image} alt={chef.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
                <div className="absolute inset-0 bg-neon-purple/10 mix-blend-overlay" />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-3xl font-display font-bold text-white mb-1 leading-none">{chef.name}</h2>
                <p className="text-neon-blue font-medium mb-4">{chef.specialty}</p>
                <button 
                    onClick={onBook}
                    className="w-full py-3 bg-neon-purple text-white font-bold rounded hover:bg-neon-pink transition-colors shadow-[0_0_20px_rgba(188,19,254,0.4)]"
                >
                    BOOK THIS CHEF
                </button>
            </div>
          </div>

          {/* Right: Data Logs */}
          <div className="md:w-3/5 p-8 overflow-y-auto custom-scrollbar bg-slate-950/50 backdrop-blur-xl">
             
             {/* Bio Section */}
             <div className="mb-8 relative border-l-2 border-neon-blue pl-4">
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Zap size={14} className="text-neon-blue" /> Neural Profile
                 </h3>
                 <p className="text-gray-300 leading-relaxed text-sm">{chef.bio}</p>
                 <p className="text-white italic mt-3 text-sm">"{chef.philosophy}"</p>
             </div>

             {/* Stats */}
             <div className="mb-8 bg-black/30 p-4 rounded-xl border border-white/5">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Cyber-Metrics</h3>
                <StatBar label="Creativity" value={chef.stats.creativity} color="#bc13fe" />
                <StatBar label="Technical Precision" value={chef.stats.precision} color="#00f3ff" />
                <StatBar label="Execution Speed" value={chef.stats.speed} color="#00ff9d" />
                <StatBar label="Tech Integration" value={chef.stats.tech} color="#ff003c" />
             </div>

             {/* Education */}
             <div className="mb-8">
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <GraduationCap size={16} className="text-neon-green" /> Data Upload (Education)
                 </h3>
                 <div className="bg-slate-900/50 p-3 rounded border-l-4 border-neon-green text-sm text-gray-300 font-mono">
                    {chef.education}
                 </div>
             </div>

             {/* Experience Timeline */}
             <div>
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Briefcase size={16} className="text-neon-orange" /> Mission Logs (Experience)
                 </h3>
                 <div className="space-y-4">
                     {chef.experience.map((exp, i) => (
                         <div key={i} className="flex gap-3">
                             <div className="flex flex-col items-center">
                                 <div className="w-2 h-2 rounded-full bg-neon-orange shadow-[0_0_5px_#ff9e00]" />
                                 {i !== chef.experience.length - 1 && <div className="w-px h-full bg-white/10 my-1" />}
                             </div>
                             <p className="text-sm text-gray-400 font-mono -mt-1">{exp}</p>
                         </div>
                     ))}
                 </div>
             </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ChefProfileModal;