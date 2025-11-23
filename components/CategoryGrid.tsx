import React from 'react';
import { motion } from 'framer-motion';
import { CHEFS } from '../constants';
import { Star, Calendar } from 'lucide-react';

interface ChefGridProps {
    onBookChef: () => void;
    onViewAll?: () => void;
}

const ChefGrid: React.FC<ChefGridProps> = ({ onBookChef, onViewAll }) => {
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
                className="text-neon-purple hover:text-white transition-colors text-sm font-bold tracking-widest uppercase"
              >
                  View All Chefs &rarr;
              </button>
          )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CHEFS.map((chef, index) => (
          <motion.div
            key={chef.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-80 rounded-2xl overflow-hidden group flex"
          >
            {/* Image Side */}
            <div className="w-1/2 h-full relative overflow-hidden">
                <img 
                    src={chef.image} 
                    alt={chef.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-neon-purple/20 mix-blend-overlay"></div>
            </div>

            {/* Content Side */}
            <div className="w-1/2 bg-slate-900 p-6 flex flex-col justify-center relative border-y border-r border-white/10 rounded-r-2xl">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-neon-purple to-blue-600"></div>
                
                <h3 className="text-2xl font-display font-bold text-white mb-1">{chef.name}</h3>
                <p className="text-neon-blue text-sm font-medium mb-4">{chef.specialty}</p>
                
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span>{chef.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{chef.availability}</span>
                    </div>
                </div>

                <button 
                    onClick={onBookChef}
                    className="w-full bg-white/5 border border-white/10 hover:bg-neon-purple hover:border-neon-purple hover:text-white transition-all py-2 rounded text-sm font-bold text-gray-300"
                >
                    BOOK EXPERIENCE
                </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ChefGrid;