import React from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageSquare, 
  Globe, 
  Compass, 
  Sparkles, 
  CalendarDays,
  ExternalLink
} from 'lucide-react';

interface RestaurantInfoViewProps {
  onOpenBooking: () => void;
}

export default function RestaurantInfoView({ onOpenBooking }: RestaurantInfoViewProps) {
  
  const handleCall = () => {
    window.location.href = "tel:07643097915";
  };

  const handleWhatsapp = () => {
    const text = encodeURIComponent("Hello SPICY BAWARCHI, I would like to reserve a premium table or discuss catering services.");
    window.open(`https://wa.me/917643097915?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleGetDirections = () => {
    window.open("https://maps.google.com/?q=Spicy+Bawarchi+Forbesganj+Bihar", "_blank");
  };

  return (
    <div className="pb-36 min-h-screen px-4 pt-20 max-w-5xl mx-auto text-white select-none relative" id="restaurant-info-view">
      
      {/* Background Ambience Sparks to feel incredibly premium */}
      <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-orange-500/5 blur-[150px] pointer-events-none"></div>

      {/* Main Title Headers */}
      <div className="text-center mb-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#FFC857] text-[11px] font-mono tracking-widest uppercase font-bold mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFC857] animate-spin" />
          ESTABLISHED 2024 • LUXURY RESTAURANT CHAIN
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black font-display tracking-tight text-white mb-2"
        >
          SPICY <span className="text-[#FF6B00]">BAWARCHI</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs md:text-sm text-gray-400 font-sans tracking-widest uppercase italic max-w-md mx-auto"
        >
          Near Forbesganj College Flyover, Bihar
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* Left Side: Premium Details, Hours, Address */}
        <div className="md:col-span-6 flex flex-col justify-between gap-6">
          
          {/* Main info card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-neutral-900/80 border border-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 space-y-6"
          >
            <h2 className="text-lg font-bold font-display tracking-wide uppercase text-white border-b border-white/5 pb-3 flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#FF6B00]" />
              <span>Cuisine Sanctuary</span>
            </h2>

            <div className="space-y-6">
              
              {/* Address Slot */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/10 shrink-0">
                  <MapPin className="w-5 h-5 text-[#FF6B00]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">Our Location Address</h4>
                  <p className="text-sm text-gray-200 font-light leading-relaxed">
                    Near Forbesganj College Flyover,<br />
                    In Front of Sant Nirankari Satsang Bhawan,<br />
                    Forbesganj, Bihar 854318
                  </p>
                </div>
              </div>

              {/* Contact Phone Hotlink */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/10 shrink-0">
                  <Phone className="w-5 h-5 text-[#FFC857]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">Direct Call Hotline</h4>
                  <p className="text-base font-extrabold text-[#FFC857] font-mono tracking-wider">
                    076430 97915
                  </p>
                  <span className="text-[10px] text-[#FF6B00] font-mono">Accepting reservations, events & orders</span>
                </div>
              </div>

              {/* Operational Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-950 flex items-center justify-center border border-white/5 shrink-0">
                  <Clock className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">Daily Operational Hours</h4>
                  <p className="text-sm text-white font-medium">
                    Everyday: <span className="text-[#FF6B00]">10:00 AM – 11:00 PM</span>
                  </p>
                  <span className="text-[10px] text-gray-500 font-mono">Kitchen closes at 10:45 PM for sanitizing</span>
                </div>
              </div>

            </div>

          </motion.div>

          {/* Luxury Interactive Action Hub Cards */}
          <div className="grid grid-cols-3 gap-3">
            
            {/* Call card */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCall}
              className="bg-neutral-900 border border-white/5 hover:border-[#FF6B00]/40 rounded-2xl p-4 text-center cursor-pointer flex flex-col items-center justify-center gap-2 group transition-all"
            >
              <Phone className="w-5 h-5 text-[#FF6B00] group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-300 font-mono">Call Host</span>
            </motion.button>

            {/* WhatsApp card */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleWhatsapp}
              className="bg-neutral-900 border border-[#FF6B00]/20 hover:border-orange-500 rounded-2xl p-4 text-center cursor-pointer flex flex-col items-center justify-center gap-2 group transition-all"
            >
              <MessageSquare className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-300 font-mono">WhatsApp</span>
            </motion.button>

            {/* Directions card */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleGetDirections}
              className="bg-neutral-900 border border-white/5 hover:border-[#FFC857]/40 rounded-2xl p-4 text-center cursor-pointer flex flex-col items-center justify-center gap-2 group transition-all"
            >
              <MapPin className="w-5 h-5 text-[#FFC857] group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-300 font-mono">Directions</span>
            </motion.button>

          </div>

          {/* Quick Banquet book block */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-tr from-neutral-950 via-amber-950/20 to-neutral-950 border border-amber-500/10 rounded-3xl p-5 flex items-center justify-between gap-4"
          >
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Plan Elite Gatherings</h5>
              <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed font-light">
                Reserve custom themed family halls & premium buffet star arrangements.
              </p>
            </div>
            <button 
              onClick={onOpenBooking}
              className="bg-gradient-to-r from-[#FFC857] to-[#FFAA00] text-black font-extrabold text-[11px] px-4 py-2 rounded-xl shrink-0 cursor-pointer shadow-lg hover:scale-105 transition-transform"
            >
              Book Event
            </button>
          </motion.div>

        </div>

        {/* Right Side: High contrast Map frame */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-6 bg-[#121212] rounded-3xl overflow-hidden border border-white/5 relative min-h-[350px] flex flex-col justify-between"
        >
          {/* Map header */}
          <div className="bg-neutral-900 border-b border-white/5 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-mono font-medium tracking-wider text-gray-300">Live Satellite Terminal map</span>
            </div>
            <button 
              onClick={handleGetDirections}
              className="text-[11px] font-bold text-[#FF6B00] hover:underline flex items-center gap-1 cursor-pointer"
            >
              Google Maps <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* Map canvas */}
          <div className="relative flex-1 bg-neutral-950">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1s0x39ef05eb1bf26e79%3A0xeebd6361a293c830!2sSpicy%20Bawarchi!5e0!3m2!1sen!2sin!4v1716943194012!5m2!1sen!2sin" 
              className="w-full h-full border-0 absolute inset-0 opacity-80 hover:opacity-100 transition-opacity" 
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Spicy Bawarchi Premium Forbesganj Map Directions"
            ></iframe>
          </div>

          {/* Map footer details */}
          <div className="bg-neutral-900/90 border-t border-white/5 p-4">
            <div className="flex justify-between items-baseline">
              <span className="text-[10px] text-gray-500 font-mono uppercase">Flyover Branch zone</span>
              <span className="text-xs text-white font-medium">Bihar 854318, India</span>
            </div>
          </div>

        </motion.div>

      </div>

    </div>
  );
}
