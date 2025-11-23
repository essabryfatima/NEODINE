import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Users, CreditCard, CheckCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'table' | 'chef';
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, type }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBooking = () => {
    setStep(2); // Payment step
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3); // Success
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-md bg-slate-900 border border-neon-blue/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,243,255,0.1)]"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <X />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold text-white mb-2">
              {type === 'table' ? 'SECURE A TABLE' : 'BOOK PRIVATE CHEF'}
            </h2>
            <p className="text-gray-400 text-sm">Step {step} of 3</p>
          </div>

          {/* STEP 1: Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Select Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
                  <input type="date" className="w-full bg-slate-800 border border-gray-700 rounded-lg py-2 pl-10 text-white focus:border-neon-blue outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm text-gray-300">Time</label>
                    <div className="relative">
                    <Clock className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
                    <select className="w-full bg-slate-800 border border-gray-700 rounded-lg py-2 pl-10 text-white focus:border-neon-blue outline-none appearance-none">
                        <option>18:00</option>
                        <option>19:30</option>
                        <option>21:00</option>
                    </select>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-gray-300">Guests</label>
                    <div className="relative">
                    <Users className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
                    <input type="number" min="1" defaultValue="2" className="w-full bg-slate-800 border border-gray-700 rounded-lg py-2 pl-10 text-white focus:border-neon-blue outline-none" />
                    </div>
                </div>
              </div>

              <button 
                onClick={handleBooking}
                className="w-full mt-4 bg-neon-blue text-black font-bold py-3 rounded-lg hover:bg-white transition-colors shadow-[0_0_15px_rgba(0,243,255,0.3)]"
              >
                CONFIRM DETAILS
              </button>
            </div>
          )}

          {/* STEP 2: Payment (Stripe Mock) */}
          {step === 2 && (
            <div className="space-y-6">
                <div className="p-4 bg-slate-800 rounded-lg border border-dashed border-gray-600">
                    <div className="flex justify-between mb-2 text-sm">
                        <span className="text-gray-400">Booking Deposit</span>
                        <span className="text-white font-mono">$50.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Service Fee</span>
                        <span className="text-white font-mono">$5.00</span>
                    </div>
                    <div className="border-t border-gray-600 my-2 pt-2 flex justify-between font-bold">
                        <span className="text-white">Total</span>
                        <span className="text-neon-green font-mono">$55.00</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-slate-800 border border-neon-blue text-neon-blue rounded hover:bg-neon-blue hover:text-black transition-colors font-bold text-sm">CREDIT CARD</button>
                        <button className="flex-1 py-2 bg-slate-800 border border-gray-700 text-gray-400 rounded hover:border-white transition-colors text-sm">CRYPTO</button>
                    </div>
                    <div className="relative">
                        <CreditCard className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-slate-800 border border-gray-700 rounded-lg py-2 pl-10 text-white focus:border-neon-blue outline-none font-mono" />
                    </div>
                </div>

                <button 
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-neon-pink text-white font-bold py-3 rounded-lg hover:bg-purple-600 transition-colors shadow-[0_0_15px_rgba(188,19,254,0.3)] flex items-center justify-center"
                >
                    {isProcessing ? (
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                        'PAY NOW'
                    )}
                </button>
            </div>
          )}

          {/* STEP 3: Success */}
          {step === 3 && (
              <div className="text-center py-8">
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="w-20 h-20 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                      <CheckCircle className="w-10 h-10 text-neon-green" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
                  <p className="text-gray-400 mb-6">You will receive a confirmation email shortly.</p>
                  <button 
                    onClick={onClose}
                    className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700"
                  >
                      Close
                  </button>
              </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;