"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useInView, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
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
  FaCertificate as Certificate,
  FaGavel as Legal,
  FaEye as SOC,
  FaGlobe as Globe,
} from "react-icons/fa";

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

.light .neuromorphic {
  background: linear-gradient(145deg, #ffffff, #f0f4f8);
  box-shadow: 
    20px 20px 40px rgba(0, 0, 0, 0.15),
    -20px -20px 40px rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.light .neuromorphic-inset {
  background: linear-gradient(145deg, #f0f4f8, #ffffff);
  box-shadow: 
    inset 20px 20px 40px rgba(0, 0, 0, 0.15),
    inset -20px -20px 40px rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.dark .glass-effect {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.light .glass-effect {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.hero-section .glass-effect {
  background: rgba(0, 0, 0, 0.4) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
}

.hero-navbar {
  color: rgba(255, 255, 255, 0.9) !important;
}

.hero-navbar:hover {
  color: rgba(255, 255, 255, 1) !important;
}

.dark .premium-button {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #1e1e1e, #2a2a2a);
  border: 1px solid rgba(106, 64, 27, 0.4);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(106, 64, 27, 0.3);
}

.light .premium-button {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  border: 1px solid rgba(59, 130, 246, 0.4);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(59, 130, 246, 0.3);
}

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

.hero-overlay {
  background: rgba(0, 0, 0, 0.4);
}

.hero-section {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%);
}

.dark .section-bg {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%);
}

.light .section-bg {
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%);
}

.image-placeholder {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.dark .image-placeholder {
  background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
  background-size: 200% 100%;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .premium-button::before {
    transition: none;
  }
  
  .image-placeholder {
    animation: none;
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
      10px 10px 20px rgba(0, 0, 0, 0.15),
      -10px -10px 20px rgba(255, 255, 255, 0.9);
  }
  
  .light .neuromorphic-inset {
    box-shadow: 
      inset 10px 10px 20px rgba(0, 0, 0, 0.15),
      inset -10px -10px 20px rgba(255, 255, 255, 0.9);
  }
}

.dragging {
  cursor: grabbing !important;
  user-select: none;
}

.grab-cursor {
  cursor: grab;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
`;

if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = globalStyles;
  document.head.appendChild(styleElement);
}

const MouseContext = React.createContext<{
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}>({
  mouseX: {} as MotionValue<number>,
  mouseY: {} as MotionValue<number>
});

const MouseProvider = React.memo<{ children: React.ReactNode }>(({ children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateMousePosition = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };
      
      window.addEventListener('mousemove', updateMousePosition);
      return () => window.removeEventListener('mousemove', updateMousePosition);
    }
  }, [mouseX, mouseY]);

  return (
    <MouseContext.Provider value={{ mouseX, mouseY }}>
      {children}
    </MouseContext.Provider>
  );
});

MouseProvider.displayName = 'MouseProvider';

const MouseParallax = React.memo<{ 
  children: React.ReactNode; 
  strength?: number;
  className?: string;
}>(({ children, strength = 0.05, className = "" }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    x.set(mouseX * strength);
    y.set(mouseY * strength);
  }, [strength, x, y]);

  const handleMouseEnter = useCallback(() => {
    // Mouse enter logic can be added here if needed
  }, []);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div 
      ref={elementRef}
      style={{ x, y }} 
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
});

MouseParallax.displayName = 'MouseParallax';

const ThemeContext = React.createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}>({
  theme: 'dark',
  toggleTheme: () => {}
});

const LanguageContext = React.createContext<{
  language: 'pl' | 'en';
  toggleLanguage: () => void;
}>({
  language: 'pl',
  toggleLanguage: () => {}
});

const translations = {
  pl: {
    nav: {
      about: "O nas",
      stats: "Statystyki", 
      features: "Współpraca",
      contact: "Kontakt"
    },

    hero: {
      desc1: "Platforma dedykowana dla dużych przedsiębiorstw, zrzeszająca",
      desc2: "wyselekcjonowanych dostawców",
      desc3: "usług cybersecurity z",
      desc4: "ponad 25-letnim doświadczeniem",
      description: "SecurHUB to innowacyjna platforma skierowana do średnich i dużych przedsiebiorstw. Zrzeszamy wyłącznie certyfikowanych specjalistów oraz wyselekcjonowanych dostawców z wieloletnim doświadczeniem. Gwarantujemy tym samym najwyższą jakość i bezpieczeństwo wykonywanych usług!",
      startCooperation: "Rozpocznij współpracę",
      seeOffer: "Zobacz ofertę",
      yearsExperience: "Lat doświadczenia",
      satisfiedClients: "Zadowolonych klientów", 
      testEfficiency: "Skuteczność testów",
      techSupport: "Wsparcie techniczne"
    },
    about: {
      title: "Dlaczego SecurHUB?",
      subtitle: "Dobrze trafiłeś! Poznaj nasze unikalne podejście do cybersecurity",
      solutions: {
        title: "Rozwiązania skrojone na miarę",
        content: "Do każdego klienta podchodzimy indywidualnie rozpoznając rzeczywiste potrzeby a następnie budując indywidualny, dedykowany zespół doświadczonych ekspertów do ich wdrożenia."
      },
      experience: {
        title: "Przeszło 25 lat doświadczenia", 
        content: "Nasze zespoły opieramy wyłącznie na wyselekcjonowanych, sprawdzonych przez lata profesjonalistach objętych klauzulą ścisłej tajemnicy zawodowej. Stawiamy na najwyższe standardy jakości pracy i obsługi klienta!"
      },
      partner: {
        title: "Twój partner w biznesie",
        content: "Koordynacja, pytania, wybory, kontakt z działem IT, raportowanie… od dziś to nie Twoje zmartwienie! SecurHUB zapewnia dedykowanego opiekuna już od pierwszego dnia współpracy. Na każdym etapie pozostaje do dyspozycji by pomóc i odpowiedzieć na wszelkie pytania."
      },
      trust: {
        title: "Nam możesz zaufać",
        content: "Wiemy, jak ważna w dużym biznesie jest poufność informacji. Dlatego zespół SecurHUB zapewnia całkowitą ochronę tożsamości klienta na każdym etapie poprzedzającym ostateczne wdrożenie usługi a także minimalizuje dostęp do wrażliwych informacji na późniejszych jej etapach."
      }
    },
    stats: {
      title: "Cyberbezpieczeństwo w liczbach",
      subtitle: "W erze globalnych napięć i cyfrowej transformacji, bezpieczeństwo informacji stało się jednym z filarów odporności państw i przedsiębiorstw. Przestępczość gospodarcza, niegdyś lokalna, dziś działa ponad granicami – cicho, skutecznie, bez ostrzeżenia. Codziennie powstają nowe wektory ataku, a skala zagrożeń rośnie wykładniczo. Wielu incydentów nie widać w nagłówkach – firmy często nie informują, że zapłaciły okup lub doświadczyły utraty danych. Milczenie nie oznacza braku problemu – przeciwnie, stanowi dziś część krajobrazu ryzyka.",
      incidents: "Incydentów cyber w 2024",
      incidentsDesc: "Globalna liczba ataków cybernetycznych",
      growth: "Wzrost ataków RdR", 
      growthDesc: "Wzrost w porównaniu do 2023 roku",
      cost: "Średni koszt naruszenia",
      costDesc: "Koszt jednego incydentu bezpieczeństwa",
      detection: "Czas wykrycia ataku",
      detectionDesc: "Średni czas identyfikacji naruszenia"
    },
    features: {
      title: "Działamy kompleksowo",
      subtitle: "Najnowocześniejsze rozwiązania - bądź o krok naprzód!",
      seeDetails: "Zobacz szczegóły",
      close: "Zamknij",
      serviceDescription: "Opis usługi",
      keyElements: "Kluczowe elementy"
    },
    contact: {
      title: "Sprawdźmy, jak możemy Ci pomóc!",
      subtitle: "Pozostaw wiadomość, a skontaktuje się z Tobą nasz dedykowany doradca. Nasz ekspert pomoże zidentyfikować obszary wymagające wzmocnienia bezpieczeństwa.",
      sendMessage: "Wyślij nam wiadomość",
      email: "Adres e-mail",
      organization: "NIP firmy lub nazwa (opcjonalnie)",
      phone: "Telefon kontaktowy (opcjonalnie)",
      companySize: "Wielkość firmy (opcjonalnie)",
      message: "Wiadomość do Opiekuna Klienta",
      messagePlaceholder: "Podpowiemy, doradzimy...",
      sending: "Wysyłanie...",
      fillRequired: "Wypełnij wymagane pola",
      sendMessageBtn: "Wyślij wiadomość",
      writeToUs: "Napisz do nas",
      emailValid: "Adres e-mail wygląda poprawnie",
      messageValid: "Wiadomość wygląda dobrze!",
      emailRequired: "Nieprawidłowy format adresu e-mail",
      messageRequired: "Wiadomość jest wymagana",
      messageMin: "Wiadomość musi zawierać co najmniej 10 znaków",
      messageMax: "Wiadomość nie może przekraczać 10000 znaków",
      messageSent: "Wiadomość została wysłana! Skontaktujemy się wkrótce.",
      formError: "Proszę poprawić błędy w formularzu."
    },
    footer: {
      copyright: "© 2025 SecurHUB. Wszystkie prawa zastrzeżone.",
      cookies: "Cookies"
    }
  },
  en: {
    nav: {
      about: "About Us",
      stats: "Statistics",
      features: "Cooperation", 
      contact: "Contact"
    },
    hero: {
      description: "SecurHUB is an innovative platform aimed at medium and large enterprises. We only associate certified specialists and selected suppliers with years of experience. This guarantees the highest quality and security of the services performed!",
      startCooperation: "Start cooperation",
      seeOffer: "See offer",
      yearsExperience: "Years of experience",
      satisfiedClients: "Satisfied clients",
      testEfficiency: "Test efficiency", 
      techSupport: "Technical support"
    },
    about: {
      title: "Why SecurHUB?",
      subtitle: "You've come to the right place! Discover our unique approach to cybersecurity",
      solutions: {
        title: "Tailored solutions",
        content: "We approach each client individually, recognizing real needs and then building an individual, dedicated team of experienced experts to implement them."
      },
      experience: {
        title: "Over 25 years of experience",
        content: "We base our teams exclusively on carefully selected professionals proven over the years, covered by strict professional confidentiality clauses. We focus on the highest standards of work quality and customer service!"
      },
      partner: {
        title: "Your business partner", 
        content: "Coordination, questions, choices, contact with IT department, reporting... from now on, this is not your worry! SecurHUB provides a dedicated guardian from the first day of cooperation. At every stage, they remain available to help and answer any questions."
      },
      trust: {
        title: "You can trust us",
        content: "We know how important confidentiality of information is in big business. Therefore, the SecurHUB team ensures complete protection of client identity at every stage preceding the final implementation of the service and also minimizes access to sensitive information at its later stages."
      }
    },
    stats: {
      title: "Cybersecurity in numbers",
      subtitle: "In the era of global tensions and digital transformation, information security has become one of the pillars of resilience for states and enterprises. Economic crime, once local, now operates across borders – quietly, effectively, without warning. New attack vectors emerge daily, and the scale of threats is growing exponentially. Many incidents are not visible in headlines – companies often do not report that they paid ransom or experienced data loss. Silence does not mean lack of problems – on the contrary, it is now part of the risk landscape.",
      incidents: "Cyber incidents in 2024",
      incidentsDesc: "Global number of cyber attacks",
      growth: "RdR attacks growth",
      growthDesc: "Growth compared to 2023",
      cost: "Average breach cost", 
      costDesc: "Cost of one security incident",
      detection: "Attack detection time",
      detectionDesc: "Average time to identify breach"
    },
    features: {
      title: "We operate comprehensively",
      subtitle: "State-of-the-art solutions - stay one step ahead!",
      seeDetails: "See details",
      close: "Close",
      serviceDescription: "Service description",
      keyElements: "Key elements"
    },
    contact: {
      title: "Let's see how we can help you!",
      subtitle: "Leave a message and our dedicated advisor will contact you. Our expert will help identify areas requiring security enhancement.",
      sendMessage: "Send us a message",
      email: "Email address",
      organization: "Company VAT number or name (optional)",
      phone: "Contact phone (optional)",
      companySize: "Company size (optional)",
      message: "Message to Client Guardian",
      messagePlaceholder: "We'll suggest, advise...",
      sending: "Sending...",
      fillRequired: "Fill required fields",
      sendMessageBtn: "Send message", 
      writeToUs: "Contact us",
      emailValid: "Email address looks correct",
      messageValid: "Message looks good!",
      emailRequired: "Invalid email format",
      messageRequired: "Message is required",
      messageMin: "Message must contain at least 10 characters",
      messageMax: "Message cannot exceed 10000 characters",
      messageSent: "Message sent! We'll contact you soon.",
      formError: "Please correct errors in the form."
    },
    footer: {
      copyright: "© 2025 SecurHUB. All rights reserved.",
      cookies: "Cookies"
    }
  }
};

const features = [
  {
    icon: Code,
    title: "Pentest Aplikacji Webowych i Mobilnych",
    titleEn: "Web and Mobile Application Pentesting",
    description: "Weryfikacja poziomu bezpieczeństwa aplikacji webowych i mobilnych.",
    descriptionEn: "Verification of security level of web and mobile applications.",
    bulletPoints: [
      "Testy zgodne ze standardami OWASP Top 10 i ASVS",
      "Testy automatyczne i manualne",
      "Wykrywanie luk 0-day poprzez fuzzing",
      "Testowanie interfejsów i API"
    ],
    bulletPointsEn: [
      "Tests compliant with OWASP Top 10 and ASVS standards",
      "Automatic and manual tests",
      "0-day vulnerability detection through fuzzing",
      "Interface and API testing"
    ],
    color: "from-amber-600 to-yellow-700",
    fullDescription: "Weryfikacja poziomu bezpieczeństwa aplikacji webowych i mobilnych. Testy są wykonywane zgodnie ze standardami Best Practices, OWASP Top 10 i OWASP ASVS. Testy automatyczne są przeprowadzane przy użyciu komercyjnych i open-source'owych skanerów oraz własnych skryptów. Testy manualne pomagają wykryć i potwierdzić występowanie określonych luk. Wiąże się to również z wykrywaniem nowych, nieznanych luk 0-day (poprzez fuzzing). Fuzzing będzie dostosowany do technologii wykorzystywanych przez aplikację. Testy obejmują również aspekt dostępnych interfejsów i API.",
    fullDescriptionEn: "Verification of security level of web and mobile applications. Tests are performed according to Best Practices, OWASP Top 10 and OWASP ASVS standards. Automatic tests are conducted using commercial and open-source scanners as well as custom scripts. Manual tests help detect and confirm the presence of specific vulnerabilities. This also involves detecting new, unknown 0-day vulnerabilities (through fuzzing). Fuzzing will be adapted to the technologies used by the application. Tests also cover available interfaces and APIs.",
    customImage: '/images/web.png'
  },
  {
    icon: Network,
    title: "Pentest Sieci i Chmury",
    titleEn: "Network and Cloud Pentesting",
    description: "Test penetracyjny pozwala na ocenę ryzyka, zgodności i dostępności usług.",
    descriptionEn: "Penetration testing allows assessment of risk, compliance and service availability.",
    bulletPoints: [
      "Zgodność z ISO i podatnościami CVE",
      "Usługa OSINT (biały wywiad)",
      "Dedykowany test lub skanowanie podatności",
      "Weryfikacja usług w sieci i chmurze"
    ],
    bulletPointsEn: [
      "Compliance with ISO and CVE vulnerabilities",
      "OSINT service (white intelligence)",
      "Dedicated test or vulnerability scanning",
      "Verification of network and cloud services"
    ],
    color: "from-amber-600 to-yellow-700",
    fullDescription: "Test penetracyjny pozwala na ocenę ryzyka, zgodności i dostępności usług. Pozwala zweryfikować poziom bezpieczeństwa usług, aplikacji i protokołów w sieci i w chmurze zgodnie ze standardem ISO i powszechnymi podatnościami (CVE). W pierwszej fazie może być również uwzględniona usługa OSINT (biały wywiad, zbieranie informacji). Usługa może być wdrożona jako dedykowany test penetracyjny lub po prostu skanowanie podatności.",
    fullDescriptionEn: "Penetration testing allows assessment of risk, compliance and service availability. It allows verification of the security level of services, applications and protocols in the network and cloud according to ISO standards and common vulnerabilities (CVE). In the first phase, OSINT service (white intelligence, information gathering) may also be included. The service can be implemented as a dedicated penetration test or simply vulnerability scanning.",
    customImage: '/images/chmurowe.png'
  },
  {
    icon: Bug,
    title: "Audyt Kodu Źródłowego",
    titleEn: "Source Code Audit",
    description: "Kompleksowa analiza kodu zgodnie z modelem DevSecOps - Security by design.",
    descriptionEn: "Comprehensive code analysis according to DevSecOps model - Security by design.",
    bulletPoints: [
      "Analiza ręczna i automatyczna",
      "Zgodność z modelem DevSecOps",
      "Audyt Blockchain",
      "Wykrywanie błędów bezpieczeństwa"
    ],
    bulletPointsEn: [
      "Manual and automatic analysis",
      "DevSecOps model compliance",
      "Blockchain audit",
      "Security error detection"
    ],
    color: "from-amber-600 to-yellow-700",
    fullDescription: "Kompleksowa analiza kodu źródłowego pozwala na odkrycie błędów bezpieczeństwa lub naruszeń konwencji programowania zgodnie z modelem DevSecOps (Security by design, security by default). Wykonywana ręcznie, a także przy pomocy komercyjnych i własnych narzędzi. Może to również obejmować audyt kodu źródłowego Blockchain.",
    fullDescriptionEn: "Comprehensive source code analysis allows discovery of security errors or programming convention violations according to the DevSecOps model (Security by design, security by default). Performed manually and with commercial and proprietary tools. This may also include Blockchain source code audit.",
    customImage: '/images/kod.png'
  },
  {
    icon: Server,
    title: "Utwardzanie Systemów i Urządzeń",
    titleEn: "System and Device Hardening",
    description: "Wdrażanie dodatkowych warstw ochrony zgodnie ze standardem OSSTMM.",
    descriptionEn: "Implementation of additional protection layers according to OSSTMM standard.",
    bulletPoints: [
      "Serwery i usługi sieciowe",
      "Urządzenia IoT i hosty",
      "Środowiska chmury (Azure, AWS, GCP)",
      "Zgodność ze standardem OSSTMM"
    ],
    bulletPointsEn: [
      "Servers and network services",
      "IoT devices and hosts",
      "Cloud environments (Azure, AWS, GCP)",
      "OSSTMM standard compliance"
    ],
    color: "from-amber-600 to-yellow-700",
    fullDescription: "Wdrażanie dodatkowych warstw ochrony urządzeń, aplikacji i usług, aby były zgodne z dostarczonymi wymaganiami i standardami. Dla serwerów, usług sieciowych, hostów, urządzeń IoT w celu wdrożenia najlepszej możliwej ochrony. Proces utwardzania koncentruje się również na utwardzaniu środowiska chmury (Azure, AWS, GCP itp.) zgodnie ze standardem OSSTMM.",
    fullDescriptionEn: "Implementation of additional protection layers for devices, applications and services to comply with provided requirements and standards. For servers, network services, hosts, IoT devices to implement the best possible protection. The hardening process also focuses on cloud environment hardening (Azure, AWS, GCP, etc.) according to OSSTMM standard.",
    customImage: '/images/utwardzanie.png'
  },
  {
    icon: UserSecret,
    title: "Inżynieria Społeczna",
    titleEn: "Social Engineering",
    description: "Bezpieczna symulacja prawdziwych ataków hakerskich.",
    descriptionEn: "Safe simulation of real hacker attacks.",
    bulletPoints: [
      "Symulacje phishingu i vishingu",
      "Włamania fizyczne",
      "Identyfikacja krytycznych ryzyk",
      "Bezpieczne dla organizacji"
    ],
    bulletPointsEn: [
      "Phishing and vishing simulations",
      "Physical break-ins",
      "Critical risk identification",
      "Safe for organization"
    ],
    color: "from-amber-600 to-yellow-700",
    fullDescription: "Symulacja prawdziwego ataku (logicznego lub fizycznego), takiego jaki realizują prawdziwi hakerzy, ale całkowicie bezpieczna dla organizacji. Pozwala zidentyfikować najbardziej krytyczne ryzyka potencjalnej utraty danych (kradzieży) i kompromitacji. Symulacje phishingu, vishingu i włamań fizycznych.",
    fullDescriptionEn: "Simulation of real attack (logical or physical), such as performed by real hackers, but completely safe for the organization. Allows identification of the most critical risks of potential data loss (theft) and compromise. Phishing, vishing and physical break-in simulations.",
    customImage: '/images/phishing.png'
  },
  {
    icon: ClipboardCheck,
    title: "Audyty Zgodności",
    titleEn: "Compliance Audits",
    description: "Przegląd zgodności z regulacjami WCAG, ISO 27001, GDPR, DORA, NIS2.",
    descriptionEn: "Compliance review with WCAG, ISO 27001, GDPR, DORA, NIS2 regulations.",
    bulletPoints: [
      "Przepisy zewnętrzne (WCAG, ISO 27001, GDPR)",
      "Regulacje DORA i NIS2",
      "Wytyczne wewnętrzne organizacji",
      "Kontrole i procedury compliance"
    ],
    bulletPointsEn: [
      "External regulations (WCAG, ISO 27001, GDPR)",
      "DORA and NIS2 regulations",
      "Internal organization guidelines",
      "Compliance controls and procedures"
    ],
    color: "from-amber-600 to-yellow-700",
    fullDescription: "Kompleksowy przegląd przestrzegania przez organizację wytycznych regulacyjnych (WCAG, ISO 27001, GDPR, ISO 9001, DORA, NIS2). Celem jest zapewnienie, że organizacja przestrzega zewnętrznych przepisów, zasad i regulacji lub wewnętrznych wytycznych, takich jak statuty korporacyjne, kontrole, zasady i procedury. Audyty zgodności mogą również określić, czy organizacja przestrzega umowy, np. gdy podmiot przyjmuje finansowanie rządowe lub inne.",
    fullDescriptionEn: "Comprehensive review of organization's compliance with regulatory guidelines (WCAG, ISO 27001, GDPR, ISO 9001, DORA, NIS2). The goal is to ensure that the organization complies with external laws, rules and regulations or internal guidelines, such as corporate statutes, controls, policies and procedures. Compliance audits can also determine whether the organization complies with agreements, e.g., when an entity accepts government or other funding.",
    customImage: '/images/audyt zgodnosci.png'
  },
  {
    icon: Legal,
    title: "Doradztwo Prawne i Stała Opieka",
    titleEn: "Legal Consulting and Continuous Care",
    description: "Utrzymanie przedsiębiorstwa w zgodności z wymogami i normami.",
    descriptionEn: "Maintaining enterprise compliance with requirements and standards.",
    bulletPoints: [
      "Zgodność z wymogami prawnymi",
      "Aktualizacja dokumentów i certyfikacji",
      "Ciągłe wsparcie compliance",
      "Opieka przy wdrożeniach i audytach"
    ],
    bulletPointsEn: [
      "Legal requirements compliance",
      "Document and certification updates",
      "Continuous compliance support",
      "Implementation and audit support"
    ],
    color: "from-amber-600 to-yellow-700",
    fullDescription: "Ten moduł odpowiada za utrzymanie przedsiębiorstwa w zgodności z wymogami i normami w czasie, zarówno przy wdrożeniu, audycie jak i później, aby na bieżąco aktualizować wymagane dokumenty i certyfikacje. Zapewniamy ciągłe wsparcie prawne i monitorowanie zmian w przepisach, które mogą wpłynąć na działalność organizacji.",
    fullDescriptionEn: "This module is responsible for maintaining enterprise compliance with requirements and standards over time, both during implementation, audit and later, to continuously update required documents and certifications. We provide continuous legal support and monitoring of regulatory changes that may affect the organization's operations.",
    customImage: '/images/libra.png'
  },
  {
    icon: SOC,
    title: "Security Operations Center",
    titleEn: "Security Operations Center",
    description: "Całodobowe monitorowanie i reagowanie na incydenty bezpieczeństwa.",
    descriptionEn: "24/7 monitoring and security incident response.",
    bulletPoints: [
      "Monitoring 24/7/365",
      "Wykrywanie zagrożeń w czasie rzeczywistym",
      "Incident response i forensyka",
      "Threat hunting i analiza"
    ],
    bulletPointsEn: [
      "24/7/365 monitoring",
      "Real-time threat detection",
      "Incident response and forensics",
      "Threat hunting and analysis"
    ],
    color: "from-amber-600 to-yellow-700",
    fullDescription: "Security Operations Center (SOC) zapewnia całodobowe monitorowanie środowiska IT organizacji w celu wykrywania, analizowania i reagowania na incydenty bezpieczeństwa cybernetycznego. Nasz SOC łączy zaawansowane technologie z doświadczeniem ekspertów, aby zapewnić najwyższy poziom ochrony przed zagrożeniami.",
    fullDescriptionEn: "Security Operations Center (SOC) provides 24/7 monitoring of the organization's IT environment to detect, analyze and respond to cybersecurity incidents. Our SOC combines advanced technologies with expert experience to provide the highest level of protection against threats.",
    customImage: '/images/soc.png'
  }
];

const cyberStats = [
  {
    number: 8.2,
    suffix: "mln",
    suffixEn: "M",
    label: "Incydentów cyber w 2024",
    labelEn: "Cyber incidents in 2024",
    description: "Globalna liczba ataków cybernetycznych",
    descriptionEn: "Global number of cyber attacks"
  },
  {
    number: 68,
    suffix: "%",
    suffixEn: "%",
    label: "Wzrost ataków RdR",
    labelEn: "RdR attacks growth",
    description: "Wzrost w porównaniu do 2023 roku",
    descriptionEn: "Growth compared to 2023"
  },
  {
    number: 4.88,
    suffix: "mln USD",
    suffixEn: "M USD",
    label: "Średni koszt naruszenia",
    labelEn: "Average breach cost",
    description: "Koszt jednego incydentu bezpieczeństwa",
    descriptionEn: "Cost of one security incident"
  },
  {
    number: 277,
    suffix: " dni",
    suffixEn: " days",
    label: "Czas wykrycia ataku",
    labelEn: "Attack detection time",
    description: "Średni czas identyfikacji naruszenia",
    descriptionEn: "Average time to identify breach"
  }
];

const companySizeOptions = [
  { value: "wole-nie-mowic", label: "Podam na późniejszym etapie", labelEn: "I'll provide later" },
  { value: "<50", label: "Mniej niż 50 pracowników", labelEn: "Less than 50 employees" },
  { value: "50-249", label: "50 - 249 pracowników", labelEn: "50 - 249 employees" },
  { value: "250+", label: "Powyżej 250 pracowników", labelEn: "Over 250 employees" },
];

const statsData = [
  { number: 25, suffix: "+", label: "Lat doświadczenia", labelEn: "Years of experience" },
  { number: 500, suffix: "+", label: "Zadowolonych klientów", labelEn: "Satisfied clients" },
  { number: 99, suffix: "%", label: "Skuteczność testów", labelEn: "Test efficiency" },
  { number: 24, suffix: "/7", label: "Wsparcie techniczne", labelEn: "Technical support" }
];

const aboutBlocks = [
  {
    title: "Rozwiązania skrojone na miarę",
    titleEn: "Tailored solutions",
    content: "Do każdego klienta podchodzimy indywidualnie rozpoznając rzeczywiste potrzeby a następnie budując indywidualny, dedykowany zespół doświadczonych ekspertów do ich wdrożenia.",
    contentEn: "We approach each client individually, recognizing real needs and then building an individual, dedicated team of experienced experts to implement them.",
    icon: Users,
    reverse: false,
    customImage: '/images/img1.jpeg'
  },
  {
    title: "Przeszło 25 lat doświadczenia",
    titleEn: "Over 25 years of experience",
    content: "Nasze zespoły opieramy wyłącznie na wyselekcjonowanych, sprawdzonych przez lata profesjonalistach objętych klauzulą ścisłej tajemnicy zawodowej. Stawiamy na najwyższe standardy jakości pracy i obsługi klienta!",
    contentEn: "We base our teams exclusively on carefully selected professionals proven over the years, covered by strict professional confidentiality clauses. We focus on the highest standards of work quality and customer service!",
    icon: Award,
    reverse: true,
    customImage: '/images/img2.jpeg'
  },
  {
    title: "Twój partner w biznesie",
    titleEn: "Your business partner",
    content: "Koordynacja, pytania, wybory, kontakt z działem IT, raportowanie… od dziś to nie Twoje zmartwienie! SecurHUB zapewnia dedykowanego opiekuna już od pierwszego dnia współpracy. Na każdym etapie pozostaje do dyspozycji by pomóc i odpowiedzieć na wszelkie pytania.",
    contentEn: "Coordination, questions, choices, contact with IT department, reporting... from now on, this is not your worry! SecurHUB provides a dedicated guardian from the first day of cooperation. At every stage, they remain available to help and answer any questions.",
    icon: Headset,
    reverse: false,
    customImage: '/images/img3.jpeg'
  },
  {
    title: "Nam możesz zaufać",
    titleEn: "You can trust us",
    content: "Wiemy, jak ważna w dużym biznesie jest poufność informacji. Dlatego zespół SecurHUB zapewnia całkowitą ochronę tożsamości klienta na każdym etapie poprzedzającym ostateczne wdrożenie usługi a także minimalizuje dostęp do wrażliwych informacji na późniejszych jej etapach.",
    contentEn: "We know how important confidentiality of information is in big business. Therefore, the SecurHUB team ensures complete protection of client identity at every stage preceding the final implementation of the service and also minimizes access to sensitive information at its later stages.",
    icon: Lock,
    reverse: true,
    customImage: '/images/img4.jpeg'
  }
];

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

const LazyImage = React.memo<{
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}>(({ src, alt, width, height, className = "", priority = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div 
          className={`absolute inset-0 image-placeholder rounded ${className}`}
          style={{ width }}
        />
      )}
      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
          onLoad={handleLoad}
          onError={handleError}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      ) : (
        <div 
          className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 ${className}`}
          style={{ width }}
        >
          <span className="text-sm">Failed to load</span>
        </div>
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

const ThemeToggle = React.memo<{ isOverHero?: boolean }>(({ isOverHero = false }) => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  
  const buttonColorClass = useMemo(() => {
    if (isOverHero) {
      return 'text-yellow-400 hover:text-yellow-300 hover:bg-white/10';
    }
    return theme === 'dark' 
      ? 'text-yellow-400 hover:text-yellow-300 hover:bg-white/10' 
      : 'text-orange-600 hover:text-orange-700 hover:bg-black/10';
  }, [isOverHero, theme]);
  
  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      className={`p-2 rounded-lg transition-all duration-300 ${buttonColorClass}`}
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

const LanguageToggle = React.memo<{ isOverHero?: boolean }>(({ isOverHero = false }) => {
  const { language, toggleLanguage } = React.useContext(LanguageContext);
  const { theme } = React.useContext(ThemeContext);
  
  const buttonColorClass = useMemo(() => {
    if (isOverHero) {
      return 'text-blue-400 hover:text-blue-300 hover:bg-white/10';
    }
    return theme === 'dark' 
      ? 'text-blue-400 hover:text-blue-300 hover:bg-white/10' 
      : 'text-blue-600 hover:text-blue-700 hover:bg-black/10';
  }, [isOverHero, theme]);
  
  return (
    <motion.button
      onClick={toggleLanguage}
      whileTap={{ scale: 0.95 }}
      className={`p-2 rounded-lg transition-all duration-300 ${buttonColorClass} flex items-center space-x-1`}
      aria-label="Toggle language"
    >
      <Globe className="w-5 h-5" />
      <motion.span
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-sm font-medium"
      >
        {language.toUpperCase()}
      </motion.span>
    </motion.button>
  );
});

LanguageToggle.displayName = 'LanguageToggle';

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
      initial={{ opacity: 0.8, y: 50, scale: 0.9 }}
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
      : "text-gray-900 hover:shadow-blue-500/30",
    secondary: theme === 'dark' 
      ? "text-gray-100 hover:text-white" 
      : "text-gray-800 hover:text-gray-900",
    ghost: theme === 'dark' 
      ? "text-gray-200 hover:text-white hover:bg-white/5" 
      : "text-gray-700 hover:text-gray-900 hover:bg-black/5"
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
      <span className="relative z-10 flex items-center ">
        {children}
      </span>
    </motion.button>
  );
});

PremiumButton.displayName = 'PremiumButton';

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; labelEn?: string }[];
  placeholder: string;
}

interface FeatureModalProps {
  feature: typeof features[0] | null;
  isOpen: boolean;
  onClose: () => void;
}

const FeatureModal = React.memo<FeatureModalProps>(({ feature, isOpen, onClose }) => {
  const { theme } = React.useContext(ThemeContext);
  const { language } = React.useContext(LanguageContext);
  const t = translations[language];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!feature) return null;

  const Icon = feature.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto neuromorphic rounded-2xl p-6 sm:p-8 ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                <div className="neuromorphic-inset w-16 h-16 rounded-xl flex items-center justify-center mr-4">
                  <Icon className="w-8 h-8 text-amber-400" />
                </div>
                <div>
                  <h3 className={`text-xl sm:text-2xl font-bold font-heading ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {language === 'pl' ? feature.title : feature.titleEn}
                  </h3>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {language === 'pl' ? feature.description : feature.descriptionEn}
                  </p>
                </div>
              </div>
              
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  theme === 'dark' 
                    ? 'hover:bg-white/10 text-gray-300 hover:text-white' 
                    : 'hover:bg-black/10 text-gray-600 hover:text-gray-900'
                }`}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="space-y-6">
             

              <div>
                <h4 className={`text-lg font-semibold mb-3 font-heading ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {t.features.serviceDescription}
                </h4>
                <p className={`font-body leading-relaxed text-sm sm:text-base ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  {language === 'pl' ? feature.fullDescription : feature.fullDescriptionEn}
                </p>
              </div>

              <div>
                <h4 className={`text-lg font-semibold mb-4 font-heading ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {t.features.keyElements}
                </h4>
                <ul className="space-y-3">
                  {(language === 'pl' ? feature.bulletPoints : feature.bulletPointsEn).map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0.8, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`flex items-start text-sm sm:text-base font-body ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      <div className="w-2 h-2 bg-amber-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <PremiumButton
                  onClick={onClose}
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  {t.features.close}
                </PremiumButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

FeatureModal.displayName = 'FeatureModal';

const certificates = [
  {
    name: "OSEP",
    description: "Offensive Security Experienced Penetration Tester",
    image: "/images/logos/osep.png",
    fullDescription: "OSEP to zaawansowany certyfikat penetration testingu od Offensive Security, koncentrujący się na evasion techniques i advanced exploitation w środowiskach korporacyjnych.",
    details: [
      "Zaawansowane techniki evasion",
      "Exploitation w środowiskach korporacyjnych", 
      "Advanced persistence techniques",
      "Lateral movement i privilege escalation"
    ]
  },
  {
    name: "AD",
    description: "Active Directory Security",
    image: "/images/logos/missing/microsoft cert.png",
    fullDescription: "Specjalizacja w zabezpieczaniu i testowaniu środowisk Active Directory, obejmująca zaawansowane techniki ataków i obrony.",
    details: [
      "Bezpieczeństwo Active Directory",
      "Zaawansowane techniki ataków AD", 
      "Konfiguracja zabezpieczeń domenowych",
      "Monitoring i wykrywanie zagrożeń AD"
    ]
  },
  {
    name: "AWS Architect Associate",
    description: "AWS Solutions Architect Associate",
    image: "/images/logos/AWS Architect Associate.png",
    fullDescription: "Certyfikat AWS Solutions Architect Associate potwierdza umiejętności projektowania i wdrażania skalowalnych systemów w chmurze AWS.",
    details: [
      "Projektowanie architektur chmurowych",
      "Bezpieczeństwo w AWS", 
      "Optymalizacja kosztów",
      "Wysoką dostępność i odporność na awarie"
    ]
  },
  {
    name: "AWS Security Specialty",
    description: "AWS Certified Security – Specialty",
    image: "/images/logos/AWS Security Specialty.png",
    fullDescription: "Zaawansowany certyfikat AWS koncentrujący się na bezpieczeństwie w chmurze, obejmujący identity management, data protection i incident response.",
    details: [
      "Bezpieczeństwo danych w chmurze",
      "Identity and Access Management", 
      "Logging i monitoring bezpieczeństwa",
      "Incident response w AWS"
    ]
  },
  {
    name: "Android Forensics",
    description: "Android Forensics with Belkasoft",
    image: "/images/logos/belkasoft.png",
    fullDescription: "Specjalistyczny certyfikat w dziedzinie kryminalistyki cyfrowej na platformie Android z wykorzystaniem narzędzi Belkasoft.",
    details: [
      "Analiza urządzeń mobilnych Android",
      "Odzyskiwanie usuniętych danych", 
      "Analiza aplikacji mobilnych",
      "Dokumentacja dowodów cyfrowych"
    ]
  },
  {
    name: "ISO 27001 Lead Auditor",
    description: "Audytor wiodący ISO 27001",
    image: "/images/logos/iso.png",
    fullDescription: "Certyfikat audytora wiodącego ISO 27001 umożliwia przeprowadzanie audytów systemów zarządzania bezpieczeństwem informacji.",
    details: [
      "Audyty ISMS zgodne z ISO 27001",
      "Metodologie audytowe", 
      "Zarządzanie ryzykiem informacyjnym",
      "Raportowanie i rekomendacje"
    ]
  },
  {
    name: "CARTP",
    description: "Certified Azure Red Team Professional",
    image: "/images/logos/cartp.png",
    fullDescription: "Certyfikat Red Team Professional dla środowiska Microsoft Azure, koncentrujący się na zaawansowanych technikach ataków w chmurze.",
    details: [
      "Red teaming w środowisku Azure",
      "Zaawansowane techniki ataków chmurowych", 
      "Azure AD exploitation",
      "Persistence w chmurze Microsoft"
    ]
  },
  {
    name: "CEH",
    description: "Certified Ethical Hacker",
    image: "/images/logos/ceh.webp",
    fullDescription: "CEH to globalnie uznawany certyfikat ethical hackera, pokrywający szeroki zakres technik testowania penetracyjnego i analizy bezpieczeństwa.",
    details: [
      "Etyczne hackowanie i penetration testing",
      "Rozpoznanie i skanowanie", 
      "Exploitation i post-exploitation",
      "Raportowanie luk bezpieczeństwa"
    ]
  },
  {
    name: "CEPT",
    description: "Certified Ethical Penetration Tester",
    image: "/images/logos/missing/CEPT logo.png",
    fullDescription: "CEPT to zaawansowany certyfikat eksperta w dziedzinie testów penetracyjnych, potwierdzający wysokie umiejętności w identyfikowaniu i wykorzystywaniu luk bezpieczeństwa.",
    details: [
      "Zaawansowane testy penetracyjne",
      "Metodologie testowania bezpieczeństwa", 
      "Analiza złożonych systemów",
      "Eksperckie raportowanie"
    ]
  },
  {
    name: "Chainanalysis CRC",
    description: "Chainanalysis Reactor Certification",
    image: "/images/logos/chainalysis.png",
    fullDescription: "Certyfikat Chainanalysis Reactor Certification (CRC) potwierdza umiejętności w zakresie analizy transakcji kryptowalutowych i śledztw blockchain.",
    details: [
      "Analiza transakcji blockchain",
      "Śledzenie przepływu kryptowalut", 
      "Identyfikacja podejrzanych adresów",
      "Compliance w kryptowalutach"
    ]
  },
  {
    name: "CISSP",
    description: "Certified Information Systems Security Professional",
    image: "/images/logos/cissp.png",
    fullDescription: "CISSP to prestiżowy certyfikat bezpieczeństwa informacji, pokrywający osiem domen bezpieczeństwa i wymagający znacznego doświadczenia praktycznego.",
    details: [
      "Zarządzanie bezpieczeństwem i ryzykiem",
      "Bezpieczeństwo aktywów", 
      "Inżynieria bezpieczeństwa",
      "Bezpieczeństwo operacyjne"
    ]
  },
  {
    name: "CRTP",
    description: "Certified Red Team Professional",
    image: "/images/logos/missing/crtp.png",
    fullDescription: "CRTP koncentruje się na zaawansowanych technikach Red Team, symulujących rzeczywiste ataki przeciwko środowiskom Active Directory.",
    details: [
      "Red Team operations",
      "Active Directory exploitation", 
      "Lateral movement techniques",
      "Persistence i evasion"
    ]
  },
  {
    name: "DSOC",
    description: "Drone Security Operations Certificate",
    image: "/images/logos/missing/DSOC.png",
    fullDescription: "Certyfikat DSOC potwierdza umiejętności w zakresie [...].",
    details: [
      "...",
      "...",
      "...",
      "..."
    ]
  },
  {
    name: "eWPTX",
    description: "eLearnSecurity Web Application Penetration Tester eXtreme",
    image: "/images/logos/wptx.png",
    fullDescription: "eWPTX to zaawansowany certyfikat testowania penetracyjnego aplikacji webowych, koncentrujący się na skomplikowanych scenariuszach ataków.",
    details: [
      "Zaawansowane testy aplikacji web",
      "Complex exploitation scenarios", 
      "Manual testing techniques",
      "Advanced web vulnerabilities"
    ]
  },
  {
    name: "HKT",
    description: "Hacker Techniques",
    image: "/images/logos/missing/HKT.png",
    fullDescription: "HKT obejmuje szerokie spektrum technik hackerskich, od podstawowych po zaawansowane, używanych w profesjonalnych testach bezpieczeństwa.",
    details: [
      "Zaawansowane techniki hackerskie",
      "Social engineering", 
      "Physical security testing",
      "Wireless network attacks"
    ]
  },
  {
    name: "ISO 27001",
    description: "Information Security Management Systems",
    image: "/images/logos/iso.png",
    fullDescription: "ISO 27001 to międzynarodowy standard dla systemów zarządzania bezpieczeństwem informacji (ISMS), definiujący wymagania dla skutecznego zarządzania bezpieczeństwem.",
    details: [
      "Systemy zarządzania bezpieczeństwem",
      "Zarządzanie ryzykiem informacyjnym", 
      "Ciągłe doskonalenie ISMS",
      "Compliance i audyty"
    ]
  },
  {
    name: "Mobile Security",
    description: "Mobile Security & Penetration Testing",
    
    fullDescription: "Specjalizacja w bezpieczeństwie urządzeń mobilnych i testowaniu penetracyjnym aplikacji mobilnych na platformach iOS i Android.",
    details: [
      "Bezpieczeństwo aplikacji mobilnych",
      "iOS i Android penetration testing", 
      "Mobile malware analysis",
      "Mobile device forensics"
    ]
  },
  {
    name: "OSCE",
    description: "Offensive Security Certified Expert",
    image: "/images/logos/osce.png",
    fullDescription: "OSCE to bardzo zaawansowany certyfikat od Offensive Security, wymagający umiejętności w zakresie custom exploit development i advanced penetration testing.",
    details: [
      "Advanced exploit development",
      "Custom payload creation", 
      "Bypass security mechanisms",
      "Advanced penetration testing"
    ]
  },
  {
    name: "OSCP",
    description: "Offensive Security Certified Professional",
    image: "/images/logos/oscp.png",
    fullDescription: "OSCP to jeden z najbardziej szanowanych certyfikatów penetration testing, wymagający praktycznych umiejętności w zakresie ethical hackingu.",
    details: [
      "Practical penetration testing",
      "Manual exploitation techniques", 
      "Linux i Windows exploitation",
      "Network penetration testing"
    ]
  },
  {
    name: "OSWE",
    description: "Offensive Security Web Expert",
    image: "/images/logos/oswe.png",
    fullDescription: "OSWE koncentruje się na zaawansowanym testowaniu bezpieczeństwa aplikacji webowych, w tym white-box testing i source code review.",
    details: [
      "Advanced web application testing",
      "Source code review", 
      "White-box testing methodologies",
      "Custom web exploitation"
    ]
  },
  {
    name: "OSWP",
    description: "Offensive Security Wireless Professional",
    image: "/images/logos/oswp.png",
    fullDescription: "OSWP to certyfikat specjalizujący się w testowaniu bezpieczeństwa sieci bezprzewodowych i technikach ataków wireless.",
    details: [
      "Wireless network security testing",
      "WiFi penetration testing", 
      "Wireless encryption attacks",
      "Rogue access point detection"
    ]
  },
  {
    name: "OWASP",
    description: "Open Web Application Security Project",
    image: "/images/logos/owasp.webp",
    fullDescription: "Certyfikacje OWASP koncentrują się na bezpieczeństwie aplikacji webowych zgodnie z najlepszymi praktykami i standardami OWASP.",
    details: [
      "OWASP Top 10 vulnerabilities",
      "Secure coding practices", 
      "Web application security testing",
      "Application security standards"
    ]
  },
  {
    name: "Security Analyst",
    description: "Security Analyst (Blue Team)",
    image: "/images/logos/blue.png",
    fullDescription: "Certyfikat Blue Team Security Analyst koncentruje się na obronie, monitoringu i analizie incydentów bezpieczeństwa w organizacji.",
    details: [
      "Security monitoring i analysis",
      "Incident detection i response", 
      "Threat hunting",
      "Defense strategies"
    ]
  },
  {
    name: "Security Essentials",
    description: "Information Security Essentials",
    image: "/images/logos/cyberess.png",
    fullDescription: "Security Essentials pokrywa fundamentalne koncepcje bezpieczeństwa informacji, stanowiąc solidną podstawę dla specjalistów bezpieczeństwa.",
    details: [
      "Fundamenty bezpieczeństwa informacji",
      "Security governance", 
      "Risk management basics",
      "Security awareness"
    ]
  }
];

interface CertificateModalProps {
  certificate: typeof certificates[0] | null;
  isOpen: boolean;
  onClose: () => void;
}

const CertificateModal = React.memo<CertificateModalProps>(({ certificate, isOpen, onClose }) => {
  const { theme } = React.useContext(ThemeContext);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!certificate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto neuromorphic rounded-2xl p-6 sm:p-8 ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                     <div className="w-12 h-12 mx-auto mb-3 glass-effect rounded-lg flex items-center justify-center group-hover:shadow-blue-500/30 transition-all duration-300">
                        {certificate.image ? (
                          <img
                            src={certificate.image}
                            alt={certificate.name}
                            className="rounded-md object-contain w-full"
                          />
                        ) : (
                          <Certificate className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
                        )}
                      </div>
            
                <div>
                  <h3 className={`text-xl sm:text-2xl font-bold font-heading ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {certificate.name}
                  </h3>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {certificate.description}
                  </p>
                </div>
              </div>
              
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  theme === 'dark' 
                    ? 'hover:bg-white/10 text-gray-300 hover:text-white' 
                    : 'hover:bg-black/10 text-gray-600 hover:text-gray-900'
                }`}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className={`text-lg font-semibold mb-3 font-heading ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Opis certyfikatu
                </h4>
                <p className={`font-body leading-relaxed text-sm sm:text-base ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  {certificate.fullDescription}
                </p>
              </div>

              <div>
                <h4 className={`text-lg font-semibold mb-4 font-heading ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Kluczowe obszary
                </h4>
                <ul className="space-y-3">
                  {certificate.details.map((detail, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0.8, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`flex items-start text-sm sm:text-base font-body ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <PremiumButton
                  onClick={onClose}
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  Zamknij
                </PremiumButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

CertificateModal.displayName = 'CertificateModal';

// NEW IMPROVED CERTIFICATE SCROLLING COMPONENT
const CertificateScrolling = React.memo<{
  certificates: typeof certificates;
  onCertificateClick: (certificate: typeof certificates[0]) => void;
}>(({ certificates, onCertificateClick }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });
  const [userInteracted, setUserInteracted] = useState(false);
  
  const SCROLL_SPEED = 0.5; // pixels per frame
  const INTERACTION_TIMEOUT = 2000; // ms before auto-scroll resumes after interaction

  // Auto-scroll function
  const autoScroll = useCallback(() => {
    if (!scrollContainerRef.current || isHovered || isDragging || userInteracted) {
      return;
    }

    const container = scrollContainerRef.current;
    const maxScroll = container.scrollWidth / 2; // Half because we have duplicated items
    
    container.scrollLeft += SCROLL_SPEED;
    
    // Reset to beginning when we've scrolled through original items
    if (container.scrollLeft >= maxScroll) {
      container.scrollLeft = 0;
    }
    
    animationRef.current = requestAnimationFrame(autoScroll);
  }, [isHovered, isDragging, userInteracted]);

  // Start auto-scroll
  useEffect(() => {
    if (!isHovered && !isDragging && !userInteracted) {
      animationRef.current = requestAnimationFrame(autoScroll);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoScroll, isHovered, isDragging, userInteracted]);

  // Handle mouse enter (pause auto-scroll)
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  // Handle mouse leave (resume auto-scroll after delay)
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (!isDragging && !userInteracted) {
      animationRef.current = requestAnimationFrame(autoScroll);
    }
  }, [autoScroll, isDragging, userInteracted]);

  // Handle drag start
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    
    setIsDragging(true);
    setUserInteracted(true);
    
    const container = scrollContainerRef.current;
    setDragStart({
      x: e.pageX - container.offsetLeft,
      scrollLeft: container.scrollLeft
    });
    
    // Cancel auto-scroll
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Prevent text selection
    e.preventDefault();
  }, []);

  // Handle dragging
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    
    e.preventDefault();
    const container = scrollContainerRef.current;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - dragStart.x) * 2; // Multiply by 2 for faster scrolling
    
    container.scrollLeft = dragStart.scrollLeft - walk;
  }, [isDragging, dragStart]);

  // Handle drag end
  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Resume auto-scroll after timeout
    setTimeout(() => {
      setUserInteracted(false);
    }, INTERACTION_TIMEOUT);
  }, [isDragging]);

  // Handle certificate click
  const handleCertificateClick = useCallback((certificate: typeof certificates[0]) => {
    if (!isDragging) {
      onCertificateClick(certificate);
    }
  }, [isDragging, onCertificateClick]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.8 }}
      className="mt-12 relative"
    >
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className={`flex gap-4 overflow-x-auto scrollbar-hide ${
            isDragging ? 'dragging' : 'grab-cursor'
          }`}
          style={{
            scrollBehavior: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Original certificates */}
          {certificates.map((certificate, index) => (
            <motion.div
              key={`original-${certificate.name}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 2.0 + index * 0.05 }}
              whileHover={{ 
                y: isDragging ? 0 : -3, 
                scale: isDragging ? 1 : 1.05 
              }}
              className="p-4 rounded-xl text-center group transition-all duration-300 cursor-pointer flex-shrink-0 select-none"
              style={{ minWidth: '180px', width: '180px' }}
              onClick={() => handleCertificateClick(certificate)}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

              <div className="relative z-10">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center transition-all duration-300">
                  {certificate.image ? (
                    <img
                      src={certificate.image}
                      alt={certificate.name}
                      className="rounded-md object-contain w-full"
                      draggable={false}
                    />
                  ) : (
                    <Certificate className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
                  )}
                </div>

                <h3 className="text-sm font-bold mb-1 font-heading line-clamp-1 text-white">
                  {certificate.name}
                </h3>
              </div>
            </motion.div>
          ))}

          {/* Duplicate certificates for seamless loop */}
          {certificates.map((certificate, index) => (
            <motion.div
              key={`duplicate-${certificate.name}-${index}`}
              whileHover={{ 
                y: isDragging ? 0 : -3, 
                scale: isDragging ? 1 : 1.05 
              }}
              className="p-4 rounded-xl text-center group transition-all duration-300 cursor-pointer flex-shrink-0 select-none"
              style={{ minWidth: '180px', width: '180px' }}
              onClick={() => handleCertificateClick(certificate)}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

              <div className="relative z-10">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center transition-all duration-300">
                  {certificate.image ? (
                    <img
                      src={certificate.image}
                      alt={certificate.name}
                      className="rounded-md object-contain w-full"
                      draggable={false}
                    />
                  ) : (
                    <Certificate className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
                  )}
                </div>

                <h3 className="text-sm font-bold mb-1 font-heading line-clamp-1 text-white">
                  {certificate.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

CertificateScrolling.displayName = 'CertificateScrolling';

const CyberStatsSection = React.memo(() => {
  const { theme } = React.useContext(ThemeContext);
  const { language } = React.useContext(LanguageContext);
  const t = translations[language];
  
  return (
    <section id="stats" className="py-20 sm:py-28 section-bg relative overflow-hidden">
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-r ${
          theme === 'dark' 
            ? 'from-red-900/10 via-orange-900/5 to-amber-900/10' 
            : 'from-red-100/30 via-orange-100/20 to-amber-100/30'
        }`} />
        <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,100,100,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,100,100,0.02)_1px,transparent_1px)] bg-[size:60px_60px]`} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0.8, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-heading ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {t.stats.title}
          </h2>
          <p className={`text-lg sm:text-xl max-w-4xl mx-auto font-body leading-relaxed ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}>
            {t.stats.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {cyberStats.map((stat, index) => (
            <motion.div
              key={`${stat.label}-${index}`}
              initial={{ opacity: 0.8, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="neuromorphic p-8 sm:p-10 rounded-2xl text-center group hover:shadow-red-500/20 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="neuromorphic-inset w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-red-500/30 transition-all duration-500">
                  <Shield className="w-10 h-10 text-red-400 group-hover:text-red-300 transition-colors duration-500" />
                </div>
                
                <div className="mb-3">
                  <span className={`text-3xl sm:text-4xl md:text-5xl font-bold font-heading ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <AnimatedCounter target={stat.number} />
                  </span>
                  <span className={`text-3xl sm:text-4xl md:text-5xl font-bold font-heading ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {language === 'pl' ? stat.suffix : stat.suffixEn}
                  </span>
                </div>
                
                <h3 className={`text-lg sm:text-xl font-semibold mb-3 font-heading ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {language === 'pl' ? stat.label : stat.labelEn}
                </h3>
                
                <p className={`text-sm sm:text-base font-body ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {language === 'pl' ? stat.description : stat.descriptionEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
});

CyberStatsSection.displayName = 'CyberStatsSection';

const CustomDropdown = React.memo<CustomDropdownProps>(({ 
  value, 
  onChange, 
  options, 
  placeholder 
}) => {
  const { theme } = React.useContext(ThemeContext);
  const { language } = React.useContext(LanguageContext);
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
          {selectedOption ? (language === 'pl' ? selectedOption.label : (selectedOption.labelEn || selectedOption.label)) : placeholder}
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
            initial={{ opacity: 0.8, y: -10 }}
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
                {language === 'pl' ? option.label : (option.labelEn || option.label)}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

CustomDropdown.displayName = 'CustomDropdown';

const NavigationBar = React.memo<{ 
  isScrolled: boolean; 
  mobileNavActive: boolean; 
  setMobileNavActive: (active: boolean) => void; 
  scrollToSection: (sectionId: string) => void;
  isOverHero: boolean;
}>(({ isScrolled, mobileNavActive, setMobileNavActive, scrollToSection, isOverHero }) => {
  const { theme } = React.useContext(ThemeContext);
  const { language } = React.useContext(LanguageContext);
  const t = translations[language];
  
  const navigationItems = useMemo(() => [
    { name: t.nav.about, target: "about" },
    { name: t.nav.stats, target: "stats" },
    { name: t.nav.features, target: "features" },
    { name: t.nav.contact, target: "contact" }
  ], [t]);

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

  const handleNavClick = useCallback((target: string) => {
    scrollToSection(target);
    setMobileNavActive(false);
  }, [scrollToSection, setMobileNavActive]);

  const textColorClass = useMemo(() => {
    if (isOverHero) {
      return 'hero-navbar';
    }
    return theme === 'dark' 
      ? 'text-gray-200 hover:text-white' 
      : 'text-gray-800 hover:text-gray-900';
  }, [isOverHero, theme]);

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
                  <LazyImage 
                    src="images/logo.png" 
                    alt="Secur" 
                    width={96}
                    height={96}
                    className="object-contain filter drop-shadow-lg"
                    priority={true}
                  />
                </span>
              </div>
            </motion.div>
            <div className="hidden md:ml-12 md:flex md:space-x-1">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.target)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative group font-body ${textColorClass} hover:bg-white/8`}
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

          <div className="flex items-center space-x-2">
            <ThemeToggle isOverHero={isOverHero} />
            <LanguageToggle isOverHero={isOverHero} />
            <div className="hidden md:flex">
              <PremiumButton
                onClick={handleContactClick}
                variant="primary"
                size="sm"
              >
                <span className="text-amber-300">{t.contact.writeToUs}</span>
                <ArrowRight className="w-4 h-4 ml-2 text-amber-300" />
              </PremiumButton>
            </div>
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleMobileNav}
                className={`p-2 transition-colors duration-200 ${textColorClass}`}
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
            initial={{ opacity: 0.8, height: 0 }}
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
                  onClick={() => handleNavClick(item.target)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 font-body ${
                    theme === 'dark' 
                      ? 'text-gray-200 hover:text-white hover:bg-white/8' 
                      : 'text-gray-800 hover:text-gray-900 hover:bg-black/8'
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
                  {t.nav.contact}
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

const HeroSection = React.memo<{
  scrollToSection: (sectionId: string) => void;
  onCertificateClick: (certificate: typeof certificates[0]) => void;
}>(({ scrollToSection, onCertificateClick }) => {
  const { language } = React.useContext(LanguageContext);
  const t = translations[language];

  const handleContactClick = useCallback(() => {
    scrollToSection("contact");
  }, [scrollToSection]);

  const handleFeaturesClick = useCallback(() => {
    scrollToSection("features");
  }, [scrollToSection]);

  const mouseXLocal = useMotionValue(0);
  const mouseYLocal = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseXLocal, springConfig);
  const y = useSpring(mouseYLocal, springConfig);

  const xTransform = useTransform(x, [-0.5, 0.5], [-12, 12]);
  const yTransform = useTransform(y, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseXLocal.set((e.clientX - centerX) / rect.width);
    mouseYLocal.set((e.clientY - centerY) / rect.height);
  }, [mouseXLocal, mouseYLocal]);

  const handleMouseLeave = useCallback(() => {
    mouseXLocal.set(0);
    mouseYLocal.set(0);
  }, [mouseXLocal, mouseYLocal]);

  return (
    <section id="hero" className="min-h-screen hero-section text-white overflow-hidden relative select-none">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat select-none"
        style={{
          backgroundImage: `url('/images/bgr.png')`
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
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-full blur-3xl"
                    style={{
                      x: useTransform(x, [-0.5, 0.5], [-8, 8]),
                      y: useTransform(y, [-0.5, 0.5], [-6, 6]),
                      scale: useTransform(x, [-0.5, 0, 0.5], [1.1, 1.2, 1.1])
                    }}
                  />

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
                    <LazyImage
                      src="images/logo.png"
                      alt="SecurHUB Logo"
                      width={512}
                      height={512}
                      className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] object-contain filter drop-shadow-2xl transition-all duration-300"
                      priority={true}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.h1>
          </div>





          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-100 max-w-4xl mx-auto font-body leading-relaxed px-4"
          >
            
            {t.hero.desc1} {" "}
            <span className="text-amber-300 font-semibold">
              {t.hero.desc2}
              </span>{" "}
            {t.hero.desc3}{" "}
            <span className="text-yellow-300 font-semibold">
              {t.hero.desc4}
            </span>
          </motion.p>




          <motion.div
            initial={{ opacity: 0.8, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 px-4"
          >
            {statsData.map((stat, index) => (
              <motion.div
                key={`${stat.label}-${index}`}
                initial={{ opacity: 0.8, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-heading mb-2">
                  <AnimatedCounter target={stat.number} />
                  {stat.suffix}
                </div>
                <div className="text-sm text-gray-200 font-body">
                  {language === 'pl' ? stat.label : stat.labelEn}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <CertificateScrolling 
            certificates={certificates} 
            onCertificateClick={onCertificateClick} 
          />
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

const AboutSection = React.memo(() => {
  const { theme } = React.useContext(ThemeContext);
  const { language } = React.useContext(LanguageContext);
  const t = translations[language];
  
  return (
    <section id="about" className="py-20 sm:py-28 section-bg">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0.8, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-heading ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {t.about.title}
          </h2>
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto font-body ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}>
            {t.about.subtitle}
          </p>
        </motion.div>

        <div className="space-y-20 sm:space-y-28">
          {aboutBlocks.map((block, index) => {
            const Icon = block.icon;
            return (
              <motion.div
                key={`${block.title}-${index}`}
                initial={{ opacity: 0.8, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
                  block.reverse ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 w-full">
                  <motion.div 
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.3 }}
                    className="neuromorphic p-8 sm:p-10 rounded-3xl hover:shadow-amber-500/15 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-8">
                      <div className="neuromorphic-inset w-20 h-20 rounded-xl flex items-center justify-center mr-0 sm:mr-6 mb-6 sm:mb-0">
                        <Icon className="w-10 h-10 text-amber-400" />
                      </div>
                      <h3 className={`text-2xl sm:text-3xl font-bold font-heading ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {language === 'pl' ? block.title : block.titleEn}
                      </h3>
                    </div>
                    <p className={`leading-relaxed font-body text-lg sm:text-xl ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      {language === 'pl' ? block.content : block.contentEn}
                    </p>
                  </motion.div>
                </div>

                <div className="flex-1 w-full lg:max-w-md">
                  <motion.div 
                    initial={{ opacity: 0.8, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <MouseParallax strength={0.15}>
                      <div className={`absolute inset-0 rounded-3xl transform translate-x-6 translate-y-6 ${
                        theme === 'dark' 
                          ? 'bg-gradient-to-br from-amber-600/30 to-yellow-600/30' 
                          : 'bg-gradient-to-br from-amber-400/30 to-yellow-400/30'
                      }`} />
                      
                      <div className="relative neuromorphic-inset rounded-3xl overflow-hidden shadow-2xl">
                        {block.customImage ? (
                          <div className="h-64 sm:h-80 relative">
                            <div className={`opacity-40 ${
                                theme === 'dark'
                                  ? 'from-amber-900/40 via-yellow-800/40 to-orange-900/40'
                                  : 'from-amber-200/60 via-yellow-200/60 to-orange-200/60'
                              }`} >
                              <LazyImage 
                                src={block.customImage}
                                alt={language === 'pl' ? block.title : block.titleEn}
                                width={400}
                                height={320}
                                className="w-full object-contain"
                              />
                              <div className={`absolute inset-0 bg-gradient-to-br opacity-20 ${
                                theme === 'dark'
                                  ? 'from-amber-900/40 via-yellow-800/40 to-orange-900/40'
                                  : 'from-amber-200/60 via-yellow-200/60 to-orange-200/60'
                              }`} />
                            </div>
                          </div>
                        ) : (
                          <div className={`h-64 sm:h-80 bg-gradient-to-br ${
                            theme === 'dark'
                              ? 'from-amber-900/40 via-yellow-800/40 to-orange-900/40'
                              : 'from-amber-200/60 via-yellow-200/60 to-orange-200/60'
                          } relative`}>
                            <motion.div
                              className="absolute inset-0 opacity-30"
                              animate={{
                                background: [
                                  "radial-gradient(circle at 20% 80%, rgba(251, 191, 36, 0.3) 0%, transparent 50%)",
                                  "radial-gradient(circle at 80% 20%, rgba(251, 191, 36, 0.3) 0%, transparent 50%)",
                                  "radial-gradient(circle at 40% 40%, rgba(251, 191, 36, 0.3) 0%, transparent 50%)"
                                ]
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }}
                            />

                            <div className="relative h-full flex items-center justify-center group">
                              <MouseParallax strength={0.1} className="relative">
                                <motion.div
                                  className="absolute inset-0 rounded-full"
                                  animate={{
                                    boxShadow: [
                                      "0 0 20px rgba(251, 191, 36, 0.0)",
                                      "0 0 40px rgba(251, 191, 36, 0.3)",
                                      "0 0 20px rgba(251, 191, 36, 0.0)"
                                    ]
                                  }}
                                  transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                  }}
                                />
                                
                                <motion.div
                                  whileHover={{ 
                                    scale: 1.1,
                                    rotate: [0, -5, 5, 0]
                                  }}
                                  transition={{ 
                                    scale: { duration: 0.3 },
                                    rotate: { duration: 0.6, ease: "easeInOut" }
                                  }}
                                  className="relative z-10"
                                >
                                  <Icon className={`w-20 sm:w-24 h-20 sm:h-24 transition-all duration-500 ${
                                    theme === 'dark'
                                      ? 'text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]'
                                      : 'text-amber-600 drop-shadow-[0_0_15px_rgba(217,119,6,0.3)]'
                                  }`} />
                                </motion.div>

                                {[...Array(3)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 bg-amber-400/60 rounded-full"
                                    animate={{
                                      x: [0, 20, -20, 0],
                                      y: [0, -15, 10, 0],
                                      opacity: [0, 1, 1, 0]
                                    }}
                                    transition={{
                                      duration: 4,
                                      repeat: Infinity,
                                      delay: i * 1.3,
                                      ease: "easeInOut"
                                    }}
                                    style={{
                                      left: `${20 + i * 20}%`,
                                      top: `${30 + i * 15}%`
                                    }}
                                  />
                                ))}
                              </MouseParallax>

                              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                                theme === 'dark'
                                  ? 'from-amber-500/20 to-yellow-500/20'
                                  : 'from-amber-400/20 to-yellow-400/20'
                              }`} />
                            </div>
                          </div>
                        )}

                        <motion.div
                          className="h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </MouseParallax>
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

const FeatureCard = React.memo<{
  feature: typeof features[0];
  index: number;
  onDetailsClick: (feature: typeof features[0]) => void;
}>(({ feature, index, onDetailsClick }) => {
  const { theme } = React.useContext(ThemeContext);
  const { language } = React.useContext(LanguageContext);
  const t = translations[language];
  
  return (
    <motion.div
      initial={{ opacity: 0.8, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="neuromorphic-inset p-8 sm:p-10 rounded-3xl group hover:shadow-amber-500/20 transition-all duration-500 relative overflow-hidden h-full"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />
      <div className="relative z-10 flex flex-col sm:flex-row sm:gap-10 h-full">
        
        <div className="flex-shrink-0 self-center py-8">
          <motion.div 
            className="neuromorphic w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden group-hover:shadow-amber-500/30 transition-all duration-500 relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {feature.customImage ? (
              <>
                <LazyImage
                  src={feature.customImage}
                  alt={language === 'pl' ? feature.title : feature.titleEn}
                  width={208}
                  height={208}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </>
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${feature.color} flex items-center justify-center relative`}>
                <feature.icon className="w-20 h-20 text-white/90 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            )}
            
            <motion.div
              className="absolute inset-0 border-2 border-amber-400/0 rounded-3xl group-hover:border-amber-400/50 transition-all duration-500"
              whileHover={{
                boxShadow: "0 0 30px rgba(251, 191, 36, 0.3)"
              }}
            />
          </motion.div>
        </div>

        <div className="flex-1 flex flex-col">
          <motion.h3 
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 font-heading group-hover:text-amber-100 transition-all duration-300 leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {language === 'pl' ? feature.title : feature.titleEn}
          </motion.h3>

          <p className={`mb-8 font-body leading-relaxed text-lg sm:text-xl transition-colors duration-300 ${
            theme === 'dark'
              ? 'text-gray-200 group-hover:text-gray-100'
              : 'text-gray-700 group-hover:text-gray-600'
          }`}>
            {language === 'pl' ? feature.description : feature.descriptionEn}
          </p>

          <div className="mt-auto pt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PremiumButton
                onClick={() => onDetailsClick(feature)}
                variant="ghost"
                size="md"
                className={`w-full sm:w-auto group-hover:bg-amber-500/20 transition-all duration-300 border border-transparent group-hover:border-amber-400/30 ${
                  theme === 'dark' 
                    ? 'hover:text-amber-200' 
                    : 'hover:text-amber-600'
                }`}
              >
                {t.features.seeDetails}
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              </PremiumButton>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute top-6 right-6 w-3 h-3">
        <motion.div
          className="w-full h-full bg-amber-400/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      <div className="absolute bottom-6 left-6 w-2 h-2">
        <motion.div
          className="w-full h-full bg-amber-400/30 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </motion.div>
  );
});

FeatureCard.displayName = 'FeatureCard';

const FeaturesSection = React.memo<{ onFeatureClick: (feature: typeof features[0]) => void }>(({ onFeatureClick }) => {
  const { theme } = React.useContext(ThemeContext);
  const { language } = React.useContext(LanguageContext);
  const t = translations[language];
  
  return (
    <section id="features" className="py-20 sm:py-28 section-bg relative overflow-hidden">
      <div className="absolute inset-0">
        
        <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] ${
          theme === 'light' ? 'opacity-30' : ''
        }`} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 1, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-heading ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {t.features.title}
          </h2>
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto font-body ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}>
            {t.features.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10 lg:gap-12">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title} 
              feature={feature} 
              index={index} 
              onDetailsClick={onFeatureClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

FeaturesSection.displayName = 'FeaturesSection';

const ContactSection = React.memo<{ showToast: (message: string) => void }>(({ showToast }) => {
  const { theme } = React.useContext(ThemeContext);
  const { language } = React.useContext(LanguageContext);
  const t = translations[language];
  
  const [formData, setFormData] = useState({
    email: "",
    organization: "",
    phone: "",
    companySize: "wole-nie-mowic",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    message: ""
  });

  const validateEmail = useCallback((email: string) => {
    if (email.trim() === "") return "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : t.contact.emailRequired;
  }, [t.contact.emailRequired]);

  const validateMessage = useCallback((message: string) => {
    const trimmed = message.trim();
    if (trimmed === "") return t.contact.messageRequired;
    if (trimmed.length < 10) return t.contact.messageMin;
    if (trimmed.length > 10000) return t.contact.messageMax;
    return "";
  }, [t.contact.messageRequired, t.contact.messageMin, t.contact.messageMax]);

  const validateForm = useCallback(() => {
    const emailError = validateEmail(formData.email);
    const messageError = validateMessage(formData.message);
    
    setErrors({
      email: emailError,
      message: messageError
    });

    return emailError === "" && messageError === "";
  }, [formData.email, formData.message, validateEmail, validateMessage]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      showToast(t.contact.formError);
      return;
    }

    setIsSubmitting(true);
    
    const submitData = new FormData();
    submitData.append('email', formData.email);
    submitData.append('organization', formData.organization);
    submitData.append('phone', formData.phone);
    submitData.append('companySize', formData.companySize);
    submitData.append('message', formData.message);
    submitData.append('language', language);

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        body: submitData
      });

      if (response.ok) {
        showToast(t.contact.messageSent);
        setFormData({ email: "", phone: "", organization: "", companySize: "wole-nie-mowic", message: "" });
        setErrors({ email: "", message: "" });
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(error);
      setFormData({ email: "", phone: "", organization: "", companySize: "wole-nie-mowic", message: "" });
      setErrors({ email: "", message: "" });
    }
    
    setIsSubmitting(false);
  }, [showToast, validateForm, formData, language, t.contact.messageSent, t.contact.formError]);

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'email') {
      setErrors(prev => ({ ...prev, email: validateEmail(value) }));
    } else if (field === 'message') {
      setErrors(prev => ({ ...prev, message: validateMessage(value) }));
    }
  }, [validateEmail, validateMessage]);

  const isFormValid = useMemo(() => {
    return errors.email === "" && errors.message === "" && formData.message.trim() !== "";
  }, [errors, formData.message]);

  return (
    <section id="contact" className="py-20 sm:py-28 section-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0.8, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-heading ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {t.contact.title}
          </h2>
          <p className={`text-lg sm:text-xl max-w-4xl mx-auto font-body leading-relaxed ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}>
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-stretch gap-12 lg:gap-16">
            


          <motion.div
            initial={{ opacity: 0.8, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="neuromorphic w-full md:w-1/2 p-8 sm:p-10 rounded-3xl flex flex-col justify-center" 
          >
            <h3 className={`text-2xl sm:text-3xl font-bold mb-8 font-heading flex items-center ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <Mail className="w-8 h-8 text-amber-400 mr-4" />
              {t.contact.sendMessage}
            </h3>
            <div className="space-y-8">
              <div>
                <label className={`block text-base font-medium mb-3 font-body ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {t.contact.email} *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`neuromorphic-inset w-full px-5 py-4 bg-transparent rounded-xl focus:outline-none transition-all duration-200 font-body text-base sm:text-lg ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                  } ${
                    errors.email 
                      ? 'focus:ring-2 focus:ring-red-500 border-red-500/50' 
                      : formData.email && !errors.email && formData.email.trim() !== ''
                        ? 'focus:ring-2 focus:ring-green-500 border-green-500/50'
                        : 'focus:ring-2 focus:ring-amber-500'
                  }`}
                  placeholder="twoj@email.com"
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0.8, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2 font-body flex items-center"
                  >
                    <X className="w-4 h-4 mr-1" />
                    {errors.email}
                  </motion.p>
                )}
                {!errors.email && formData.email && formData.email.trim() !== '' && (
                  <motion.p
                    initial={{ opacity: 0.8, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-sm mt-2 font-body flex items-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {t.contact.emailValid}
                  </motion.p>
                )}
              </div>
              <div>
                <label className={`block text-base font-medium mb-3 font-body ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {t.contact.organization}
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  className={`neuromorphic-inset w-full px-5 py-4 bg-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200 font-body text-base sm:text-lg ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                  }`}
                  placeholder="NIP lub nazwa firmy"
                />
              </div>
              <div>
                <label className={`block text-base font-medium mb-3 font-body ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {t.contact.phone}
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`neuromorphic-inset w-full px-5 py-4 bg-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200 font-body text-base sm:text-lg ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                  }`}
                  placeholder="Telefon kontaktowy"
                />
              </div>
              <div>
                <label className={`block text-base font-medium mb-3 font-body ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {t.contact.companySize}
                </label>
                <CustomDropdown
                  value={formData.companySize}
                  onChange={(value) => handleInputChange('companySize', value)}
                  options={companySizeOptions}
                  placeholder="Wybierz wielkość firmy"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className={`text-base font-medium font-body ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {t.contact.message} *
                  </label>
                  <span className={`text-sm font-body ${
                    formData.message.length > 1000 
                      ? 'text-red-400' 
                      : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {formData.message.length}/1000
                  </span>
                </div>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={5}
                  className={`neuromorphic-inset w-full px-5 py-4 bg-transparent rounded-xl resize-none focus:outline-none transition-all duration-200 font-body text-base sm:text-lg ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                  } ${
                    errors.message 
                      ? 'focus:ring-2 focus:ring-red-500 border-red-500/50' 
                      : 'focus:ring-2 focus:ring-amber-500'
                  }`}
                  placeholder={t.contact.messagePlaceholder}
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0.8, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2 font-body flex items-center"
                  >
                    <X className="w-4 h-4 mr-1" />
                    {errors.message}
                  </motion.p>
                )}
                {!errors.message && formData.message.trim() && formData.message.length >= 10 && (
                  <motion.p
                    initial={{ opacity: 0.8, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-sm mt-2 font-body flex items-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {t.contact.messageValid}
                  </motion.p>
                )}
              </div>
              <PremiumButton
                onClick={handleSubmit}
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting || !isFormValid}
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
                    {t.contact.sending}
                  </>
                ) : (
                  <>
                    {!isFormValid ? t.contact.fillRequired : t.contact.sendMessageBtn}
                    {isFormValid && <ArrowRight className="w-5 h-5 ml-2" />}
                  </>
                )}
              </PremiumButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';

const Footer = React.memo(() => {
  const { theme } = React.useContext(ThemeContext);
  const { language } = React.useContext(LanguageContext);
  const t = translations[language];

  const legalList = useMemo(() => [
    t.footer.cookies
  ], [t.footer.cookies]);

  return (
    <footer className={`border-t py-16 ${
      theme === 'dark' 
        ? 'bg-black border-gray-700' 
        : 'bg-gray-50 border-gray-300'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <p className={`text-base font-body text-center md:text-left ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {t.footer.copyright}
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-base">
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

export default function SecurHubLanding() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [language, setLanguage] = useState<'pl' | 'en'>('pl');
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverHero, setIsOverHero] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificates[0] | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const { scrollY } = useScroll();

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'pl' ? 'en' : 'pl');
  }, []);

  const throttledScrollHandler = useMemo(
    () => throttle((latest: number) => {
      setIsScrolled(latest > 50);
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        const heroHeight = heroElement.offsetHeight;
        setIsOverHero(latest < heroHeight - 100);
      }
    }, 100),
    []
  );

  useEffect(() => {
    const unsubscribe = scrollY.onChange(throttledScrollHandler);
    return () => unsubscribe();
  }, [scrollY, throttledScrollHandler]);

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

  const handleCertificateClick = useCallback((certificate: typeof certificates[0]) => {
    setSelectedCertificate(certificate);
    setIsCertModalOpen(true);
  }, []);

  const handleFeatureClick = useCallback((feature: typeof features[0]) => {
    setSelectedFeature(feature);
    setIsFeatureModalOpen(true);
  }, []);

  const handleCloseCertModal = useCallback(() => {
    setIsCertModalOpen(false);
    setSelectedCertificate(null);
  }, []);

  const handleCloseFeatureModal = useCallback(() => {
    setIsFeatureModalOpen(false);
    setSelectedFeature(null);
  }, []);

  return (
    <MouseProvider>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
          <div className={`min-h-screen font-body overflow-x-hidden transition-colors duration-300 ${
            theme === 'dark' ? 'bg-black' : 'bg-gray-50'
          }`}>
            <NavigationBar 
              isScrolled={isScrolled}
              mobileNavActive={mobileNavActive}
              setMobileNavActive={setMobileNavActive}
              scrollToSection={scrollToSection}
              isOverHero={isOverHero}
            />
            <main>
              <HeroSection 
                scrollToSection={scrollToSection} 
                onCertificateClick={handleCertificateClick}
              />
              <AboutSection />
              <CyberStatsSection />
              <FeaturesSection onFeatureClick={handleFeatureClick} />
              <ContactSection showToast={showToast} />
            </main>
            <Footer />
            <CertificateModal
              certificate={selectedCertificate}
              isOpen={isCertModalOpen}
              onClose={handleCloseCertModal}
            />
            <FeatureModal
              feature={selectedFeature}
              isOpen={isFeatureModalOpen}
              onClose={handleCloseFeatureModal}
            />
            <AnimatePresence>
              {toastMessage && (
                <Toast message={toastMessage} onClose={handleCloseToast} />
              )}
            </AnimatePresence>
          </div>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </MouseProvider>
  );
}