import React, { useState } from 'react';
import { motion as m } from 'framer-motion';
import { X, Trash2, Plus, Minus, CreditCard, Rocket, Globe, MapPin, User, Phone, AlertCircle, ShoppingCart } from 'lucide-react';
import { CartItem } from '../types';

const motion = m as any;

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateQuantity: (id: number, delta: number) => void;
  onCheckout: (details: { name: string; address: string; phone: string; method: 'drone' | 'partner' }) => void;
  onClearCart?: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cartItems, updateQuantity, onCheckout, onClearCart }) => {
  const [deliveryMethod, setDeliveryMethod] = useState<'drone' | 'partner'>('drone');
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const droneFee = 5.00;
  const partnerFee = 2.50;
  const currentFee = deliveryMethod === 'drone' ? droneFee : partnerFee;
  const finalTotal = total + currentFee;

  const validateAndCheckout = () => {
    const newErrors: Record<string, string> = {};
    
    // Strict name validation (no numbers/special chars)
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (/[^a-zA-Z\s\-\.]/.test(formData.name)) newErrors.name = "Invalid characters in name";

    // Basic address check
    if (!formData.address.trim()) newErrors.address = "Address is required";
    else if (formData.address.length < 5) newErrors.address = "Address too short";
    
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = "Invalid phone number";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
        onCheckout({
            name: formData.name,
            address: formData.address,
            phone: formData.phone,
            method: deliveryMethod
        });
    }
  };

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
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-950">
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <ShoppingCart className="text-neon-blue" size={20} />
                YOUR ORDER
            </h2>
            <div className="flex items-center gap-2">
                 {cartItems.length > 0 && onClearCart && (
                    <button 
                        onClick={onClearCart} 
                        className="text-xs text-red-400 hover:text-white underline mr-2"
                    >
                        Clear Cart
                    </button>
                 )}
                 <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Close Cart">
                    <X className="w-5 h-5 text-gray-400" />
                 </button>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                    <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingCart size={32} className="opacity-50" />
                    </div>
                    <p className="font-bold mb-1">Your cart is empty.</p>
                    <p className="text-sm">Add some cyber-delicacies!</p>
                </div>
            ) : (
                <>
                    <div className="space-y-6">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex gap-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover border border-white/10" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-white text-sm">{item.name}</h3>
                                    <p className="text-neon-blue font-mono text-sm">{item.price} $</p>
                                    
                                    <div className="flex items-center gap-3 mt-2">
                                        <button 
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="p-1 rounded bg-slate-800 hover:bg-slate-700"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="text-sm w-4 text-center">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="p-1 rounded bg-slate-800 hover:bg-slate-700"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus size={14} />
                                        </button>
                                        <div className="flex-1" />
                                        <button 
                                            onClick={() => updateQuantity(item.id, -item.quantity)}
                                            className="text-red-500 hover:text-red-400"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-white/10 pt-6 space-y-6">
                        <div className="bg-slate-800/50 rounded-lg p-3 border border-white/5">
                            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Delivery Logistics</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <button 
                                    onClick={() => setDeliveryMethod('drone')}
                                    className={`flex flex-col items-center justify-center p-3 rounded border transition-all ${deliveryMethod === 'drone' ? 'bg-neon-blue/10 border-neon-blue text-neon-blue' : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30'}`}
                                >
                                    <Rocket size={20} className="mb-1" />
                                    <span className="text-[10px] font-bold uppercase">Neo-Drone</span>
                                    <span className="text-[10px] opacity-70">15 min • 5.00$</span>
                                </button>

                                <button 
                                    onClick={() => setDeliveryMethod('partner')}
                                    className={`flex flex-col items-center justify-center p-3 rounded border transition-all ${deliveryMethod === 'partner' ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500' : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30'}`}
                                >
                                    <Globe size={20} className="mb-1" />
                                    <span className="text-[10px] font-bold uppercase">Global-Link</span>
                                    <span className="text-[10px] opacity-70">Glovo/Uber • 2.50$</span>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-gray-400 uppercase">Delivery Details</h3>
                            
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
                                        <input 
                                            type="text" 
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className={`w-full bg-slate-800 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded px-3 py-2 pl-9 text-sm text-white focus:border-neon-blue outline-none transition-colors`}
                                        />
                                    </div>
                                    {errors.name && <p className="text-red-500 text-[10px] flex items-center gap-1"><AlertCircle size={8} /> {errors.name}</p>}
                                </div>

                                <div className="space-y-1">
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
                                        <input 
                                            type="text" 
                                            placeholder="Delivery Address (Sector, Building, Apt)"
                                            value={formData.address}
                                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                                            className={`w-full bg-slate-800 border ${errors.address ? 'border-red-500' : 'border-gray-700'} rounded px-3 py-2 pl-9 text-sm text-white focus:border-neon-blue outline-none transition-colors`}
                                        />
                                    </div>
                                    {errors.address && <p className="text-red-500 text-[10px] flex items-center gap-1"><AlertCircle size={8} /> {errors.address}</p>}
                                </div>

                                <div className="space-y-1">
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
                                        <input 
                                            type="tel" 
                                            placeholder="Phone Number"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            className={`w-full bg-slate-800 border ${errors.phone ? 'border-red-500' : 'border-gray-700'} rounded px-3 py-2 pl-9 text-sm text-white focus:border-neon-blue outline-none transition-colors`}
                                        />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-[10px] flex items-center gap-1"><AlertCircle size={8} /> {errors.phone}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>

        <div className="p-6 border-t border-white/10 bg-slate-950 space-y-4">
            <div className="space-y-2 text-sm text-gray-400">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-mono">{total.toFixed(2)} $</span>
                </div>
                <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="text-white font-mono">{currentFee.toFixed(2)} $</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span className="text-neon-green">{finalTotal.toFixed(2)} $</span>
                </div>
            </div>

            <button 
                onClick={validateAndCheckout}
                disabled={cartItems.length === 0}
                className={`w-full py-4 rounded-lg font-bold tracking-wide flex items-center justify-center gap-2 transition-all ${
                    cartItems.length > 0 
                    ? 'bg-neon-blue text-black hover:bg-white shadow-[0_0_20px_rgba(0,243,255,0.3)]' 
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
            >
                <CreditCard size={20} />
                {deliveryMethod === 'partner' ? 'ORDER VIA PARTNER' : 'CONFIRM ORDER'}
            </button>
        </div>
      </motion.div>
    </>
  );
};

export default CartDrawer;