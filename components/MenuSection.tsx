import React, { useState, useRef } from 'react';
import { motion as m } from 'framer-motion';
import { Plus, Flame, Leaf, Star, Zap } from 'lucide-react';
import { Dish } from '../types';

const motion = m as any;

interface MenuSectionProps {
  title: string;
  dishes: Dish[];
  onAddToCart: (dish: Dish) => void;
}

const MenuCard: React.FC<{ dish: Dish; onAddToCart: (dish: Dish) => void }> = ({ dish, onAddToCart }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const safePlay = () => {
    if (videoRef.current && dish.videoUrl && !videoError) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => {
            setIsPlaying(false);
          });
      }
    }
  };

  const handleMouseEnter = () => {
    safePlay();
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      // safe pause logic
      if (!videoRef.current.paused) {
          videoRef.current.pause();
      }
      videoRef.current.currentTime = 0; // Reset to start
      setIsPlaying(false);
    }
  };

  const toggleVideo = () => {
    if (!videoRef.current || !dish.videoUrl || videoError) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      safePlay();
    }
  };

  return (
    <motion.div
      className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden group hover:border-neon-blue hover:shadow-[0_0_20px_rgba(0,243,255,0.15)] transition-all duration-300 flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={toggleVideo}
    >
      {/* Image / Video Area */}
      <div className="h-64 overflow-hidden relative bg-black shrink-0">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {dish.videoUrl && !videoError && (
          <video
            ref={videoRef}
            src={dish.videoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            poster={dish.image}
            onError={() => setVideoError(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors pointer-events-none" />

        {/* CENTERED ADD TO CART BUTTON */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none group-hover:pointer-events-auto">
             <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  onAddToCart(dish);
                }}
                aria-label={`Add ${dish.name} to cart`}
                className="bg-neon-blue text-slate-950 px-6 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(0,243,255,0.5)] flex items-center gap-2 backdrop-blur-md"
            >
                <Plus size={20} strokeWidth={3} />
                <span>ADD TO CART</span>
            </motion.button>
        </div>

        {/* Tags */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
          {dish.isSpicy && (
              <span className="bg-red-500/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold tracking-widest flex items-center gap-1 text-white shadow-lg uppercase">
                  <Flame size={10} /> Spicy
              </span>
          )}
          {dish.isVegan && (
              <span className="bg-green-500/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold tracking-widest flex items-center gap-1 text-white shadow-lg uppercase">
                  <Leaf size={10} /> Vegan
              </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow bg-slate-950">
        
        {/* Header: Name & Price */}
        <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-display font-bold text-white leading-tight">
                {dish.name}
            </h3>
            <span className="text-xl font-display font-bold text-neon-blue tracking-tight shrink-0 ml-2">
                {dish.price} $
            </span>
        </div>
        
        {/* Body: Description */}
        <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
            {dish.description}
        </p>

        {/* Footer: Kcal & Rating */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-sm">
             <span className="text-gray-500 font-medium uppercase tracking-wider">
                {dish.calories} KCAL
             </span>
             
             <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-white">{dish.rating}</span>
             </div>
        </div>
      </div>
    </motion.div>
  );
};

const MenuSection: React.FC<MenuSectionProps> = ({ title, dishes, onAddToCart }) => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="flex items-end justify-between mb-10 border-b border-white/10 pb-4"
      >
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 border border-white/10 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-neon-blue" />
            </div>
            <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-wide uppercase">
                    {title}
                </h2>
                <p className="text-gray-400 text-sm tracking-widest uppercase mt-1">Premium Selection</p>
            </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {dishes.map((dish) => (
          <MenuCard key={dish.id} dish={dish} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default MenuSection;