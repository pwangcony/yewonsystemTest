import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { MoveHorizontal } from 'lucide-react';

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <section id="before-after" className="py-24 bg-gray-900 text-white overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-accent-400 font-semibold tracking-wider uppercase text-sm mb-3">시공 전후 비교</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">확연한 차이를 확인하세요</h3>
          <p className="text-gray-400 text-lg break-keep">
            복잡하게 노출된 배관에서 깔끔하게 통합된 공조 시스템으로. 슬라이더를 움직여 비교해 보세요.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto relative rounded-2xl overflow-hidden shadow-2xl aspect-[16/9] md:aspect-[21/9] select-none cursor-ew-resize"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={(e) => {
            setIsDragging(true);
            handleMove(e.clientX);
          }}
          onTouchStart={(e) => {
            setIsDragging(true);
            handleMove(e.touches[0].clientX);
          }}
        >
          {/* After Image (Base) */}
          <div 
            className="absolute inset-0 bg-cover bg-center pointer-events-none"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2053")' }}
          />

          {/* After Text (Clipped) */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
          >
            <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold border border-white/20">
              시공 후: 깔끔한 마감
            </div>
          </div>

          {/* Before Image (Clipped) */}
          <div 
            className="absolute inset-0 bg-cover bg-center pointer-events-none"
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1504307651254-35680f356f12?auto=format&fit=crop&q=80&w=2070")',
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
            }}
          >
            <div className="absolute top-6 left-6 bg-gray-900/50 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold border border-white/10">
              시공 전: 노출된 배관
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-900">
              <MoveHorizontal size={24} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
