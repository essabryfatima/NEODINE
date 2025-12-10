import React, { useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

const motion = m as any;

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: number) => void;
}

const Toast: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="pointer-events-auto min-w-[300px] bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg p-4 shadow-xl flex items-center gap-3 overflow-hidden relative"
          >
            {/* Type Indicator Line */}
            <div 
              className={`absolute left-0 top-0 bottom-0 w-1 ${
                toast.type === 'success' ? 'bg-neon-green' : 
                toast.type === 'error' ? 'bg-red-500' : 'bg-neon-blue'
              }`} 
            />

            {/* Icon */}
            <div className="shrink-0">
              {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-neon-green" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-neon-blue" />}
            </div>

            {/* Message */}
            <p className="text-white text-sm font-medium flex-1">{toast.message}</p>

            {/* Close */}
            <button 
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;