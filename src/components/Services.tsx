import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useMotionTemplate, animate } from 'motion/react';
import { Building2, Home, Truck, CheckCircle2 } from 'lucide-react';

const services = [
  {
    id: 'residential',
    title: '아파트 시스템 에어컨',
    description: '현대적인 주거 공간을 위한 프리미엄 빌트인 에어컨 솔루션으로 모든 방의 완벽한 온도 조절을 보장합니다.',
    icon: Home,
    highlights: ['개별 공간 제어', '초저소음 운전', '고효율 에너지 절감'],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'commercial',
    title: '빌딩 및 오피스 솔루션',
    description: '상업 환경에 최적화된 확장 가능하고 강력한 공조 시스템입니다.',
    icon: Building2,
    highlights: ['중앙 집중식 관리', '대용량 냉난방', '실내 공기질 관리'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'distribution',
    title: '기기 유통 및 공급',
    description: '프리미엄 공조 기기 및 부품의 전국적인 공급망을 운영합니다.',
    icon: Truck,
    highlights: ['신속한 배송', '100% 정품 부품', 'B2B 파트너십'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
  },
];

const stats = [
  { label: '주거용 시공', value: 1500, suffix: '+' },
  { label: '상업용 시공', value: 480, suffix: '+' },
  { label: '년의 노하우', value: 15, suffix: '' },
  { label: '고객 만족도', value: 98, suffix: '%' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-black text-white">
      {count}{suffix}
    </span>
  );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const radius = useMotionValue(0);
  const x = useMotionValue("50%");
  const y = useMotionValue("50%");

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const localX = ((e.clientX - rect.left) / rect.width) * 100;
    const localY = ((e.clientY - rect.top) / rect.height) * 100;
    
    x.set(`${localX}%`);
    y.set(`${localY}%`);
    
    // Animate radius to create the water drop / ink bleed spread
    animate(radius, 150, { duration: 1.2, ease: [0.25, 1, 0.5, 1] });
  };

  const handleMouseLeave = () => {
    // Smoothly retract the color reveal
    animate(radius, 0, { duration: 0.8, ease: [0.25, 1, 0.5, 1] });
  };

  // Create a soft radial gradient mask for the color image
  const maskImage = useMotionTemplate`radial-gradient(circle at ${x} ${y}, black ${radius}%, transparent calc(${radius}% + 20%))`;

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl bg-gray-900"
    >
      {/* 1. Base Layer: Grayscale Image (No Blur) */}
      <div 
        className="absolute inset-0 bg-cover bg-center grayscale transition-transform duration-1000 group-hover:scale-105"
        style={{ backgroundImage: `url(${service.image})` }}
      />

      {/* 2. Reveal Layer: Full Color Image with Water Drop Mask */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
        style={{ 
          backgroundImage: `url(${service.image})`,
          WebkitMaskImage: maskImage,
          maskImage: maskImage
        }}
      />
      
      {/* 3. Gradient Overlay for text readability (No Glassmorphism) */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-1000 ease-out" />

      {/* 4. Content Layer (Clean, no background/borders) */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
        
        {/* Sliding Content */}
        <div className="translate-y-16 group-hover:translate-y-0 transition-transform duration-1000 ease-out">
          <div className="w-14 h-14 bg-gray-800 group-hover:bg-accent-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl transition-colors duration-700">
            <service.icon size={28} />
          </div>
          
          <h4 className="text-2xl font-bold text-white mb-3">{service.title}</h4>
          
          <p className="text-gray-300 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-100 ease-out line-clamp-2 group-hover:line-clamp-none break-keep">
            {service.description}
          </p>

          <div className="space-y-2 opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-1000 ease-out overflow-hidden">
            {service.highlights.map((highlight, i) => (
              <div key={i} className="flex items-center gap-2 text-white/90 text-sm">
                <CheckCircle2 size={16} className="text-accent-400" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-24 bg-gray-900 snap-start snap-always min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-600/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-500/20 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <h2 className="text-accent-400 font-semibold tracking-wider uppercase text-sm mb-3">전문 분야</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">종합 공조 솔루션</h3>
          <p className="text-gray-400 text-lg break-keep">
            개별 아파트부터 대형 상업용 건물까지, 효율성, 심미성, 편안함을 최우선으로 하는 맞춤형 공조 솔루션을 제공합니다.
          </p>
        </div>

        {/* Equal Weight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Interactive Stats Counter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center pt-12 border-t border-white/10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-default group"
            >
              <div className="transform group-hover:-translate-y-2 transition-transform duration-300">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <span className="text-primary-100 mt-2 font-medium group-hover:text-white transition-colors">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
