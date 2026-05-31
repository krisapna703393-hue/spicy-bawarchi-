import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  CalendarDays, 
  Sparkles, 
  MessageCircle, 
  CheckCircle2,
  BookmarkCheck,
  ShieldCheck,
  Crown,
  ChevronRight
} from 'lucide-react';
import { PartyBooking } from '../types';

interface PartyBookingViewProps {
  onSubmitBooking: (booking: PartyBooking) => void;
}

const EVENT_TYPES = [
  { 
    value: 'Birthday Party', 
    label: 'Birthday Celebration', 
    img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600', 
    tagline: 'Make your special day legendary with live fire grills and premium cake layouts.' 
  },
  { 
    value: 'Anniversary Party', 
    label: 'Anniversary Gala', 
    img: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=600', 
    tagline: 'Cherish milestones under elegant ambient chandeliers and pristine table service.' 
  },
  { 
    value: 'Wedding Function', 
    label: 'Royal Wedding Banquet', 
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600', 
    tagline: 'A majestic settings with rich Indian tandoor buffets and standard silver services.' 
  },
  { 
    value: 'Corporate Event', 
    label: 'Corporate Retreat', 
    img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600', 
    tagline: 'High-end corporate layouts, seamless hosting, and premium team buffet plans.' 
  },
  { 
    value: 'Family Gathering', 
    label: 'Intimate Family Reunion', 
    img: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=600', 
    tagline: 'Cozy private halls paired with authentic heritage Indian tandoors and desserts.' 
  }
];

export default function PartyBookingView({
  onSubmitBooking
}: PartyBookingViewProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState<string>('Birthday Party');
  const [date, setDate] = useState('');
  const [guestCount, setGuestCount] = useState<number>(50);
  const [specialRequirements, setSpecialRequirements] = useState('');
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [placedBooking, setPlacedBooking] = useState<PartyBooking | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date) {
      alert("Please enter Name, Contact Phone, and Date parameters.");
      return;
    }

    const newBooking: PartyBooking = {
      id: "BK-" + Math.floor(1000 + Math.random() * 9000),
      customerName: name,
      phoneNumber: phone,
      eventType: eventType as any,
      date,
      guestCount,
      specialRequirements,
      timestamp: Date.now()
    };

    onSubmitBooking(newBooking);
    setPlacedBooking(newBooking);
    setIsSuccess(true);
  };

  const handleLaunchBookingWhatsapp = () => {
    if (!placedBooking) return;

    const message = `Hello SPICY BAWARCHI,\n\nI want to book an Elite Event:\n\n• Name: ${placedBooking.customerName}\n• Phone: ${placedBooking.phoneNumber}\n• Event Type: ${placedBooking.eventType}\n• Target Date: ${placedBooking.date}\n• Guest Count: ${placedBooking.guestCount} Guests\n• Custom Demands: ${placedBooking.specialRequirements || "None"}\n\nPlease confirm availability for early booking. Thank you.`;
    
    const prefilledUrl = `https://wa.me/917643097915?text=${encodeURIComponent(message)}`;
    window.open(prefilledUrl, '_blank', 'noopener,noreferrer');

    setIsSuccess(false);
    setPlacedBooking(null);
  };

  return (
    <div className="pb-36 min-h-screen px-4 pt-20 max-w-5xl mx-auto text-white select-none relative" id="party-booking-view">
      
      {/* Background Ambience sparkles */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-orange-600/5 blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-amber-500/5 blur-[150px] pointer-events-none"></div>

      {/* Main Title Headers */}
      <div className="mb-10 text-center md:text-left">
        <span className="text-[11px] font-bold tracking-widest text-[#FF6B00] uppercase font-mono block">Bawarchi Celebrations</span>
        <h1 className="text-3xl md:text-5xl font-black font-display text-white mt-1">
          Bespoke Events & Banquet Halls
        </h1>
        <p className="text-xs text-gray-400 mt-2 max-w-xl">
          From weddings to royal retreats, we provide pristine catering menus, stunning table landscapes, and warm hospitality near the Forbesganj College Flyover.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          
          <motion.div
            key="booking-form-box"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Booking Form Left panel */}
            <form onSubmit={handleSubmit} className="lg:col-span-12 bg-neutral-900 border border-white/5 p-6 md:p-8 rounded-3xl space-y-6 text-left relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#FF6B00]"></div>

              <div>
                <h3 className="text-lg font-bold font-display text-white uppercase flex items-center gap-2">
                  <Crown className="w-5 h-5 text-[#FFC857]" />
                  <span>Reserve Venue Space</span>
                </h3>
                <p className="text-[10px] text-gray-500 font-mono">Fill out your physical arrangements requirements below</p>
              </div>

              {/* Luxury Image Choice Backdrops Grid */}
              <div className="space-y-3">
                <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">
                  1. Choose Celebration Experience
                </label>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {EVENT_TYPES.map((evItem) => {
                    const isSelected = eventType === evItem.value;
                    return (
                      <button
                        type="button"
                        key={evItem.value}
                        onClick={() => setEventType(evItem.value)}
                        className={`group relative h-40 rounded-2xl overflow-hidden border transition-all text-left flex flex-col justify-end p-4 cursor-pointer ${
                          isSelected 
                            ? 'border-[#FFC857] shadow-[0_0_20px_rgba(255,200,87,0.25)] ring-2 ring-[#FFC857]/40' 
                            : 'border-white/5 hover:border-white/20'
                        }`}
                      >
                        {/* Backdrop Image */}
                        <img 
                          src={evItem.img} 
                          alt={evItem.label} 
                          className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-300 ${
                          isSelected ? 'from-black via-black/80 to-black/35 opacity-90' : 'from-black via-black/90 to-black/50 opacity-80'
                        }`} />
                        
                        {/* Selector indicator */}
                        <div className="absolute top-3 right-3 z-10">
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'bg-[#FFC857] border-[#FFC857]' : 'border-white/30 bg-black/40'
                          }`}>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-black"></span>}
                          </span>
                        </div>

                        {/* Title and details */}
                        <div className="relative z-10">
                          <span className="text-xs font-black tracking-tight text-white block">
                            {evItem.label}
                          </span>
                          <span className="text-[9px] text-gray-400 mt-1 block leading-relaxed line-clamp-2">
                            {evItem.tagline}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personal details fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="text-left">
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5">Your Full Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Aditya Pathak"
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white focus:outline-none focus:border-[#FF6B00] transition-colors"
                  />
                </div>

                <div className="text-left">
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5">Active Phone Number</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="e.g. +91 76430 97915"
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white focus:outline-none focus:border-[#FF6B00] transition-colors"
                  />
                </div>

                <div className="text-left">
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5">Target Event Date</label>
                  <input 
                    type="date" 
                    required 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white focus:outline-none focus:border-[#FF6B00] transition-colors dark:[color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Slider meter and custom comments */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                
                {/* Guest counter */}
                <div className="md:col-span-5 bg-neutral-950 p-4 rounded-xl border border-white/5 flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Estimated Guests Scale</label>
                    <span className="text-xs font-bold text-[#FF6B00] font-mono">{guestCount} Guests</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <Users className="w-5 h-5 text-gray-500" />
                    <input 
                      type="range" 
                      min="20" 
                      max="500" 
                      step="10"
                      value={guestCount} 
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
                    />
                  </div>
                  <span className="text-[8px] font-mono text-gray-500 mt-2 block">Caterings start from 20 plates up to 500 guests capacity.</span>
                </div>

                {/* Requirements detail */}
                <div className="md:col-span-7">
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5">Fine Dining Themes & Dietary Specifications</label>
                  <textarea 
                    rows={2}
                    placeholder="e.g. Elegant stage setup, specific non-alcoholic beverages, pure tandoori appetizers counters..."
                    value={specialRequirements} 
                    onChange={(e) => setSpecialRequirements(e.target.value)}
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-[#FF6B00] resize-none"
                  />
                </div>

              </div>

              {/* Submitting core button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#FF6B00] hover:bg-orange-500 text-black font-extrabold py-3.5 rounded-xl text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-[0_5px_25px_rgba(255,107,0,0.3)] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-black animate-spin" />
                  <span>Submit Banquet Event Reservation Proposal</span>
                </button>
              </div>

            </form>

          </motion.div>

        ) : (
          
          // SUCCESSFUL SUBMITTED SCREEN
          <motion.div
            key="booking-success-box"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-neutral-950 border border-[#FF6B00]/40 rounded-3xl p-8 max-w-md mx-auto text-center shadow-[0_0_50px_rgba(255,107,0,0.35)] relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#FF6B00]/10 blur-xl pointer-events-none"></div>

            <div className="w-16 h-16 bg-[#FF6B00]/10 border border-[#FF6B00]/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#FF6B00] animate-bounce" />
            </div>

            <h3 className="text-2xl font-black font-display text-white mb-2">Banquet Booked!</h3>
            <p className="text-xs text-gray-300 mb-6 max-w-sm mx-auto leading-relaxed">
              Your prestigious dinner setting is now structured inside our calendar database. Please tap below to instantly send validation to Spicy Bawarchi on WhatsApp!
            </p>

            {placedBooking && (
              <div className="bg-neutral-905 border border-white/5 p-4 rounded-xl text-left text-xs space-y-2 mb-6 font-mono text-gray-300">
                <div>📌 <strong>Event Context:</strong> <span className="text-[#FFC857]">{placedBooking.eventType}</span></div>
                <div>📅 <strong>Target Date:</strong> <span className="text-white">{placedBooking.date}</span></div>
                <div>👥 <strong>Guest Scale:</strong> <span className="text-white">{placedBooking.guestCount} Guests</span></div>
                <div>📱 <strong>Client Name:</strong> <span className="text-white">{placedBooking.customerName}</span></div>
              </div>
            )}

            <button
              onClick={handleLaunchBookingWhatsapp}
              className="w-full bg-[#FF6B00] hover:bg-orange-500 text-black font-black py-4 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-[0_4px_30px_rgba(255,107,0,0.35)] cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-black" />
              <span>Validate Booking on WhatsApp</span>
            </button>

            <button 
              onClick={() => {
                setIsSuccess(false);
                setPlacedBooking(null);
              }}
              className="text-xs text-gray-500 hover:text-white mt-4 underline cursor-pointer font-mono decoration-[#FF6B00]"
            >
              Book Another Event
            </button>
          </motion.div>

        )}
      </AnimatePresence>

      {/* Safety info cards at bottom */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 text-left">
        <div className="bg-neutral-900/60 border border-white/5 p-5 rounded-2xl">
          <h4 className="text-xs font-bold text-white uppercase mb-1.5 font-display flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
            <span>Master Chefs</span>
          </h4>
          <p className="text-[11px] text-gray-400 leading-relaxed font-light">
            All tandoor starters and platters cooked directly by award-winning traditional bawarchis.
          </p>
        </div>
        <div className="bg-neutral-900/60 border border-white/5 p-5 rounded-2xl">
          <h4 className="text-xs font-bold text-white uppercase mb-1.5 font-display flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
            <span>Unmatched Luxury</span>
          </h4>
          <p className="text-[11px] text-gray-400 leading-relaxed font-light">
            Elegant gold-rimmed plates, designer server counters, and ambient candle setups inside.
          </p>
        </div>
        <div className="bg-neutral-900/60 border border-white/5 p-5 rounded-2xl">
          <h4 className="text-xs font-bold text-white uppercase mb-1.5 font-display flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
            <span>Flexible Plating</span>
          </h4>
          <p className="text-[11px] text-gray-400 leading-relaxed font-light">
            Customise spices, sugar-free desserts, and vegan-friendly alternatives freely with us.
          </p>
        </div>
      </div>

    </div>
  );
}
