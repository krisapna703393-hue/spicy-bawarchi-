import React from 'react';
import { Home, BookOpen, CalendarDays, Compass } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'menu' | 'book-event' | 'contact';
  setActiveTab: (tab: 'home' | 'menu' | 'book-event' | 'contact') => void;
  cartCount: number;
}

export default function BottomNav({
  activeTab,
  setActiveTab,
  cartCount
}: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-3 pointer-events-none">
      <div className="max-w-md mx-auto bg-neutral-950/85 backdrop-blur-xl rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] border border-white/10 px-6 py-3 flex justify-between items-center pointer-events-auto transition-all">
        
        {/* Home Tab */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 transition-all duration-300 relative py-1 px-3 rounded-xl cursor-pointer ${
            activeTab === 'home' 
              ? 'text-[#FF6B00] scale-110' 
              : 'text-gray-400 hover:text-white'
          }`}
          id="nav-home"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight font-display">Home</span>
          {activeTab === 'home' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 bg-[#FF6B00] rounded-full shadow-[0_0_8px_#FF6B00]"></span>
          )}
        </button>

        {/* Menu Tab */}
        <button
          onClick={() => setActiveTab('menu')}
          className={`flex flex-col items-center gap-1 transition-all duration-300 relative py-1 px-3 rounded-xl cursor-pointer ${
            activeTab === 'menu' 
              ? 'text-[#FF6B00] scale-110' 
              : 'text-gray-400 hover:text-white'
          }`}
          id="nav-menu"
        >
          <div className="relative">
            <BookOpen className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-[#FF6B00] text-black font-black text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full border border-black animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight font-display">Menu</span>
          {activeTab === 'menu' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 bg-[#FF6B00] rounded-full shadow-[0_0_8px_#FF6B00]"></span>
          )}
        </button>

        {/* Book Event Tab */}
        <button
          onClick={() => setActiveTab('book-event')}
          className={`flex flex-col items-center gap-1 transition-all duration-300 relative py-1 px-3 rounded-xl cursor-pointer ${
            activeTab === 'book-event' 
              ? 'text-[#FF6B00] scale-110' 
              : 'text-gray-400 hover:text-white'
          }`}
          id="nav-book-event"
        >
          <CalendarDays className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight font-display">Book Event</span>
          {activeTab === 'book-event' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 bg-[#FF6B00] rounded-full shadow-[0_0_8px_#FF6B00]"></span>
          )}
        </button>

        {/* Contact Restaurant Info Tab */}
        <button
          onClick={() => setActiveTab('contact')}
          className={`flex flex-col items-center gap-1 transition-all duration-300 relative py-1 px-3 rounded-xl cursor-pointer ${
            activeTab === 'contact' 
              ? 'text-[#FF6B00] scale-110' 
              : 'text-gray-400 hover:text-white'
          }`}
          id="nav-contact"
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight font-display">Contact</span>
          {activeTab === 'contact' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 bg-[#FF6B00] rounded-full shadow-[0_0_8px_#FF6B00]"></span>
          )}
        </button>

      </div>
    </div>
  );
}
