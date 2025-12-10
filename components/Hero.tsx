import React from 'react';
import { motion as m } from 'framer-motion';
import { Utensils, Calendar } from 'lucide-react';

const motion = m as any;

interface HeroProps {
  onBookTable: () => void;
  onViewMenu: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookTable, onViewMenu }) => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&auto=format&fit=crop&q=80"
          className="w-full h-full object-cover opacity-60"
        >
          {/* Replaced broken Mixkit URL with reliable Pixabay Abstract Tech/Neon video */}
          <source src="https://cdn.pixabay.com/video/2020/09/25/51187-463234857_large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        
        {/* Grid Effect */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-green/30 bg-neon-green/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>
              <span className="text-neon-green text-xs font-bold tracking-wider">OPEN FOR DINING 2026</span>
            </div>

            <h1 className="text-6xl sm:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 drop-shadow-[0_0_25px_rgba(0,243,255,0.3)] leading-tight">
              TASTE THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">FUTURE</span>
            </h1>

            <p className="text-xl text-gray-300 font-light leading-relaxed max-w-lg border-l-2 border-neon-blue pl-6">
              Experience gastronomy reimagined. Molecular dishes, zero-gravity plating, and an atmosphere that transcends time.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(188, 19, 254, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onBookTable}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-neon-pink text-white px-8 py-4 rounded-lg font-bold tracking-wide hover:bg-purple-600 transition-all group"
              >
                <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>BOOK A TABLE</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 243, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onViewMenu}
                className="w-full sm:w-auto flex items-center justify-center gap-2 border border-neon-blue text-neon-blue px-8 py-4 rounded-lg font-bold tracking-wide hover:border-white hover:text-white transition-all"
              >
                <Utensils className="w-5 h-5" />
                <span>ORDER DELIVERY</span>
              </motion.button>
            </div>
          </motion.div>

          {/* 3D Floating Element */}
          <motion.div
            className="hidden lg:block relative"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative w-[500px] h-[500px] mx-auto flex items-center justify-center">
                {/* Glow behind */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-neon-blue/20 rounded-full blur-[100px] animate-pulse"></div>
                
                {/* Floating Dish Image */}
                <div className="relative z-10 w-[400px] h-[400px] rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_50px_rgba(0,243,255,0.2)]">
                    <img 
                        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
                        className="w-full h-full object-cover"
                        alt="Future Dish"
                    />
                </div>

                {/* Floating Particles */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-neon-green rounded-full shadow-[0_0_10px_#00ff9d]"
                        animate={{
                            y: [0, -100],
                            opacity: [0, 1, 0],
                            x: Math.random() * 100 - 50
                        }}
                        transition={{
                            duration: 2 + Math.random(),
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                        style={{
                            left: `${50 + (Math.random() * 40 - 20)}%`,
                            top: '60%'
                        }}
                    />
                ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Hero;