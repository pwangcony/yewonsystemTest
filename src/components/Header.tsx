import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Wind } from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { name: '홈', href: '#home' },
  { name: '서비스', href: '#services' },
  { name: '진행 과정', href: '#process' },
  { name: '포트폴리오', href: '#portfolio' },
  { name: '문의하기', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const container = document.getElementById('main-scroll-container');
    if (!container) return;

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const scrollY = target.scrollTop;
      setIsScrolled(scrollY > 50);

      // Scrollspy logic
      const sections = navItems.map(item => item.href.substring(1));
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollY >= element.offsetTop - 100) {
          current = section;
        }
      }
      if (current) setActiveSection(current);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white group-hover:bg-primary-500 transition-colors">
            <Wind size={24} />
          </div>
          <span className={cn("text-xl font-bold tracking-tight transition-colors", isScrolled ? "text-gray-900" : "text-white")}>
            YEWON SYSTEM
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.href.substring(1));
                const container = document.getElementById('main-scroll-container');
                if (element && container) {
                  container.scrollTo({
                    top: element.offsetTop,
                    behavior: 'smooth'
                  });
                }
              }}
              className={cn(
                'text-sm font-medium transition-all relative px-3 py-2 rounded-full group',
                isScrolled ? 'text-gray-600 hover:text-primary-600' : 'text-gray-200 hover:text-white',
                activeSection === item.href.substring(1) && (isScrolled ? 'text-primary-600' : 'text-white')
              )}
            >
              <span className="relative z-10">{item.name}</span>
              
              {/* Hover Background Pill */}
              <div className={cn(
                "absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 -z-0",
                isScrolled ? "bg-gray-100" : "bg-white/10"
              )} />

              {/* Active Underline */}
              {activeSection === item.href.substring(1) && (
                <motion.div
                  layoutId="activeNav"
                  className={cn("absolute -bottom-1 left-3 right-3 h-0.5", isScrolled ? "bg-primary-600" : "bg-white")}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={cn("md:hidden p-2", isScrolled ? "text-gray-900" : "text-white")}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <nav className="flex flex-col px-6 py-4 gap-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    const element = document.getElementById(item.href.substring(1));
                    const container = document.getElementById('main-scroll-container');
                    if (element && container) {
                      container.scrollTo({
                        top: element.offsetTop,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className={cn(
                    'text-base font-medium px-4 py-3 rounded-xl transition-colors',
                    activeSection === item.href.substring(1) 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  )}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
