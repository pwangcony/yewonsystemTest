import { useState, useEffect, useRef } from 'react';
import { Plus, MessageCircle, ArrowUp, MessageSquare } from 'lucide-react';
import gsap from 'gsap';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const itemsRef = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    // Ensure the array only contains valid elements
    const targets = itemsRef.current.filter(Boolean);

    if (isOpen) {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: {
            amount: 0.2,
            from: "end" // Animates from bottom to top
          },
          ease: "elastic.out(1, 0.6)",
          pointerEvents: "auto",
        }
      );
    } else {
      gsap.to(targets, {
        opacity: 0,
        y: 20,
        scale: 0.8,
        duration: 0.3,
        stagger: {
          amount: 0.1,
          from: "start" // Animates from top to bottom
        },
        ease: "power3.in",
        pointerEvents: "none",
      });
    }
  }, [isOpen]);

  const scrollToTop = () => {
    const container = document.getElementById('main-scroll-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-4">
      {/* Floating Menu */}
      <div className="flex flex-col items-end gap-3">
        <a
          ref={(el) => { itemsRef.current[0] = el; }}
          href="#"
          onClick={(e) => e.preventDefault()}
          className="opacity-0 pointer-events-none group"
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-full shadow-xl border border-white/30 bg-white/60 backdrop-blur-lg group-hover:bg-white/90 transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1">
            <span className="text-sm font-medium text-gray-800 group-hover:text-[#3A2929] transition-colors">카톡 채널</span>
            <div className="w-9 h-9 bg-[#FEE500] text-[#3A2929] rounded-full flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110">
              <MessageCircle size={18} fill="currentColor" />
            </div>
          </div>
        </a>
        <a
          ref={(el) => { itemsRef.current[1] = el; }}
          href="#"
          onClick={(e) => e.preventDefault()}
          className="opacity-0 pointer-events-none group"
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-full shadow-xl border border-white/30 bg-white/60 backdrop-blur-lg group-hover:bg-white/90 transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1">
            <span className="text-sm font-medium text-gray-800 group-hover:text-[#03C75A] transition-colors">네이버 톡톡</span>
            <div className="w-9 h-9 bg-[#03C75A] text-white rounded-full flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110">
              <MessageSquare size={18} fill="currentColor" />
            </div>
          </div>
        </a>
        <button
          ref={(el) => { itemsRef.current[2] = el; }}
          onClick={scrollToTop}
          className="opacity-0 pointer-events-none group"
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-full shadow-xl border border-white/30 bg-white/60 backdrop-blur-lg group-hover:bg-white/90 transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1">
            <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900 transition-colors">위로가기</span>
            <div className="w-9 h-9 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
              <ArrowUp size={18} />
            </div>
          </div>
        </button>
      </div>

      {/* Main FAB */}
      <div className="relative">
        {/* Subtle Pulse Effect */}
        <div 
          className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-30" 
          style={{ animationDuration: '3s' }}
        />
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-16 h-16 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 z-10 border-2 border-emerald-400/30"
        >
          <Plus 
            size={32} 
            className={`transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isOpen ? 'rotate-[135deg]' : 'rotate-0'}`} 
          />
        </button>
      </div>
    </div>
  );
}
