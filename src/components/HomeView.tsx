import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  CalendarDays, 
  Star, 
  Sparkles, 
  UtensilsCrossed, 
  Heart, 
  ShoppingCart, 
  Compass,
  ArrowRight,
  Clock,
  Menu as MenuIcon,
  Crown,
  Flame,
  MousePointer,
  ChevronRight
} from 'lucide-react';
import { MenuItem } from '../types';
import { CUSTOMER_REVIEWS, GALLERY_ITEMS } from '../data';

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

interface HomeViewProps {
  menuItems: MenuItem[];
  setActiveTab: (tab: 'home' | 'menu' | 'book-event' | 'contact') => void;
  setSelectedCategory: (category: string) => void;
  addToCart: (item: MenuItem) => void;
  toggleFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
  openPartyBooking: () => void;
  onQuickReorder: (items: any[]) => void;
}

export default function HomeView({
  menuItems,
  setActiveTab,
  setSelectedCategory,
  addToCart,
  toggleFavorite,
  isFavorite,
  openPartyBooking,
}: HomeViewProps) {
  
  // States
  const [heroBgIndex, setHeroBgIndex] = useState(0);

  // Background culinary photography slide for the ultimate Cinematic Hero zoom effect
  const HERO_IMAGES = [
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=1600", // Tawa Veg Fire Roast
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1600", // Dal Makhani Bubbles
    "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=1600"  // Hot Butter Naan oven
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroBgIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Filter datasets
  const chefRecommended = menuItems.filter(item => item.rating >= 4.8 && item.isBestSeller).slice(0, 3);
  const signatureDishes = menuItems.filter(item => item.category === "VEGETABLES" || item.category === "TANDOOR SE").slice(4, 11);

  // General Call and WhatsApp Triggers
  const handleCall = () => {
    window.location.href = "tel:07643097915";
  };

  const handleWhatsappDefault = () => {
    const text = encodeURIComponent("Hello SPICY BAWARCHI, I would like to explore your luxury dining menu and place a gourmet order.");
    window.open(`https://wa.me/917643097915?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleGetDirections = () => {
    window.open("https://maps.google.com/?q=Spicy+Bawarchi+Forbesganj+Bihar", "_blank");
  };

  return (
    <div className="pb-32 text-white overflow-hidden bg-[#070707]" id="home-view-root">
      
      {/* ================================================== */}
      {/* SECTION 1: LUXURY CINEMATIC HERO (FIRST SCREEN IMPACT) */}
      {/* ================================================== */}
      <section className="relative min-h-[100vh] flex flex-col justify-center items-center px-4 overflow-hidden">
        
        {/* Dynamic Image Slideshow Backdrop with Zoom */}
        <div className="absolute inset-0 z-0 bg-[#070707]">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroBgIndex}
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1.02, opacity: 0.45 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 2.2, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${HERO_IMAGES[heroBgIndex]})` }}
            />
          </AnimatePresence>
          
          {/* Searing Fire/Heat Gradients and Charcoal Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/75 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/90 via-transparent to-[#070707]/90" />

          {/* Interactive Fire Grill Sparks Overlay */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-gradient-to-t from-orange-500 to-amber-400 rounded-full shadow-[0_0_8px_#FF6B00]"
                style={{
                  bottom: "5%",
                  left: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  y: [0, -750],
                  x: [0, Math.random() * 80 - 40],
                  opacity: [0, 0.8, 0.9, 0],
                  scale: [1, 1.8, 0.8]
                }}
                transition={{
                  duration: 6 + Math.random() * 6,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        </div>

        {/* Center Content Box */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center pt-24 pb-12">
          
          {/* Subtle luxury badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2 bg-black/60 border border-amber-600/30 px-5 py-2 rounded-full backdrop-blur-md"
          >
            <Flame className="w-4.5 h-4.5 text-[#FF6B00] animate-pulse" />
            <span className="text-[10px] md:text-xs font-mono tracking-widest text-[#FFC857] uppercase font-bold">
              ESTABLISHED IN BIHAR • MASTER CLASS FLAVORS
            </span>
          </motion.div>

          {/* Spicy Bawarchi Display Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-9xl font-black font-display tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-amber-500/85"
            style={{ textShadow: "0 0 40px rgba(255,107,0,0.15)" }}
          >
            SPICY BAWARCHI
          </motion.h1>

          {/* Slogan */}
          <motion.p 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-3xl font-light text-gray-300 font-sans tracking-widest italic mb-10 max-w-xl text-center"
          >
            &ldquo;Every Bite Tells A Story&rdquo;
          </motion.p>

          {/* Action Callouts */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-6"
          >
            {/* Reserve Table (Triggers Event Booking tab) */}
            <button 
              onClick={() => setActiveTab('book-event')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#FF6B00] hover:bg-orange-500 text-black font-black py-4 px-8 rounded-xl shadow-[0_5px_30px_rgba(255,107,0,0.4)] hover:scale-[1.04] transition-all duration-300 active:scale-95 text-xs md:text-sm uppercase tracking-widest cursor-pointer"
            >
              <CalendarDays className="w-5 h-5 text-black" />
              <span>Reserve Table</span>
            </button>

            {/* Order On WhatsApp */}
            <button 
              onClick={handleWhatsappDefault}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-neutral-900 hover:bg-[#151515] text-white border border-white/10 hover:border-white/30 font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-[1.04] backdrop-blur-md active:scale-95 text-xs md:text-sm uppercase tracking-widest cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 text-green-500" />
              <span>Order On WhatsApp</span>
            </button>
          </motion.div>

        </div>

        {/* Dynamic Apple-Style Mouse Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10 opacity-60">
          <span className="text-[9px] font-mono tracking-widest text-[#FFC857] uppercase">Scroll to Discover</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-1.5">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full"
            />
          </div>
        </div>

      </section>

      {/* ================================================== */}
      {/* SECTION 2: CHEF RECOMMENDED DISHES (LARGE PREMIUM CARDS) */}
      {/* ================================================== */}
      <section className="px-5 py-20 max-w-6xl mx-auto border-t border-white/5 relative z-10">
        
        <div className="mb-12 text-center md:text-left">
          <span className="text-[#FF6B00] font-mono text-[10px] tracking-widest uppercase font-extrabold block">Bawarchi Crown Selection</span>
          <h2 className="text-3xl md:text-5xl font-black font-display text-white mt-1">
            Chef RECOMMENDED DISHES
          </h2>
          <p className="text-xs text-gray-500 mt-2 max-w-md">
            Our head chef's personal curated masterpieces, composed of fresh farm vegetables and raw tandoor spices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {chefRecommended.map((item, idx) => (
            <motion.div 
              key={item.id}
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-neutral-900/90 border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden bg-neutral-950">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Veg Signature Indicator */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm p-1.5 rounded-lg border border-white/10">
                  <span className={`w-3 h-3 border ${item.isVeg ? 'border-green-600 bg-green-500/10' : 'border-red-600 bg-red-500/10'} flex items-center justify-center rounded-[3px]`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 bg-black/85 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-mono font-bold text-[#FFC857] flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{item.rating} chef score</span>
                </div>
              </div>

              <div className="p-6 text-left flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-display text-white line-clamp-1 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed mb-6 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                  <div>
                    <span className="text-[10px] text-gray-500 font-mono block uppercase">Base Price</span>
                    <span className="text-lg font-extrabold text-[#FFC857]">₹{item.price}</span>
                  </div>
                  
                  <button 
                    onClick={() => addToCart(item)}
                    className="bg-[#FF6B00] hover:bg-orange-500 text-black font-extrabold text-xs py-2.5 px-5 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>ADD DISH</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 3: SIGNATURE DISHES (HORIZONTAL PREMIUM SLIDER) */}
      {/* ================================================== */}
      <section className="py-20 bg-neutral-950/60 border-y border-white/5 relative z-10">
        <div className="px-5 max-w-6xl mx-auto mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="text-left">
            <span className="text-[#FFC857] font-mono text-[10px] tracking-widest uppercase font-extrabold block">Handpicked Masterpieces</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display text-white mt-1">
              SIGNATURE DISHES
            </h2>
          </div>
          <button 
            onClick={() => setActiveTab('menu')}
            className="text-xs font-bold text-[#FF6B00] hover:underline flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            Explore Master Menu <ArrowRight className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Horizontal Slider container */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8 px-5 max-w-7xl mx-auto">
          {signatureDishes.map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ scale: 1.02 }}
              className="bg-neutral-900/80 border border-white/5 p-4 rounded-2xl w-64 shrink-0 hover:border-orange-500/20 hover:shadow-[0_10px_25px_rgba(255,107,0,0.1)] transition-all flex flex-col justify-between"
            >
              <div className="h-36 rounded-xl overflow-hidden mb-4 bg-neutral-950 relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-2 left-2 bg-black/75 px-2 py-0.5 rounded text-[10px] font-mono text-gray-300">
                  ⏱️ {item.prepTime}
                </span>
              </div>

              <div className="text-left">
                <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wide">{item.category}</span>
                <h4 className="text-base font-bold font-display text-white truncate mt-0.5">{item.name}</h4>
                <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 min-h-[32px]">{item.description}</p>
              </div>

              <div className="flex items-center justify-between mt-4 border-t border-white/5 pt-3">
                <span className="text-sm font-black text-[#FFC857]">₹{item.price}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-neutral-800 hover:bg-[#FF6B00] hover:text-black text-[#FF6B00] font-bold text-[10px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  + ADD
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 4: SPECIAL THALI HIGHLIGHT (LARGE FEATURED SECTION) */}
      {/* ================================================== */}
      <section className="px-5 py-24 max-w-6xl mx-auto relative z-10">
        
        <div className="bg-gradient-to-br from-neutral-900 via-[#101010] to-neutral-900 rounded-3xl overflow-hidden border border-white/10 p-8 md:p-14 shadow-2xl relative">
          
          {/* Subtle gold spotlight behind the Thali illustration */}
          <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-500/10 blur-[130px] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Descriptive Content Left */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              <span className="bg-amber-600/10 text-[#FFC857] text-[10px] font-mono tracking-widest px-3 py-1 rounded-full uppercase font-bold border border-amber-500/20 inline-flex items-center gap-1">
                <Crown className="w-3.5 h-3.5" />
                Featured Culinary Masterwork
              </span>

              <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight leading-none text-white">
                Bawarchi Special <span className="text-[#FF6B00]">Royal Thali</span>
              </h2>

              <p className="text-gray-300 font-light text-sm md:text-base leading-relaxed">
                The ultimate imperial Indian dinner experience, meticulously balanced for rich textures, authentic spices, and absolute presentation. Featuring aromatic Dal Makhani, Paneer Butter Masala, fresh Mix Vegetables, long-grain long Jeera Basmati Rice, direct fresh clay-oven Naan flatbreads, crispy papad, and fresh-whipped Sweet Lassi. Fully satisfying for a grand dining ritual.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/5 pt-6">
                <div>
                  <span className="text-gray-500 text-[10px] uppercase font-mono block">Preparation</span>
                  <span className="text-xs font-bold text-white uppercase mt-0.5 block">15 Mins Fast</span>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] uppercase font-mono block">Plates scale</span>
                  <span className="text-xs font-bold text-[#FF6B00] uppercase mt-0.5 block">Grand Complete</span>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] uppercase font-mono block">Dairy standard</span>
                  <span className="text-xs font-bold text-white uppercase mt-0.5 block">100% Pure Ghee</span>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] uppercase font-mono block">Cuisine type</span>
                  <span className="text-xs font-bold text-[#FFC857] uppercase mt-0.5 block">Vegetarian Royal</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button 
                  onClick={() => {
                    const thaliItem = menuItems.find(i => i.id === "th1");
                    if (thaliItem) addToCart(thaliItem);
                  }}
                  className="w-full sm:w-auto bg-[#FF6B00] hover:bg-orange-500 text-black font-extrabold text-xs uppercase tracking-widest py-3.5 px-8 rounded-xl transition-transform active:scale-95 shadow-xl cursor-pointer"
                >
                  Order Thali Now • ₹210 Only
                </button>
              </div>

            </div>

            {/* Immersive Photography Right */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-square bg-[#070707] group">
                <img 
                  src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=650" 
                  alt="Elite Royal Thali presentation" 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="text-[10px] font-mono tracking-widest text-[#FFC857] uppercase bg-black/60 px-3 py-1 rounded border border-white/10">
                    SBM Signature Platter
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* ================================================== */}
      {/* SECTION 5: BIRTHDAY / ANNIVERSARY / PARTY BOOKING (LUXURY CARDS) */}
      {/* ================================================== */}
      <section className="px-5 py-20 bg-neutral-950 border-y border-white/5 relative z-10">
        
        <div className="max-w-6xl mx-auto mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-4">
          <div className="text-left">
            <span className="text-[#FF6B00] font-mono text-[10px] tracking-widest uppercase font-extrabold block">Royal Celebrations venue</span>
            <h2 className="text-3xl md:text-5xl font-black font-display text-white mt-1">
              Private Events Booking
            </h2>
          </div>
          <button 
            onClick={() => setActiveTab('book-event')}
            className="text-xs font-bold text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer bg-neutral-900 border border-white/5 py-2.5 px-5 rounded-xl"
          >
            Go Book Event Panel <ChevronRight className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Luxury Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
          {EVENT_TYPES.slice(0, 3).map((item) => (
            <div 
              key={item.value}
              className="bg-neutral-900 border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative h-80 flex flex-col justify-end p-6 group cursor-pointer"
              onClick={() => setActiveTab('book-event')}
            >
              <img 
                src={item.img} 
                alt={item.value} 
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90 transition-opacity" />

              <div className="relative z-10 space-y-2">
                <span className="text-[10px] text-[#FFC857] font-mono uppercase tracking-widest">
                  VIP Banquets Category
                </span>
                <h3 className="text-xl font-bold font-display text-white">
                  {item.label}
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {item.tagline}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs text-[#FF6B00] font-bold">
                  <span>Reserve Venue Space</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ================================================== */}
      {/* SECTION 6: RESTAURANT STORY (WHY CUSTOMERS LOVE SPICY BAWARCHI) */}
      {/* ================================================== */}
      <section className="px-5 py-24 max-w-5xl mx-auto relative z-10 text-center">
        
        <div className="space-y-6">
          <span className="text-[#FFC857] font-mono text-[10px] tracking-widest uppercase font-extrabold block">Our Heritage Chronicles</span>
          
          <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tight text-center max-w-2xl mx-auto">
            The Story Of SPICY <span className="text-[#FF6B00]">BAWARCHI</span>
          </h2>
          
          <p className="text-gray-300 font-light text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-sans">
            Founded with a vision to redefine luxury vegetarian and traditional Indian hospitality in Forbesganj, Araria district, Spicy Bawarchi brings an elegant culinary sanctuary worthy of a five-star hotel. Our name represents our commitment to culinary heritage: "Bawarchi" refers to the royal court chefs of ancient India, while "Spicy" celebrates the complex, majestic spice blends formulated uniquely by our kitchen. From double-broth yellow tarka to slow-roasted clay chamber tikkas, every single preparation carries absolute integrity, love, and taste precision.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/5">
            <div className="p-4 bg-neutral-900/40 rounded-2xl border border-white/5">
              <span className="text-2xl font-black text-[#FF6B00] font-mono">100%</span>
              <span className="text-[10px] text-gray-500 font-mono uppercase block mt-1">Vegetarian Purity</span>
            </div>
            <div className="p-4 bg-neutral-900/40 rounded-2xl border border-white/5">
              <span className="text-2xl font-black text-[#FFC857] font-mono">18 Hrs</span>
              <span className="text-[10px] text-gray-500 font-mono uppercase block mt-1">Slow Cooked Dal</span>
            </div>
            <div className="p-4 bg-neutral-900/40 rounded-2xl border border-white/5">
              <span className="text-2xl font-black text-white font-mono">5 Star</span>
              <span className="text-[10px] text-gray-500 font-mono uppercase block mt-1">Gourmet Standard</span>
            </div>
            <div className="p-4 bg-neutral-900/40 rounded-2xl border border-white/5">
              <span className="text-2xl font-black text-[#FF6B00] font-mono">10 Min</span>
              <span className="text-[10px] text-gray-500 font-mono uppercase block mt-1">SBM Response</span>
            </div>
          </div>
        </div>

      </section>

      {/* ================================================== */}
      {/* SECTION 7: CUSTOMER REVIEWS (GLASSMORPHISM REVIEWS) */}
      {/* ================================================== */}
      <section className="px-5 py-20 bg-neutral-950/60 border-t border-white/5 relative z-10">
        
        <div className="max-w-6xl mx-auto text-center mb-14">
          <span className="text-[#FF6B00] font-mono text-[10px] tracking-widest uppercase font-extrabold block">Patron Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-black font-display text-white mt-1">
            WHAT OUR PATRONS SAY
          </h2>
          <div className="flex items-center justify-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
            ))}
            <span className="text-xs text-gray-400 font-mono ml-2 font-bold">(4.9 out of 5 from 1,200+ guests)</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div 
              key={rev.id}
              className="bg-neutral-900/40 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md relative flex flex-col justify-between"
            >
              <div className="absolute top-6 right-6 text-orange-500/10 font-serif text-6xl select-none pointer-events-none">&ldquo;</div>
              
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-light mb-6">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3.5 border-t border-white/5 pt-4 mt-auto">
                <img 
                  src={rev.avatarUrl} 
                  alt={rev.name} 
                  className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{rev.name}</h4>
                  <span className="text-[9px] text-gray-500 font-mono block mt-0.5">{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ================================================== */}
      {/* SECTION 8: CONTACT & DIRECTIONS */}
      {/* ================================================== */}
      <section className="px-5 py-24 max-w-6xl mx-auto relative z-10 text-left border-t border-white/5">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-4 bg-neutral-900 border border-white/5 p-6 md:p-8 rounded-3xl flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="text-xl font-bold font-display uppercase tracking-wider text-white flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-[#FF6B00]" />
                <span>SPICY BAWARCHI</span>
              </h2>

              <div className="space-y-4 text-xs md:text-sm text-gray-300">
                <p className="leading-relaxed font-light">
                  <strong>📍 Address:</strong><br />
                  Near Forbesganj College Flyover,<br />
                  In Front of Sant Nirankari Satsang Bhawan,<br />
                  Forbesganj, Bihar 854318
                </p>
                <p className="font-mono">
                  <strong>📞 Hotline:</strong> <span className="text-[#FFC857] font-bold">076430 97915</span>
                </p>
                <p className="font-light">
                  <strong>⏰ Cooking Hours:</strong> Everyday 10:00 AM – 11:00 PM
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex gap-2.5">
              <button 
                onClick={handleGetDirections}
                className="flex-1 bg-white hover:bg-neutral-100 text-black font-extrabold text-xs uppercase tracking-wide py-3 px-3 rounded-xl flex items-center justify-center gap-1"
              >
                <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>Map Directions</span>
              </button>
              <button 
                onClick={handleCall}
                className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 rounded-xl flex items-center justify-center"
              >
                <Phone className="w-4 h-4 text-[#FF6B00]" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-white/5 bg-[#121212] relative min-h-[300px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1s0x39ef05eb1bf26e79%3A0xeebd6361a293c830!2sSpicy%20Bawarchi!5e0!3m2!1sen!2sin!4v1716943194012!5m2!1sen!2sin" 
              className="w-full h-full border-0 absolute inset-0 opacity-80 hover:opacity-100 transition-opacity" 
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Spicy Bawarchi Geolocation Marker"
            ></iframe>
          </div>

        </div>

      </section>

    </div>
  );
}
