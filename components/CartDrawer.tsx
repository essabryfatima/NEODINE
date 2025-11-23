import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateQuantity: (id: number, delta: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cartItems, updateQuantity, onCheckout }) => {
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      {isOpen && (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={onClose}
        />
      )}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-slate-900 border-l border-neon-blue/20 z-[70] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-display font-bold text-white">YOUR ORDER</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-400" />
            </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                    <p>Your cart is empty.</p>
                    <p className="text-sm mt-2">Add some cyber-delicacies!</p>
                </div>
            ) : (
                cartItems.map(item => (
                    <div key={item.id} className="flex gap-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover border border-white/10" />
                        <div className="flex-1">
                            <h3 className="font-bold text-white text-sm">{item.name}</h3>
                            <p className="text-neon-blue font-mono text-sm">${item.price}</p>
                            
                            <div className="flex items-center gap-3 mt-2">
                                <button 
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="p-1 rounded bg-slate-800 hover:bg-slate-700"
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="text-sm w-4 text-center">{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="p-1 rounded bg-slate-800 hover:bg-slate-700"
                                >
                                    <Plus size={14} />
                                </button>
                                <div className="flex-1" />
                                <button 
                                    onClick={() => updateQuantity(item.id, -item.quantity)}
                                    className="text-red-500 hover:text-red-400"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-slate-950">
            <div className="flex justify-between mb-4 text-lg font-bold">
                <span>Total</span>
                <span className="text-neon-green">${total.toFixed(2)}</span>
            </div>
            <button 
                onClick={() => {
                    if(cartItems.length > 0) onCheckout();
                }}
                disabled={cartItems.length === 0}
                className={`w-full py-4 rounded-lg font-bold tracking-wide flex items-center justify-center gap-2 transition-all ${
                    cartItems.length > 0 
                    ? 'bg-neon-blue text-black hover:bg-white shadow-[0_0_20px_rgba(0,243,255,0.3)]' 
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
            >
                <CreditCard size={20} />
                CHECKOUT
            </button>
        </div>
      </motion.div>
    </>
  );
};

export default CartDrawer;