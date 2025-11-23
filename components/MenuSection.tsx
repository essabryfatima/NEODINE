import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Flame, Leaf, Play } from 'lucide-react';
import { Dish } from '../types';

interface MenuSectionProps {
  title: string;
  dishes: Dish[];
  onAddToCart: (dish: Dish) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, dishes, onAddToCart }) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="text-3xl md:text-4xl font-display font-bold text-white mb-8 flex items-center gap-3"
      >
        <span className="w-2 h-8 bg-neon-blue rounded-full shadow-[0_0_15px_#00f3ff]"></span>
        {title}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dishes.map((dish) => (
          <motion.div
            key={dish.id}
            className="relative bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden group hover:border-neon-blue/50 transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            onMouseEnter={() => setHoveredId(dish.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Image / Video Area */}
            <div className="h-64 overflow-hidden relative">
              <img
                src={dish.image}
                alt={dish.name}
                className={`w-full h-full object-cover transition-transform duration-700 ${hoveredId === dish.id ? 'scale-110' : 'scale-100'}`}
              />
              
              {/* Tags */}
              <div className="absolute top-4 left-4 flex gap-2">
                {dish.isSpicy && (
                    <span className="bg-red-600/80 backdrop-blur px-2 py-1 rounded text-xs font-bold flex items-center gap-1 text-white">
                        <Flame size={12} /> SPICY
                    </span>
                )}
                {dish.isVegan && (
                    <span className="bg-green-600/80 backdrop-blur px-2 py-1 rounded text-xs font-bold flex items-center gap-1 text-white">
                        <Leaf size={12} /> VEGAN
                    </span>
                )}
              </div>

              {/* Overlay on Hover */}
              <div className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                 {dish.videoUrl && (
                     <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="mb-4 w-12 h-12 rounded-full bg-white/20 border border-white/50 flex items-center justify-center text-white"
                        onClick={() => alert(`Playing preview for ${dish.name}...`)}
                     >
                         <Play className="fill-current ml-1" size={20} />
                     </motion.button>
                 )}
                 <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAddToCart(dish)}
                    className="bg-neon-blue text-black font-bold px-6 py-2 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(0,243,255,0.4)]"
                 >
                    <Plus size={18} /> ADD TO CART
                 </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-neon-blue transition-colors">{dish.name}</h3>
                <span className="text-neon-green font-display font-bold text-lg">${dish.price}</span>
              </div>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{dish.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 border-t border-white/10 pt-4">
                <span>{dish.calories} KCAL</span>
                <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span>{dish.rating}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MenuSection;