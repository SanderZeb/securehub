"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

import {
  FaShieldAlt as Shield,
  FaCode as Code,
  FaNetworkWired as Network,
  FaUserSecret as UserSecret,
  FaClipboardCheck as ClipboardCheck,
  FaLock as Lock,
  FaBug as Bug,
  FaServer as Server,
  FaUsers as Users,
  FaAward as Award,
  FaHeadset as Headset,
  FaBars as Menu,
  FaTimes as X,
  FaChevronRight as ChevronRight,
  FaEnvelope as Mail,
  FaArrowRight as ArrowRight,
  FaPlay as Play,
  FaCheckCircle as CheckCircle,
  FaChevronDown as ChevronDown,
  FaSun as Sun,
  FaMoon as Moon,
} from "react-icons/fa";

// Enhanced global styles with light/dark mode support
const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Outfit:wght@100..900&family=Quicksand:wght@300..700&display=swap');

.font-heading {
  font-family: "Outfit", sans-serif;
}

.font-body {
  font-family: "Quicksand", sans-serif;
}

::-webkit-scrollbar {
  width: 6px;
}

/* Dark mode scrollbar */
.dark ::-webkit-scrollbar-track {
  background: #111111;
}

.dark ::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #555555, #333333);
  border-radius: 3px;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #666666, #444444);
}

/* Light mode scrollbar */
.light ::-webkit-scrollbar-track {
  background: #f8f9fa;
}

.light ::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #c0c0c0, #a0a0a0);
  border-radius: 3px;
}

.light ::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #999999, #808080);
}

/* Dark mode neuromorphic */
.dark .neuromorphic {
  background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
  box-shadow: 
    20px 20px 40px rgba(0, 0, 0, 0.9),
    -20px -20px 40px rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.dark .neuromorphic-inset {
  background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
  box-shadow: 
    inset 20px 20px 40px rgba(0, 0, 0, 0.9),
    inset -20px -20px 40px rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Light mode neuromorphic */
.light .neuromorphic {
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  box-shadow: 
    20px 20px 40px rgba(0, 0, 0, 0.1),
    -20px -20px 40px rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.light .neuromorphic-inset {
  background: linear-gradient(145deg, #f0f0f0, #ffffff);
  box-shadow: 
    inset 20px 20px 40px rgba(0, 0, 0, 0.1),
    inset -20px -20px 40px rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

/* Dark mode glass effect */
.dark .glass-effect {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

/* Light mode glass effect */
.light .glass-effect {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.15);
}

/* Hero section glass effect - always dark */
.hero-section .glass-effect {
  background: rgba(0, 0, 0, 0.4) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
}

/* Dark mode premium button */
.dark .premium-button {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #1e1e1e, #2a2a2a);
  border: 1px solid rgba(106, 64, 27, 0.4);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(106, 64, 27, 0.3);
}

/* Light mode premium button */
.light .premium-button {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  border: 1px solid rgba(106, 64, 27, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(106, 64, 27, 0.2);
}

/* Hero section premium button - always dark style */
.hero-section .premium-button {
  background: linear-gradient(135deg, #1e1e1e, #2a2a2a) !important;
  border: 1px solid rgba(106, 64, 27, 0.4) !important;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(106, 64, 27, 0.3) !important;
  color: white !important;
}

.premium-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.6s ease-out;
}

.premium-button:hover::before {
  left: 100%;
}

/* Hero section - same for both modes */
.hero-overlay {
  background: rgba(0, 0, 0, 0.4);
}

.hero-section {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%);
}

/* Dark mode backgrounds */
.dark .section-bg {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%);
}

/* Light mode backgrounds */
.light .section-bg {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f0f0f0 100%);
}

@media (prefers-reduced-motion: reduce) {
  .premium-button::before {
    transition: none;
  }
  
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

@media (max-width: 768px) {
  .dark .neuromorphic {
    box-shadow: 
      10px 10px 20px rgba(0, 0, 0, 0.9),
      -10px -10px 20px rgba(255, 255, 255, 0.08);
  }
  
  .dark .neuromorphic-inset {
    box-shadow: 
      inset 10px 10px 20px rgba(0, 0, 0, 0.9),
      inset -10px -10px 20px rgba(255, 255, 255, 0.08);
  }

  .light .neuromorphic {
    box-shadow: 
      10px 10px 20px rgba(0, 0, 0, 0.1),
      -10px -10px 20px rgba(255, 255, 255, 0.8);
  }
  
  .light .neuromorphic-inset {
    box-shadow: 
      inset 10px 10px 20px rgba(0, 0, 0, 0.1),
      inset -10px -10px 20px rgba(255, 255, 255, 0.8);
  }
}
`;

if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = globalStyles;
  document.head.appendChild(styleElement);
}

// Theme context
const ThemeContext = React.createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}>({
  theme: 'dark',
  toggleTheme: () => {}
});

// Static data - moved outside component to prevent recreation
const features = [
  {
    icon: Code,
    title: "Pentest Aplikacji",
    description: "Weryfikacja poziomu bezpieczeństwa aplikacji webowych i mobilnych zgodnie z OWASP Top 10.",
    details: ["Testy automatyczne i manualne", "Wykrywanie luk 0-day", "Fuzzing dostosowany do technologii"],
    color: "from-amber-600 to-yellow-700",
    customImage: "https://i.postimg.cc/028QSP2c/chmurowe.png"
  },
  {
    icon: Network,
    title: "Pentest Sieci i Chmury",
    description: "Ocena ryzyka, zgodności i dostępności usług w środowisku sieciowym i chmurowym.",
    details: ["Zgodność z ISO", "Usługa OSINT", "Skanowanie podatności"],
    color: "from-orange-600 to-amber-600",
    customImage: "https://i.postimg.cc/bvGdvgNP/webowe.png"
  },
  {
    icon: Bug,
    title: "Audyt Kodu Źródłowego",
    description: "Kompleksowa analiza kodu zgodnie z modelem DevSecOps - Security by design.",
    details: ["Analiza ręczna i automatyczna", "Audyt Blockchain", "Wykrywanie błędów bezpieczeństwa"],
    color: "from-yellow-600 to-orange-600",
    customImage: "https://i.ibb.co/ZRTChdZG/kod.png"
  },
  {
    icon: Server,
    title: "Utwardzanie Systemów",
    description: "Wdrażanie dodatkowych warstw ochrony zgodnie ze standardem OSSTMM.",
    details: ["Serwery i usługi sieciowe", "Urządzenia IoT", "Środowiska chmury"],
    color: "from-amber-700 to-yellow-600",
    customImage: "https://i.postimg.cc/Z5sCZ2mj/utwardzenie2-png.png"
  },
  {
    icon: UserSecret,
    title: "Inżynieria Społeczna",
    description: "Bezpieczna symulacja prawdziwych ataków hakerskich.",
    details: ["Symulacje phishingu", "Testy vishingu", "Włamania fizyczne"],
    color: "from-orange-700 to-amber-700",
    customImage: "https://i.ibb.co/0y6x0v1L/soc-1.png"
  },
  {
    icon: ClipboardCheck,
    title: "Audyt Zgodności",
    description: "Przegląd zgodności z regulacjami WCAG, ISO 27001, GDPR, DORA, NIS2.",
    details: ["Przepisy zewnętrzne", "Wytyczne wewnętrzne", "Kontrole i procedury"],
    color: "from-yellow-700 to-orange-700",
    customImage: "https://i.ibb.co/b5Hf5VYF/audyt.png"
  }
];

const companySizeOptions = [
  { value: "wole-nie-mowic", label: "Wolę nie mówić" },
  { value: "<50", label: "Mniej niż 50 pracowników" },
  { value: "51-200", label: "51 - 200 pracowników" },
  { value: "200+", label: "Powyżej 200 pracowników" },
];

const navigationItems = [
  { name: "O nas", target: "about" },
  { name: "Współpraca", target: "features" },
  { name: "Kontakt", target: "contact" }
];

const statsData = [
  { number: 25, suffix: "+", label: "Lat doświadczenia" },
  { number: 500, suffix: "+", label: "Zadowolonych klientów" },
  { number: 99, suffix: "%", label: "Skuteczność testów" },
  { number: 24, suffix: "/7", label: "Wsparcie techniczne" }
];

const aboutBlocks = [
  {
    title: "Rozwiązania skrojone na miarę",
    content: "Do każdego klienta podchodzimy indywidualnie rozpoznając rzeczywiste potrzeby a następnie budując indywidualny, dedykowany zespół doświadczonych ekspertów do ich wdrożenia.",
    icon: Users,
    reverse: false
  },
  {
    title: "Przeszło 25 lat doświadczenia",
    content: "Nasze zespoły opieramy wyłącznie na wyselekcjonowanych, sprawdzonych przez lata profesjonalistach objętych klauzulą ścisłej tajemnicy zawodowej. Stawiamy na najwyższe standardy jakości pracy i obsługi klienta!",
    icon: Award,
    reverse: true
  },
  {
    title: "Twój partner w biznesie",
    content: "Koordynacja, pytania, wybory, kontakt z działem IT, raportowanie… od dziś to nie Twoje zmartwienie! SecurHUB zapewnia dedykowanego opiekuna już od pierwszego dnia współpracy. Na każdym etapie pozostaje do dyspozycji by pomóc i odpowiedzieć na wszelkie pytania.",
    icon: Headset,
    reverse: false
  },
  {
    title: "Nam możesz zaufać",
    content: "Wiemy, jak ważna w dużym biznesie jest poufność informacji. Dlatego zespół SecurHUB zapewnia całkowitą ochronę tożsamości klienta na każdym etapie poprzedzającym ostateczne wdrożenie usługi a także minimalizuje dostęp do wrażliwych informacji na późniejszych jej etapach.",
    icon: Lock,
    reverse: true
  }
];

// Throttle function for scroll optimization
const throttle = <T extends unknown[]>(func: (...args: T) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  let lastExecTime = 0;
  return function (...args: T) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

// Theme Toggle Component
const ThemeToggle = React.memo(() => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  
  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      className={`p-2 rounded-lg transition-all duration-300 ${
        theme === 'dark' 
          ? 'text-yellow-400 hover:text-yellow-300 hover:bg-white/10' 
          : 'text-orange-600 hover:text-orange-700 hover:bg-black/10'
      }`}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.div>
    </motion.button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';

// Memoized Toast Component
interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast = React.memo<ToastProps>(({ message, onClose }) => {
  const { theme } = React.useContext(ThemeContext);
  
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className={`fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-2xl z-50 border max-w-sm ${
        theme === 'dark'
          ? 'bg-gray-900 text-white border-gray-600'
          : 'bg-white text-gray-900 border-gray-300'
      }`}
    >
      <div className="flex items-center">
        <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
        <p className={`font-body text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
          {message}
        </p>
      </div>
    </motion.div>
  );
});

Toast.displayName = 'Toast';

// Memoized AnimatedCounter with better performance
const AnimatedCounter = React.memo<{ target: number; duration?: number }>(({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(countRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 2);
      setCount(Math.floor(easeOut * target));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return <span ref={countRef}>{count}</span>;
});

AnimatedCounter.displayName = 'AnimatedCounter';

// Memoized PremiumButton Component
interface PremiumButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

const PremiumButton = React.memo<PremiumButtonProps>(({ 
  children, 
  onClick, 
  variant = "primary",
  size = "md",
  className = "",
  disabled = false 
}) => {
  const { theme } = React.useContext(ThemeContext);
  
  const baseClasses = "premium-button relative font-semibold transition-all duration-300 flex items-center justify-center font-body";
  
  const variantClasses = useMemo(() => ({
    primary: theme === 'dark' 
      ? "text-white hover:shadow-amber-500/30" 
      : "text-gray-800 hover:shadow-amber-500/30",
    secondary: theme === 'dark' 
      ? "text-gray-100 hover:text-white" 
      : "text-gray-700 hover:text-gray-900",
    ghost: theme === 'dark' 
      ? "text-gray-200 hover:text-white hover:bg-white/5" 
      : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
  }), [theme]);

  const sizeClasses = useMemo(() => ({
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl"
  }), []);

  const buttonClassName = useMemo(() => 
    `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    }`, [baseClasses, variantClasses, variant, sizeClasses, size, className, disabled]
  );

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      className={buttonClassName}
    >
      <span className="relative z-10 flex items-center">
        {children}
      </span>
    </motion.button>
  );
});

PremiumButton.displayName = 'PremiumButton';

// Memoized CustomDropdown Component
interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}

const CustomDropdown = React.memo<CustomDropdownProps>(({ 
  value, 
  onChange, 
  options, 
  placeholder 
}) => {
  const { theme } = React.useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedOption = useMemo(() => 
    options.find(option => option.value === value), 
    [options, value]
  );

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleOptionSelect = useCallback((optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  }, [onChange]);

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={handleToggle}
        className={`neuromorphic-inset w-full px-4 py-3 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200 font-body text-sm sm:text-base flex items-center justify-between ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
        }`}
        whileTap={{ scale: 0.98 }}
      >
        <span className={selectedOption ? (theme === 'dark' ? "text-gray-100" : "text-gray-800") : (theme === 'dark' ? "text-gray-300" : "text-gray-500")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 neuromorphic rounded-lg z-50 overflow-hidden"
          >
            {options.map((option) => (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => handleOptionSelect(option.value)}
                className={`w-full px-4 py-3 text-left transition-colors duration-200 font-body text-sm sm:text-base border-b last:border-b-0 ${
                  theme === 'dark' 
                    ? 'text-gray-100 hover:bg-white/8 border-gray-600' 
                    : 'text-gray-800 hover:bg-black/8 border-gray-300'
                }`}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.1 }}
              >
                {option.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

CustomDropdown.displayName = 'CustomDropdown';

// Memoized NavigationBar Component
const NavigationBar = React.memo<{ 
  isScrolled: boolean; 
  mobileNavActive: boolean; 
  setMobileNavActive: (active: boolean) => void; 
  scrollToSection: (sectionId: string) => void; 
}>(({ isScrolled, mobileNavActive, setMobileNavActive, scrollToSection }) => {
  const { theme } = React.useContext(ThemeContext);
  
  const handleToggleMobileNav = useCallback(() => {
    setMobileNavActive(!mobileNavActive);
  }, [mobileNavActive, setMobileNavActive]);

  const handleContactClick = useCallback(() => {
    scrollToSection("contact");
  }, [scrollToSection]);

  const handleLogoClick = useCallback(() => {
    scrollToSection("hero");
  }, [scrollToSection]);

  const handleMobileContactClick = useCallback(() => {
    scrollToSection("contact");
    setMobileNavActive(false);
  }, [scrollToSection, setMobileNavActive]);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div 
              className="flex-shrink-0 flex items-center group cursor-pointer" 
              onClick={handleLogoClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <span className="flex-shrink-0">
                  <Image 
                    src="https://i.ibb.co/cXXYY8mg/logo2.png" 
                    alt="Secur" 
                    width={96}
                    height={96}
                    className="object-contain filter drop-shadow-lg"
                  />
                </span>
              </div>
            </motion.div>
            <div className="hidden md:ml-12 md:flex md:space-x-1">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.target)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative group font-body ${
                    theme === 'dark' 
                      ? 'text-gray-200 hover:text-white hover:bg-white/8' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-black/8'
                  }`}
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                  <motion.div 
                    className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-amber-400 group-hover:w-3/4 transition-all duration-300"
                    style={{ x: "-50%" }}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="hidden md:flex">
              <PremiumButton
                onClick={handleContactClick}
                variant="primary"
                size="sm"
              >
                Skontaktuj się
                <ArrowRight className="w-4 h-4 ml-2" />
              </PremiumButton>
            </div>
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleMobileNav}
                className={`p-2 transition-colors duration-200 ${
                  theme === 'dark' 
                    ? 'text-gray-200 hover:text-white' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {mobileNavActive ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileNavActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden glass-effect border-t mx-4 rounded-b-xl mt-2 ${
              theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
            }`}
          >
            <div className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.target)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 font-body ${
                    theme === 'dark' 
                      ? 'text-gray-200 hover:text-white hover:bg-white/8' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-black/8'
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}
              <div className="pt-2">
                <PremiumButton
                  onClick={handleMobileContactClick}
                  variant="primary"
                  size="sm"
                  className="w-full"
                >
                  Skontaktuj się
                </PremiumButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
});

NavigationBar.displayName = 'NavigationBar';

// Memoized HeroSection Component
const HeroSection = React.memo<{ scrollToSection: (sectionId: string) => void }>(({ scrollToSection }) => {
  const handleContactClick = useCallback(() => {
    scrollToSection("contact");
  }, [scrollToSection]);

  const handleFeaturesClick = useCallback(() => {
    scrollToSection("features");
  }, [scrollToSection]);

  // Parallax effect for logo
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // Transform values for parallax layers
  const xTransform = useTransform(x, [-0.5, 0.5], [-12, 12]);
  const yTransform = useTransform(y, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section id="hero" className="min-h-screen hero-section text-white overflow-hidden relative select-none">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat select-none"
        style={{
          backgroundImage: `url('https://i.ibb.co/nMxDZ9M3/Whats-App-Image-2025-06-20-at-13-38-36-2.jpg')`
        }}
      />
      
      <div className="hero-overlay absolute inset-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 flex items-center min-h-screen">
        <div className="text-center w-full">
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col lg:flex-row items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex-shrink-0 relative"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ perspective: "1000px" }}
              >
                {/* Background glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-3xl"
                  style={{
                    x: useTransform(x, [-0.5, 0.5], [-8, 8]),
                    y: useTransform(y, [-0.5, 0.5], [-6, 6]),
                    scale: useTransform(x, [-0.5, 0, 0.5], [1.1, 1.2, 1.1])
                  }}
                />
                
                {/* Main logo with parallax */}
                <motion.div
                  className="relative z-10"
                  style={{
                    x: xTransform,
                    y: yTransform,
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <Image 
                    src="https://i.ibb.co/j9T7prmF/logo.png" 
                    alt="SecurHUB Logo" 
                    width={512}
                    height={512}
                    className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] object-contain filter drop-shadow-2xl transition-all duration-300"
                  />
                </motion.div>

                {/* Interactive border effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-amber-400/20"
                  style={{
                    x: useTransform(x, [-0.5, 0.5], [4, -4]),
                    y: useTransform(y, [-0.5, 0.5], [3, -3]),
                    scale: useTransform(x, [-0.5, 0, 0.5], [1.02, 1.05, 1.02]),
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-100 max-w-4xl mx-auto font-body leading-relaxed px-4"
          >
            Platforma dedykowana dla dużych przedsiębiorstw, zrzeszająca{" "}
            <span className="text-amber-300 font-semibold">wyselekcjonowanych dostawców</span>{" "}
            usług cybersecurity z{" "}
            <span className="text-yellow-300 font-semibold">ponad 25-letnim doświadczeniem</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
          >
            <PremiumButton
              onClick={handleContactClick}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto min-w-[250px]"
            >
              Sprawdź jak możemy pomóc
              <ChevronRight className="w-5 h-5 ml-2" />
            </PremiumButton>
            
            <motion.button
              onClick={handleFeaturesClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center text-gray-200 hover:text-white transition-colors duration-200 font-body group"
            >
              <div className="w-12 h-12 glass-effect rounded-full flex items-center justify-center mr-3 group-hover:bg-white/15 transition-all duration-200">
                <Play className="w-5 h-5 ml-1" />
              </div>
              <span className="hidden sm:block">Zobacz więcej</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 px-4"
          >
            {statsData.map((stat, index) => (
              <motion.div
                key={`${stat.label}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-heading mb-2">
                  <AnimatedCounter target={stat.number} />
                  {stat.suffix}
                </div>
                <div className="text-sm text-gray-200 font-body">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="w-1 h-3 bg-gray-300 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

// Memoized AboutSection Component
const AboutSection = React.memo(() => {
  const { theme } = React.useContext(ThemeContext);
  
  return (
    <section id="about" className="py-16 sm:py-24 section-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-heading ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Dlaczego SecurHUB?
          </h2>
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto font-body ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-600'
          }`}>
            Dobrze trafiłeś! Poznaj nasze unikalne podejście do cybersecurity
          </p>
        </motion.div>

        <div className="space-y-16 sm:space-y-24">
          {aboutBlocks.map((block, index) => {
            const Icon = block.icon;
            return (
              <motion.div
                key={`${block.title}-${index}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
                  block.reverse ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 w-full">
                  <motion.div 
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.3 }}
                    className="neuromorphic p-6 sm:p-8 rounded-2xl hover:shadow-amber-500/15 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
                      <div className="neuromorphic-inset w-16 h-16 rounded-xl flex items-center justify-center mr-0 sm:mr-4 mb-4 sm:mb-0">
                        <Icon className="w-8 h-8 text-amber-400" />
                      </div>
                      <h3 className={`text-xl sm:text-2xl font-bold font-heading ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {block.title}
                      </h3>
                    </div>
                    <p className={`leading-relaxed font-body text-base sm:text-lg ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      {block.content}
                    </p>
                  </motion.div>
                </div>
                <div className="flex-1 w-full lg:max-w-md">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <div className="neuromorphic-inset w-full h-48 sm:h-64 rounded-2xl flex items-center justify-center group overflow-hidden">
                      <Icon className="w-16 sm:w-24 h-16 sm:h-24 text-amber-400/40 group-hover:text-amber-400/60 transition-colors duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

// Memoized FeatureCard Component
const FeatureCard = React.memo<{
  feature: typeof features[0];
  index: number;
}>(({ feature, index }) => {
  const { theme } = React.useContext(ThemeContext);
  const Icon = feature.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="neuromorphic-inset p-8 sm:p-10 rounded-3xl group hover:shadow-amber-500/20 transition-all duration-500 relative overflow-hidden min-h-[400px] flex flex-col"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-40 h-40 rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:shadow-amber-500/30 transition-all duration-500 neuromorphic">
          {feature.customImage ? (
            <Image 
              src={feature.customImage} 
              alt={feature.title}
              width={128}
              height={128}
              className="object-contain group-hover:scale-105 transition-transform duration-500 filter drop-shadow-lg"
            />
          ) : (
            <Icon className="w-20 h-20 text-amber-400 group-hover:scale-105 group-hover:text-amber-300 transition-all duration-500" />
          )}
        </div>
        <div className="flex-1 flex flex-col">
          <h3 className={`text-xl sm:text-2xl font-bold mb-6 font-heading text-center group-hover:text-amber-50 transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {feature.title}
          </h3>
          <p className={`mb-8 font-body leading-relaxed text-base sm:text-lg text-center transition-colors duration-300 flex-1 ${
            theme === 'dark' 
              ? 'text-gray-200 group-hover:text-gray-100' 
              : 'text-gray-700 group-hover:text-gray-600'
          }`}>
            {feature.description}
          </p>
          <ul className="space-y-4 mt-auto">
            {feature.details.map((detail, detailIndex) => (
              <li 
                key={`${detail}-${detailIndex}`}
                className={`flex items-center text-sm sm:text-base font-body transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'text-gray-300 group-hover:text-gray-200' 
                    : 'text-gray-600 group-hover:text-gray-700'
                }`}
              >
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-4 flex-shrink-0 group-hover:bg-amber-300 transition-colors duration-300" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
});

FeatureCard.displayName = 'FeatureCard';

// Memoized FeaturesSection Component
const FeaturesSection = React.memo(() => {
  const { theme } = React.useContext(ThemeContext);
  
  return (
    <section id="features" className="py-16 sm:py-24 section-bg relative overflow-hidden">
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] ${
          theme === 'light' ? 'opacity-30' : ''
        }`} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-heading ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Współpraca
          </h2>
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto font-body ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-600'
          }`}>
            Kompleksowe rozwiązania cybersecurity dla nowoczesnych przedsiębiorstw
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

FeaturesSection.displayName = 'FeaturesSection';

// Memoized ContactSection Component
const ContactSection = React.memo<{ showToast: (message: string) => void }>(({ showToast }) => {
  const { theme } = React.useContext(ThemeContext);
  const [formData, setFormData] = useState({
    email: "",
    organization: "",
    companySize: "wole-nie-mowic",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!formData.message.trim()) {
      showToast("Proszę wypełnić pole wiadomości.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    showToast("Wiadomość została wysłana! Skontaktujemy się wkrótce.");
    setFormData({ email: "", organization: "", companySize: "wole-nie-mowic", message: "" });
    setIsSubmitting(false);
  }, [formData.message, showToast]);

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  return (
    <section id="contact" className="py-16 sm:py-24 section-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-heading ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Sprawdźmy, jak możemy Ci pomóc!
          </h2>
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto font-body ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-600'
          }`}>
            To nic nie kosztuje – pozostaw wiadomość, a skontaktuje się z Tobą nasz dedykowany doradca
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="neuromorphic p-6 sm:p-8 rounded-2xl"
          >
            <h3 className={`text-xl sm:text-2xl font-bold mb-6 font-heading flex items-center ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <Mail className="w-6 h-6 text-amber-400 mr-3" />
              Wyślij nam wiadomość
            </h3>
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 font-body ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Adres e-mail (opcjonalnie)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`neuromorphic-inset w-full px-4 py-3 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200 font-body text-sm sm:text-base ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                  }`}
                  placeholder="twoj@email.com"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 font-body ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Organizacja (opcjonalnie)
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  className={`neuromorphic-inset w-full px-4 py-3 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200 font-body text-sm sm:text-base ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                  }`}
                  placeholder="Nazwa firmy"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 font-body ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Wielkość firmy (opcjonalnie)
                </label>
                <CustomDropdown
                  value={formData.companySize}
                  onChange={(value) => handleInputChange('companySize', value)}
                  options={companySizeOptions}
                  placeholder="Wybierz wielkość firmy"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 font-body ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Jak możemy pomóc? *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  className={`neuromorphic-inset w-full px-4 py-3 bg-transparent rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200 font-body text-sm sm:text-base ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                  }`}
                  placeholder="Opisz swoje potrzeby lub wyzwania..."
                />
              </div>
              <PremiumButton
                onClick={handleSubmit}
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className={`w-5 h-5 border-2 rounded-full mr-2 ${
                        theme === 'dark' 
                          ? 'border-white/30 border-t-white' 
                          : 'border-gray-400/30 border-t-gray-800'
                      }`}
                    />
                    Wysyłanie...
                  </>
                ) : (
                  <>
                    Wyślij wiadomość
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </PremiumButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <motion.div 
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
              className="neuromorphic p-6 rounded-xl hover:shadow-amber-500/15 transition-all duration-300"
            >
              <h4 className={`text-lg font-semibold mb-4 font-heading ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Dlaczego warto z nami współpracować?
              </h4>
              <ul className={`space-y-3 font-body ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {[
                  { icon: Shield, text: "Ponad 25 lat doświadczenia w branży" },
                  { icon: Users, text: "Dedykowany opiekun od pierwszego dnia" },
                  { icon: Lock, text: "Pełna ochrona poufności informacji" },
                  { icon: Award, text: "Najwyższe standardy jakości" }
                ].map((item, index) => (
                  <li 
                    key={`contact-benefit-${index}`}
                    className="flex items-center text-sm sm:text-base"
                  >
                    <item.icon className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
              className="neuromorphic p-6 rounded-xl hover:shadow-purple-500/15 transition-all duration-300"
            >
              <h4 className={`text-lg font-semibold mb-4 font-heading ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Informacja o anonimowości
              </h4>
              <p className={`font-body text-sm sm:text-base leading-relaxed ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Jeżeli na tym etapie pragniesz pozostać anonimowy, wystarczy podać dowolny adres e-mail lub telefon do kontaktu, a pozostałe pola pozostawić puste – nasz doradca zajmie się resztą.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
              className="neuromorphic p-6 rounded-xl hover:shadow-amber-500/15 transition-all duration-300"
            >
              <h4 className={`text-lg font-semibold mb-4 font-heading ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Bezpłatna konsultacja
              </h4>
              <p className={`font-body text-sm sm:text-base leading-relaxed mb-4 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Pierwsza konsultacja jest całkowicie bezpłatna. Nasz ekspert pomoże zidentyfikować obszary wymagające wzmocnienia bezpieczeństwa.
              </p>
              <div className="flex items-center text-green-400">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span className="text-sm font-body">100% bez zobowiązań</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';

// Memoized Footer Component
const Footer = React.memo(() => {
  const { theme } = React.useContext(ThemeContext);
  
  const servicesList = useMemo(() => [
    "Pentesting aplikacji",
    "Audyty bezpieczeństwa", 
    "Inżynieria społeczna",
    "Audyty zgodności"
  ], []);

  const companyList = useMemo(() => [
    "O nas",
    "Nasz zespół",
    "Kariera",
    "Blog"
  ], []);

  const legalList = useMemo(() => [
    "Polityka prywatności",
    "Regulamin", 
    "Cookies"
  ], []);

  return (
    <footer className={`border-t ${
      theme === 'dark' 
        ? 'bg-black border-gray-700' 
        : 'bg-gray-50 border-gray-300'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-3">
                  <Image 
                    src="https://i.ibb.co/cXXYY8mg/logo2.png" 
                    alt="Secur" 
                    width={96}
                    height={96}
                    className="object-contain filter drop-shadow-lg"
                  />
                </div>
              </div>
              <p className={`font-body text-sm sm:text-base mb-4 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Innowacyjna platforma cybersecurity dla dużych przedsiębiorstw i korporacji.
              </p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className={`text-lg font-semibold mb-4 font-heading ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Współpraca
            </h4>
            <ul className={`space-y-2 font-body text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {servicesList.map((service, index) => (
                <li key={`service-${index}`} className="hover:text-amber-400 transition-colors duration-200 cursor-pointer">
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className={`text-lg font-semibold mb-4 font-heading ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Firma
            </h4>
            <ul className={`space-y-2 font-body text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {companyList.map((item, index) => (
                <li key={`company-${index}`} className="hover:text-amber-400 transition-colors duration-200 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className={`text-lg font-semibold mb-4 font-heading ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Kontakt
            </h4>
            <div className={`space-y-2 font-body text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <p>Dedykowany doradca dostępny</p>
              <p>Pełna poufność informacji</p>
              <p>Indywidualne podejście</p>
              <p className="text-amber-400 hover:text-amber-300 transition-colors duration-200 cursor-pointer">
                hello@securhub.pl
              </p>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`border-t pt-8 ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className={`text-sm font-body text-center md:text-left ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              © 2025 SecurHUB. Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              {legalList.map((item, index) => (
                <a 
                  key={`legal-${index}`}
                  href="#" 
                  className={`transition-colors duration-200 font-body ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:text-amber-400' 
                      : 'text-gray-600 hover:text-amber-500'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

// Main component with theme support
export default function SecurHubLanding() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  // Throttled scroll handler to prevent excessive re-renders
  const throttledScrollHandler = useMemo(
    () => throttle((latest: number) => {
      setIsScrolled(latest > 50);
    }, 100),
    []
  );

  useEffect(() => {
    const unsubscribe = scrollY.onChange(throttledScrollHandler);
    return () => unsubscribe();
  }, [scrollY, throttledScrollHandler]);

  // Apply theme class to document
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileNavActive(false);
    }
  }, []);

  const handleCloseToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`min-h-screen font-body overflow-x-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-black' : 'bg-gray-50'
      }`}>
        <NavigationBar 
          isScrolled={isScrolled}
          mobileNavActive={mobileNavActive}
          setMobileNavActive={setMobileNavActive}
          scrollToSection={scrollToSection}
        />
        <main>
          <HeroSection scrollToSection={scrollToSection} />
          <AboutSection />
          <FeaturesSection />
          <ContactSection showToast={showToast} />
        </main>
        <Footer />
        <AnimatePresence>
          {toastMessage && (
            <Toast message={toastMessage} onClose={handleCloseToast} />
          )}
        </AnimatePresence>
      </div>
    </ThemeContext.Provider>
  );
}