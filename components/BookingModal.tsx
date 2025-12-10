import React, { useState, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Users, CreditCard, CheckCircle, User, Mail, Phone, ChevronRight, AlertCircle, ShieldCheck, Minus, Plus, Bitcoin, Loader2 } from 'lucide-react';
import { CHEFS, DISHES, CATEGORIES } from '../constants';
import { Dish, CartItem } from '../types';

const motion = m as any;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'table' | 'chef';
  initialChefId?: number | null;
  cart: CartItem[];
  onAddToCart: (dish: Dish) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  onBookingComplete: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, type, initialChefId, cart, onAddToCart, onUpdateQuantity, onBookingComplete }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2,
    name: '',
    email: '',
    phone: ''
  });

  // Payment State
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: ''
  });
  
  const [selectedChef, setSelectedChef] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  
  // Menu Selection State
  const [activeCategory, setActiveCategory] = useState('breakfast');

  useEffect(() => {
    if (isOpen && initialChefId) {
      setSelectedChef(initialChefId);
    }
  }, [isOpen, initialChefId]);

  useEffect(() => {
    if (formData.date) {
        const date = new Date(formData.date);
        const day = date.getDay();
        const isWeekend = day === 0 || day === 6;
        
        const startHour = 8;
        const endHour = isWeekend ? 26 : 23; 
        
        const slots: string[] = [];
        for (let i = startHour; i < endHour; i++) {
            const hour = i % 24;
            const hourStr = hour.toString().padStart(2, '0');
            slots.push(`${hourStr}:00`);
            slots.push(`${hourStr}:30`);
        }
        setAvailableTimeSlots(slots);
        
        if (formData.time && !slots.includes(formData.time)) {
            setFormData(prev => ({ ...prev, time: '' }));
        }
    }
  }, [formData.date]);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formatted = value.replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
    setPaymentData({ ...paymentData, cardNumber: formatted });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setPaymentData({ ...paymentData, expiry: value });
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPaymentData({ ...paymentData, cvc: value });
  };


  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.date);

    if (!formData.date) newErrors.date = "Date is required";
    else if (selectedDate < today) newErrors.date = "Cannot book dates in the past";

    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    // Sanitize name to prevent simple injection
    else if (/[^a-zA-Z\s\-\.]/.test(formData.name)) newErrors.name = "Invalid characters in name";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";
    
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = "Invalid phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextToChef = () => {
    if (validateStep1()) setStep(2);
  };

  const handleNextToMenu = () => {
    if (selectedChef === null) {
      setErrors({ chef: "Please select a chef for your experience" });
      return;
    }
    setStep(3);
  };
  
  const handleNextToPayment = () => {
    setStep(4);
  };

  const handlePayment = () => {
    if (!agreedToTerms) {
        alert("Please agree to the Terms & Conditions to proceed.");
        return;
    }

    // Basic Payment Validation
    if (paymentData.cardNumber.length < 16 || !paymentData.expiry || paymentData.cvc.length < 3) {
        alert("Please enter valid payment details.");
        return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // SECURITY: Clear sensitive data immediately
      setPaymentData({ cardNumber: '', expiry: '', cvc: '' }); 
      
      // Notify Parent App to clear cart
      onBookingComplete();
      
      setStep(5);
    }, 2000);
  };

  const resetAndClose = () => {
    setStep(1);
    setFormData({ date: '', time: '', guests: 2, name: '', email: '', phone: '' });
    setPaymentData({ cardNumber: '', expiry: '', cvc: '' });
    setSelectedChef(null);
    setAgreedToTerms(false);
    setErrors({});
    onClose();
  };

  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  };

  const reservationDeposit = 50.00;
  const chefFee = 25.00;
  const serviceFee = 5.00;
  const foodCost = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalDue = reservationDeposit + chefFee + serviceFee + foodCost;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-md" 
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-neon-blue/20 rounded-2xl shadow-[0_0_50px_rgba(0,243,255,0.1)] overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-950">
            <div>
                <h2 className="text-2xl font-display font-bold text-white tracking-wider">
                {type === 'table' ? 'RESERVATION PROTOCOL' : 'CHEF BOOKING'}
                </h2>
                <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map(s => (
                        <div key={s} className={`h-1 w-8 rounded-full transition-colors ${step >= s ? 'bg-neon-blue' : 'bg-gray-800'}`} />
                    ))}
                </div>
            </div>
            <button onClick={resetAndClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close Modal">
                <X size={24} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
            {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h3 className="text-lg font-bold text-white mb-4 border-l-4 border-neon-pink pl-3">Phase 1: Mission Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs text-neon-blue font-bold uppercase">Date</label>
                            <div className="relative group">
                                <Calendar className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                                <input 
                                    type="date" 
                                    min={new Date().toISOString().split('T')[0]}
                                    value={formData.date}
                                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                                    className={`w-full bg-slate-800 border ${errors.date ? 'border-red-500' : 'border-gray-700'} rounded-lg py-2.5 pl-10 text-white focus:border-neon-blue outline-none transition-all`} 
                                />
                            </div>
                            {errors.date && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={10} /> {errors.date}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-neon-blue font-bold uppercase">Time</label>
                            <div className="relative group">
                                <Clock className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                                <select 
                                    value={formData.time}
                                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                                    disabled={!formData.date}
                                    className="w-full bg-slate-800 border border-gray-700 rounded-lg py-2.5 pl-10 text-white focus:border-neon-blue outline-none appearance-none cursor-pointer disabled:opacity-50"
                                >
                                    <option value="">Select Time</option>
                                    {availableTimeSlots.map(time => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.time && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={10} /> {errors.time}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-neon-blue font-bold uppercase">Guests</label>
                            <div className="relative group">
                                <Users className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                                <input 
                                    type="number" 
                                    min="1" 
                                    max="10"
                                    value={formData.guests}
                                    onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value) || 1})}
                                    className="w-full bg-slate-800 border border-gray-700 rounded-lg py-2.5 pl-10 text-white focus:border-neon-blue outline-none" 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-white/10 my-4" />

                    <div className="space-y-4">
                         <div className="space-y-2">
                            <label className="text-xs text-neon-blue font-bold uppercase">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                                <input 
                                    type="text" 
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className={`w-full bg-slate-800 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg py-2.5 pl-10 text-white focus:border-neon-blue outline-none transition-all`} 
                                />
                            </div>
                            {errors.name && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={10} /> {errors.name}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs text-neon-blue font-bold uppercase">Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                                    <input 
                                        type="email" 
                                        placeholder="cyber@neodine.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className={`w-full bg-slate-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg py-2.5 pl-10 text-white focus:border-neon-blue outline-none transition-all`} 
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={10} /> {errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-neon-blue font-bold uppercase">Phone</label>
                                <div className="relative group">
                                    <Phone className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                                    <input 
                                        type="tel" 
                                        placeholder="+1 234 567 8900"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className={`w-full bg-slate-800 border ${errors.phone ? 'border-red-500' : 'border-gray-700'} rounded-lg py-2.5 pl-10 text-white focus:border-neon-blue outline-none transition-all`} 
                                    />
                                </div>
                                {errors.phone && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={10} /> {errors.phone}</p>}
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={handleNextToChef}
                        className="w-full mt-6 bg-white text-black font-bold py-3 rounded-lg hover:bg-neon-blue transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                        PROCEED TO CHEF SELECTION <ChevronRight size={18} />
                    </button>
                </motion.div>
            )}

            {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h3 className="text-lg font-bold text-white mb-4 border-l-4 border-neon-purple pl-3">Phase 2: Culinary Director</h3>
                    <p className="text-gray-400 text-sm mb-4">Select the visionary who will oversee your dining experience.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {CHEFS.map((chef) => (
                            <div 
                                key={chef.id}
                                onClick={() => {
                                    setSelectedChef(chef.id);
                                    setErrors({});
                                }}
                                className={`relative border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${selectedChef === chef.id ? 'border-neon-blue shadow-[0_0_20px_rgba(0,243,255,0.3)] bg-slate-800' : 'border-white/10 hover:border-white/30 bg-slate-900/50'}`}
                            >
                                <div className="h-32 overflow-hidden">
                                    <img src={chef.image} alt={chef.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-white">{chef.name}</h4>
                                        {selectedChef === chef.id && <CheckCircle className="text-neon-green w-5 h-5" />}
                                    </div>
                                    <p className="text-xs text-neon-blue mb-2">{chef.specialty}</p>
                                    <p className="text-xs text-gray-500">{chef.availability}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {errors.chef && <p className="text-red-500 text-sm text-center font-bold animate-pulse">{errors.chef}</p>}

                    <div className="flex gap-4 pt-4">
                        <button onClick={() => setStep(1)} className="px-6 py-3 rounded-lg border border-white/10 text-gray-400 hover:text-white">Back</button>
                        <button 
                            onClick={handleNextToMenu}
                            className="flex-1 bg-neon-purple text-white font-bold py-3 rounded-lg hover:bg-neon-pink transition-colors shadow-lg flex items-center justify-center gap-2"
                        >
                            PROCEED TO MENU PRE-SELECTION <ChevronRight size={18} />
                        </button>
                    </div>
                </motion.div>
            )}

            {step === 3 && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold text-white border-l-4 border-neon-orange pl-3">Phase 3: Gastronomic Pre-selection</h3>
                        <div className="text-right">
                             <span className="text-xs text-gray-400 uppercase">Food Value</span>
                             <p className="text-neon-green font-bold text-lg">{foodCost.toFixed(2)} $</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${activeCategory === cat.id ? 'bg-neon-blue text-black border-neon-blue' : 'bg-transparent text-gray-400 border-white/10 hover:border-white'}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {DISHES.filter(d => d.category === activeCategory).map(dish => {
                            const inCart = cart.find(c => c.id === dish.id);
                            return (
                                <div key={dish.id} className="flex gap-3 bg-slate-900/50 p-2 rounded-lg border border-white/5 hover:border-white/20 transition-colors">
                                    <img src={dish.image} alt={dish.name} className="w-16 h-16 rounded object-cover" />
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h4 className="text-sm font-bold text-white">{dish.name}</h4>
                                        <p className="text-xs text-neon-blue font-mono">{dish.price} $</p>
                                    </div>
                                    <div className="flex flex-col justify-center gap-1">
                                        {inCart ? (
                                            <div className="flex items-center gap-2 bg-slate-800 rounded px-2 py-1">
                                                <button onClick={() => onUpdateQuantity(dish.id, -1)} aria-label="Decrease quantity"><Minus size={14} className="text-gray-400 hover:text-white" /></button>
                                                <span className="text-xs font-bold text-white min-w-[1rem] text-center">{inCart.quantity}</span>
                                                <button onClick={() => onUpdateQuantity(dish.id, 1)} aria-label="Increase quantity"><Plus size={14} className="text-gray-400 hover:text-white" /></button>
                                            </div>
                                        ) : (
                                            <button 
                                                onClick={() => onAddToCart(dish)}
                                                className="bg-neon-blue/20 text-neon-blue hover:bg-neon-blue hover:text-black p-2 rounded transition-colors"
                                                aria-label="Add to cart"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="flex gap-4 pt-4 border-t border-white/10 mt-4">
                        <button onClick={() => setStep(2)} className="px-6 py-3 rounded-lg border border-white/10 text-gray-400 hover:text-white">Back</button>
                        <button 
                            onClick={handleNextToPayment}
                            className="flex-1 bg-neon-orange text-black font-bold py-3 rounded-lg hover:bg-white transition-colors shadow-lg flex items-center justify-center gap-2"
                        >
                            CONFIRM SELECTION & PAY <ChevronRight size={18} />
                        </button>
                    </div>
                 </motion.div>
            )}

            {step === 4 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h3 className="text-lg font-bold text-white mb-4 border-l-4 border-neon-green pl-3">Phase 4: Secure Transaction</h3>
                    
                    <div className="bg-slate-900/80 p-4 rounded-xl border border-neon-blue/20 mb-6">
                        <h4 className="text-xs font-bold text-neon-blue uppercase tracking-widest mb-3 flex items-center gap-2">
                           <ShieldCheck size={14} /> Verification Protocol
                        </h4>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <span className="text-gray-500">Date & Time</span>
                            <span className="text-white font-medium text-right">{formatDateDisplay(formData.date)} at {formData.time}</span>
                            <span className="text-gray-500">Guests</span>
                            <span className="text-white font-medium text-right">{formData.guests} Persons</span>
                            <span className="text-gray-500">Selected Chef</span>
                            <span className="text-white font-medium text-right">{CHEFS.find(c => c.id === selectedChef)?.name}</span>
                            <span className="text-gray-500">Pre-ordered Items</span>
                            <span className="text-white font-medium text-right">{cart.reduce((a,b)=>a+b.quantity,0)} Items</span>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
                         <div className="flex justify-between mb-2 text-sm">
                            <span className="text-gray-400">Reservation Deposit</span>
                            <span className="text-white font-mono">{reservationDeposit.toFixed(2)} $</span>
                        </div>
                        <div className="flex justify-between mb-2 text-sm">
                            <span className="text-gray-400">Chef Selection Fee</span>
                            <span className="text-white font-mono">{chefFee.toFixed(2)} $</span>
                        </div>
                        <div className="flex justify-between mb-2 text-sm">
                            <span className="text-gray-400">Service Fee</span>
                            <span className="text-white font-mono">{serviceFee.toFixed(2)} $</span>
                        </div>
                        <div className="flex justify-between mb-2 text-sm">
                            <span className="text-gray-400">Pre-ordered Meal Value</span>
                            <span className="text-white font-mono">{foodCost.toFixed(2)} $</span>
                        </div>
                        <div className="border-t border-gray-600 my-4 pt-4 flex justify-between font-bold text-lg">
                            <span className="text-white">Total Due</span>
                            <span className="text-neon-green font-mono">{totalDue.toFixed(2)} $</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex gap-4 items-center justify-center py-2 opacity-70">
                            <div className="font-display font-black italic text-xl text-white tracking-tighter">VISA</div>
                            <div className="flex"><div className="w-6 h-6 rounded-full bg-red-500/80 -mr-2"></div><div className="w-6 h-6 rounded-full bg-yellow-500/80"></div></div>
                            <div className="w-6 h-6 bg-yellow-500 rotate-45 flex items-center justify-center"><div className="w-3 h-3 bg-black rotate-0"></div></div>
                            <Bitcoin className="text-orange-500" />
                        </div>

                        <div className="relative">
                            <CreditCard className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
                            <input 
                              type="text" 
                              placeholder="0000 0000 0000 0000" 
                              value={paymentData.cardNumber}
                              onChange={handleCardNumberChange}
                              maxLength={19}
                              className="w-full bg-slate-800 border border-gray-700 rounded-lg py-3 pl-10 text-white focus:border-neon-blue outline-none font-mono tracking-widest" 
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input 
                              type="text" 
                              placeholder="MM/YY" 
                              value={paymentData.expiry}
                              onChange={handleExpiryChange}
                              className="w-full bg-slate-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-neon-blue outline-none font-mono text-center" 
                            />
                            <input 
                              type="text" 
                              placeholder="CVC" 
                              maxLength={4}
                              value={paymentData.cvc}
                              onChange={handleCvcChange}
                              className="w-full bg-slate-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-neon-blue outline-none font-mono text-center" 
                            />
                        </div>
                        
                        {/* Terms and Conditions Checkbox */}
                        <div className="flex items-center gap-3 py-2">
                             <input 
                                type="checkbox" 
                                id="terms"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className="w-4 h-4 rounded bg-slate-800 border-gray-600 focus:ring-neon-blue text-neon-blue cursor-pointer"
                             />
                             <label htmlFor="terms" className="text-xs text-gray-400 select-none cursor-pointer">
                                I agree to the <span className="text-neon-blue hover:underline">Terms & Conditions</span> and <span className="text-neon-blue hover:underline">Privacy Policy</span>.
                             </label>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button onClick={() => setStep(3)} className="px-6 py-3 rounded-lg border border-white/10 text-gray-400 hover:text-white">Back</button>
                        <button 
                            onClick={handlePayment}
                            disabled={isProcessing || !agreedToTerms}
                            className={`flex-1 font-bold py-3 rounded-lg transition-colors shadow-[0_0_20px_rgba(0,255,157,0.3)] flex items-center justify-center gap-2 ${isProcessing || !agreedToTerms ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-neon-green text-black hover:bg-white'}`}
                        >
                            {isProcessing ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> PROCESSING...</>
                            ) : (
                                'AUTHORIZE PAYMENT'
                            )}
                        </button>
                    </div>
                </motion.div>
            )}

            {step === 5 && (
                <div className="text-center py-12 flex flex-col items-center">
                    <motion.div 
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="w-24 h-24 bg-neon-green/20 rounded-full flex items-center justify-center mb-6 border border-neon-green/50 shadow-[0_0_30px_rgba(0,255,157,0.3)]"
                    >
                        <CheckCircle className="w-12 h-12 text-neon-green" />
                    </motion.div>
                    <h3 className="text-3xl font-display font-bold text-white mb-2">ACCESS GRANTED</h3>
                    <p className="text-neon-blue font-mono mb-6">Reservation ID: #ND-{Math.floor(Math.random() * 10000)}</p>
                    <p className="text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
                        Your table and pre-ordered menu have been secured. A holographic confirmation has been sent to {formData.email}.
                    </p>
                    <button 
                        onClick={resetAndClose}
                        className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-transform hover:scale-105"
                    >
                        Return to Lobby
                    </button>
                </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;