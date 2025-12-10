
import React from 'react';
import { motion as m } from 'framer-motion';
import { CHEFS } from '../constants';
import { Star, Calendar, Eye, ArrowRight } from 'lucide-react';
import { Chef } from '../types';

const motion = m as any;

interface ChefGridProps {
    onBookChef: (id: number) => void;
    onViewProfile: (chef: Chef) => void;
    onViewAll?: () => void;
    limit?: number;
}

const ChefGrid: React.FC<ChefGridProps> = ({ onBookChef, onViewProfile, onViewAll, limit }) => {
  const displayedChefs = limit ? CHEFS.slice(0, limit) : CHEFS;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto bg-slate-950">
      <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 flex items-center gap-3">
                <span className="w-2 h-8 bg-neon-purple rounded-full shadow-[0_0_15px_#7928ca]"></span>
                Meet The Masters
            </h2>
            <p className="text-gray-400">Book a private culinary performance.</p>
          </div>
          
          {onViewAll && (
            <button 
                onClick={onViewAll}
                className="hidden md:flex items-center gap-2 text-neon-pink font-bold tracking-widest uppercase hover:text-white transition-colors group"
            >
                View All Chefs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayedChefs.map((chef, index) => {
          // Reverted to Centered alignment as requested
          const alignClass = "items-center text-center";

          return (
            <motion.div
                key={chef.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative h-80 rounded-2xl overflow-hidden group flex"
            >
                {/* Image Side */}
                <div className="w-1/2 h-full relative overflow-hidden cursor-pointer" onClick={() => onViewProfile(chef)}>
                    <img 
                        src={chef.image} 
                        alt={chef.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                    />
                    <div className="absolute inset-0 bg-neon-purple/20 mix-blend-overlay"></div>
                    
                    {/* Overlay Hint */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="flex items-center gap-2 text-white font-bold border border-white px-3 py-1 rounded-full backdrop-blur-md">
                            <Eye size={16} /> View Profile
                        </span>
                    </div>
                </div>

                {/* Content Side */}
                <div className={`w-1/2 bg-slate-900 p-6 flex flex-col justify-center ${alignClass} relative border-y border-r border-white/10 rounded-r-2xl`}>
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-neon-purple to-blue-600"></div>
                    
                    <h3 className="text-2xl font-display font-bold text-white mb-1">{chef.name}</h3>
                    <p className="text-neon-blue text-sm font-bold tracking-wider mb-2">{chef.specialty}</p>
                    
                    <div className={`flex items-center gap-4 text-xs text-gray-400 mb-1`}>
                        <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span>{chef.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{chef.availability}</span>
                        </div>
                    </div>
                    
                    {/* Buttons */}
                    <div className={`space-y-2 w-full flex flex-col ${alignClass}`}>
                        <button 
                            onClick={() => onViewProfile(chef)}
                            className="w-full bg-transparent border border-white/10 hover:border-neon-blue hover:text-neon-blue transition-all py-3 rounded text-xs font-bold text-gray-300 uppercase tracking-wider"
                        >
                            View Dossier
                        </button>
                        <button 
                            onClick={() => onBookChef(chef.id)}
                            className="w-full bg-neon-pink text-white border border-neon-pink hover:bg-white hover:text-black hover:border-white transition-all py-3 rounded text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(188,19,254,0.4)]"
                        >
                            Quick Book
                        </button>
                    </div>
                </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ChefGrid;