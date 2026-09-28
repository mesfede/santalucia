/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Users, 
  BookOpen, 
  ExternalLink, 
  ChevronRight, 
  CheckCircle2,
  Send,
  X,
  Home,
  Images,
  ArrowRight,
  Heart,
  School,
  Layers,
  ChevronDown
} from 'lucide-react';

// Import transparent logo asset without background
import logoSantaLucia from './assets/logos/santalucia_logo-okok.png';

// Import intro video asset
import videoIntro from './assets/videos/santlucia_intro.mp4';

// Import school photos
import imgInicial01 from './assets/images/nivel_inicial_01.png';
import imgInicial02 from './assets/images/nivel_inicial_02.png';
import imgInicial03 from './assets/images/nivel_inicial_03.png';
import imgPrimario01 from './assets/images/nivelprimario_01.png';
import imgPrimario02 from './assets/images/nivelprimario_02.png';
import imgSecundario01 from './assets/images/nivel_secundario (1).jpg';
import imgSecundario03 from './assets/images/nivel_secundario (3).jpg';
import imgSecundario05 from './assets/images/nivel_secundario_05.png';
import imgSecundario06 from './assets/images/nivel_secundario_06.png';

// Slide data restored with pre-title, highlight, lema in serif italic in yellow/amber, and description bajada
const heroSlides = [
  {
    title: 'Comunidad Educadora Parroquial',
    highlight: 'Santa Lucía de Tolosa',
    lema: '“Educar en Cristo, con una mirada de amor que nos transforme.”',
    description: 'Una escuela donde aprender es también convivir, crecer y construir comunidad junto a las familias.'
  },
  {
    title: 'Identidad y Valores',
    highlight: 'Aprender, convivir y crecer',
    lema: '“Caminamos y aprendemos juntos junto al compromiso de las familias.”',
    description: 'Una comunidad educativa que abraza y acompaña el desarrollo integral de cada estudiante.'
  },
  {
    title: 'Nuestra Misión',
    highlight: 'Educar en Cristo',
    lema: '“Educar en Cristo, con una mirada de amor que nos transforme.”',
    description: 'Niveles Inicial, Primario y Secundario con sólida formación académica, humana y cristiana.'
  },
  {
    title: 'Inscripciones Abiertas',
    highlight: 'Sumate a Nuestra Comunidad',
    lema: '“Te invitamos a ser parte de la Comunidad Educadora Parroquial Santa Lucía.”',
    description: 'Conocé nuestra propuesta pedagógica y solicitá información para el ciclo lectivo 2027.'
  }
];

const galleryPhotos = [
  { src: imgInicial01, alt: 'Nivel Inicial Santa Lucía' },
  { src: imgPrimario01, alt: 'Nivel Primario Santa Lucía' },
  { src: imgSecundario05, alt: 'Nivel Secundario Santa Lucía' },
  { src: imgInicial02, alt: 'Actividades Nivel Inicial' },
  { src: imgPrimario02, alt: 'Alumnos Nivel Primario' },
  { src: imgSecundario06, alt: 'Comunidad Nivel Secundario' },
  { src: imgInicial03, alt: 'Experiencias Nivel Inicial' },
  { src: imgSecundario01, alt: 'Jornadas Nivel Secundario' },
  { src: imgSecundario03, alt: 'Talleres Nivel Secundario' }
];

export default function App() {
  // Intro video states
  const [showIntro, setShowIntro] = useState(true);
  const [introEnded, setIntroEnded] = useState(false);
  const [introFadingOut, setIntroFadingOut] = useState(false);
  const introVideoRef = useRef<HTMLVideoElement>(null);

  const [inscriptionModalOpen, setInscriptionModalOpen] = useState(false);
  const [expandedImage, setExpandedImage] = useState<{ src: string; alt: string } | null>(null);
  const [activeSection, setActiveSection] = useState<'inicio' | 'institucional' | 'niveles' | 'galeria' | 'contacto'>('inicio');
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExpandedImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Header scroll detection with hysteresis and fixed height to completely eliminate trembling
  const [isScrolled, setIsScrolled] = useState(false);

  // Hero Carousel Slide with smooth transition key
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fallback timer for intro video if onEnded doesn't fire
  useEffect(() => {
    if (showIntro) {
      const fallbackTimer = setTimeout(() => {
        setIntroEnded(true);
      }, 6200);
      return () => clearTimeout(fallbackTimer);
    }
  }, [showIntro]);

  const handleEnterSite = () => {
    setIntroFadingOut(true);
    setTimeout(() => {
      setShowIntro(false);
      // Open inscription modal approx 10 seconds after entering the website
      setTimeout(() => {
        setInscriptionModalOpen(true);
      }, 10000);
    }, 650);
  };

  // Scroll handler with hysteresis (triggers > 70px, resets < 25px) to prevent trembling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          setIsScrolled(prev => {
            if (!prev && y > 75) return true;
            if (prev && y < 25) return false;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Automatic slide rotation in hero with harmonic timing
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactFormSubmitted(true);
    setTimeout(() => {
      setContactFormSubmitted(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  const scrollToSection = (section: 'inicio' | 'institucional' | 'niveles' | 'galeria' | 'contacto') => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#930112] selection:text-white pb-20 md:pb-0">
      
      {/* INTRO ANIMATION SCREEN */}
      {/* Rule: Pure white background, video small, NO framing/border, NO mention of "intro", subtle enter button */}
      {showIntro && (
        <div 
          className={`fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-4 sm:p-6 transition-all duration-700 ease-out ${
            introFadingOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          <div className="flex flex-col items-center justify-center max-w-xl sm:max-w-2xl w-full">
            
            {/* Enlarged Video Animation without framing or borders */}
            <div className="w-full max-w-[480px] sm:max-w-[560px] md:max-w-[620px] overflow-hidden flex items-center justify-center bg-transparent">
              <video
                ref={introVideoRef}
                src={videoIntro}
                autoPlay
                playsInline
                muted
                onEnded={() => setIntroEnded(true)}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Ending Subtle Button & Text */}
            <div 
              className={`mt-6 sm:mt-8 text-center space-y-3.5 transition-all duration-700 ${
                introEnded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
              }`}
            >
              <p className="text-slate-800 font-serif italic text-base sm:text-xl">
                Conocé nuestra escuela
              </p>
              
              <button
                onClick={handleEnterSite}
                className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#930112] hover:bg-[#7a010f] text-white font-medium text-sm sm:text-base transition-all shadow-md shadow-[#930112]/20 active:scale-95 cursor-pointer group"
              >
                <span>Ingresar</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header / Navbar */}
      {/* Rule: Stable height container, no trembling/jitter, logo enlarged, centered with navigation */}
      <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-300 ${
        isScrolled ? 'shadow-md py-2 sm:py-2.5' : 'shadow-sm py-3 sm:py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Desktop: Enlarged Logo and Botonera centered together */}
          <div className="hidden md:flex items-center justify-center space-x-12 lg:space-x-16">
            <div 
              onClick={() => scrollToSection('inicio')}
              className="cursor-pointer transition-transform hover:scale-105"
              title="Comunidad Educadora Parroquial Santa Lucía"
            >
              <img 
                src={logoSantaLucia} 
                alt="Logo Colegio Santa Lucía" 
                className={`w-auto object-contain transition-all duration-300 ${
                  isScrolled ? 'h-20 lg:h-22' : 'h-24 sm:h-28 lg:h-32'
                }`}
              />
            </div>

            {/* Desktop Navigation Centered */}
            <nav className="flex items-center space-x-8 text-sm font-semibold tracking-wide">
              <button 
                onClick={() => scrollToSection('inicio')}
                className={`transition-colors py-2 cursor-pointer ${
                  activeSection === 'inicio' ? 'text-[#930112] border-b-2 border-[#930112]' : 'text-slate-700 hover:text-[#930112]'
                }`}
              >
                Inicio
              </button>
              <button 
                onClick={() => scrollToSection('institucional')}
                className={`transition-colors py-2 cursor-pointer ${
                  activeSection === 'institucional' ? 'text-[#930112] border-b-2 border-[#930112]' : 'text-slate-700 hover:text-[#930112]'
                }`}
              >
                Institucional
              </button>
              <button 
                onClick={() => scrollToSection('niveles')}
                className={`transition-colors py-2 cursor-pointer ${
                  activeSection === 'niveles' ? 'text-[#930112] border-b-2 border-[#930112]' : 'text-slate-700 hover:text-[#930112]'
                }`}
              >
                Niveles Educativos
              </button>
              <button 
                onClick={() => scrollToSection('galeria')}
                className={`transition-colors py-2 cursor-pointer ${
                  activeSection === 'galeria' ? 'text-[#930112] border-b-2 border-[#930112]' : 'text-slate-700 hover:text-[#930112]'
                }`}
              >
                Galería
              </button>
              <button 
                onClick={() => scrollToSection('contacto')}
                className={`transition-colors py-2 cursor-pointer ${
                  activeSection === 'contacto' ? 'text-[#930112] border-b-2 border-[#930112]' : 'text-slate-700 hover:text-[#930112]'
                }`}
              >
                Contacto
              </button>
            </nav>
          </div>

          {/* Mobile: Enlarged centered logo */}
          <div className="md:hidden flex items-center justify-center w-full py-1">
            <div 
              onClick={() => scrollToSection('inicio')}
              className="cursor-pointer"
            >
              <img 
                src={logoSantaLucia} 
                alt="Logo Colegio Santa Lucía" 
                className={`w-auto object-contain transition-all duration-300 ${
                  isScrolled ? 'h-18' : 'h-22'
                }`}
              />
            </div>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        
        {/* HERO SECTION with FULL WIDTH AND HEIGHT VIDEO */}
        {/* Rule: "Sumate a Nuestra Comunidad" and all headlines stay strictly in a single line.
            Restored pre-title, bold heading, lema in serif italic in yellow/amber, and description bajada. */}
        <section id="inicio" className="relative w-full h-[85vh] sm:h-[88vh] min-h-[540px] max-h-[880px] overflow-hidden flex items-center justify-center bg-slate-950">
          
          {/* Background Video */}
          <video 
            src="https://res.cloudinary.com/dq2zwjtyr/video/upload/v1790604500/videodesantalucia_b2jpnx.mp4"
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-90"
          />

          {/* Dark Overlay for contrast */}
          <div className="absolute inset-0 bg-slate-950/80 z-10" />

          {/* Hero Content with restored slide typography and single line headlines */}
          <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-6">
            
            <div 
              key={currentSlide}
              className="animate-slide-blur min-h-[200px] sm:min-h-[220px] flex flex-col items-center justify-center"
            >
              {/* Category / Pre-title */}
              <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-slate-300 block mb-2">
                {heroSlides[currentSlide].title}
              </span>

              {/* Main Heading: Strictly in a single line across all slides */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md sm:whitespace-nowrap max-w-full">
                {heroSlides[currentSlide].highlight}
              </h1>

              {/* Lema in serif italic in warm yellow/amber */}
              <p className="mt-4 text-base sm:text-xl font-serif italic text-amber-300 drop-shadow max-w-2xl mx-auto">
                {heroSlides[currentSlide].lema}
              </p>

              {/* Description / Bajada */}
              <p className="mt-3 text-sm sm:text-base text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
                {heroSlides[currentSlide].description}
              </p>
            </div>

            {/* Slide Indicators */}
            <div className="flex items-center justify-center space-x-2 pt-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === idx ? 'w-8 bg-[#930112]' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Hero CTAs: Only shown on Desktop/Tablet, hidden on Mobile to avoid repeating with bottom app bar */}
            <div className="hidden sm:flex items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setInscriptionModalOpen(true)}
                className="px-8 py-3.5 rounded-xl bg-[#025530] hover:bg-[#024426] text-white font-bold text-base transition-all shadow-xl shadow-[#025530]/40 flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
              >
                <span>Inscripción Ciclo Lectivo 2027</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('niveles')}
                className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-base transition-all border border-white/25 flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-slate-200" />
                <span>Niveles Educativos</span>
              </button>
            </div>

          </div>
        </section>

        {/* NIVELES EDUCATIVOS SECTION */}
        <section id="niveles" className="py-14 sm:py-20 bg-slate-100 border-b border-slate-200 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[#930112] font-bold text-xs tracking-wider uppercase">
                Propuesta Educativa
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Niveles Educativos
              </h2>
              <p className="text-slate-600 text-xs sm:text-base">
                Formación integral en cada ciclo escolar. Conocé los tres niveles de nuestra institución.
              </p>
            </div>

            {/* MOBILE COMPACT VIEW (< md): 3 Compact, touch-friendly cards requiring minimal scrolling */}
            <div className="md:hidden flex flex-col space-y-3">
              
              {/* Mobile Card: Nivel Inicial */}
              <div 
                className="relative overflow-hidden rounded-2xl bg-[#930112] text-white p-4 shadow-md flex items-center justify-between cursor-default"
              >
                <img 
                  src={imgInicial01} 
                  alt="Nivel Inicial" 
                  className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
                
                <div className="relative z-10 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded text-white">
                    Inicial
                  </span>
                  <h3 className="text-lg font-bold text-white">Nivel Inicial</h3>
                  <p className="text-slate-200 text-xs line-clamp-1">Afecto, juego y primeros aprendizajes en comunidad.</p>
                </div>
              </div>

              {/* Mobile Card: Nivel Primario */}
              <div 
                className="relative overflow-hidden rounded-2xl bg-[#025530] text-white p-4 shadow-md flex items-center justify-between cursor-default"
              >
                <img 
                  src={imgPrimario01} 
                  alt="Nivel Primario" 
                  className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
                
                <div className="relative z-10 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded text-white">
                    Primario
                  </span>
                  <h3 className="text-lg font-bold text-white">Nivel Primario</h3>
                  <p className="text-slate-200 text-xs line-clamp-1">Formación académica sólida y valores humanos.</p>
                </div>
              </div>

              {/* Mobile Card: Nivel Secundario */}
              <div 
                className="relative overflow-hidden rounded-2xl bg-[#334155] text-white p-4 shadow-md flex items-center justify-between cursor-default"
              >
                <img 
                  src={imgSecundario05} 
                  alt="Nivel Secundario" 
                  className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
                
                <div className="relative z-10 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded text-white">
                    Secundario
                  </span>
                  <h3 className="text-lg font-bold text-white">Nivel Secundario</h3>
                  <p className="text-slate-200 text-xs line-clamp-1">Preparación superior y compromiso social cristiano.</p>
                </div>
              </div>

            </div>

            {/* DESKTOP VIEW (>= md): Full 460px cards with hover reveal */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
              
              {/* CARD 1: NIVEL INICIAL - ROJO / BORDÓ */}
              <div className="group relative overflow-hidden rounded-2xl h-[460px] shadow-lg transition-all duration-500 hover:shadow-2xl flex flex-col justify-end p-7 sm:p-8 cursor-default bg-[#930112]">
                <img 
                  src={imgInicial01} 
                  alt="Nivel Inicial Santa Lucía" 
                  className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen transition-all duration-700 ease-out group-hover:opacity-100 group-hover:mix-blend-normal group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 opacity-60 group-hover:opacity-90" />
                
                <div className="relative z-10 space-y-3 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-md text-white">
                      Nivel Inicial
                    </span>
                    <span className="text-xs font-semibold text-amber-300">
                      Ciclo 2027
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    Nivel Inicial
                  </h3>

                  <div className="overflow-hidden transition-all duration-500 ease-in-out max-h-36 opacity-100 group-hover:max-h-0 group-hover:opacity-0 group-hover:translate-y-2">
                    <p className="text-slate-100 text-sm leading-relaxed">
                      Un espacio de afecto, juego y primeros descubrimientos donde los más pequeños aprenden a convivir y desarrollarse en comunidad.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-white/20 text-xs sm:text-sm font-medium text-white/90">
                    <span>Ciclo Lectivo 2027</span>
                    <span className="text-xs text-amber-300 font-semibold">Comunidad Educadora</span>
                  </div>
                </div>
              </div>

              {/* CARD 2: NIVEL PRIMARIO - VERDE */}
              <div className="group relative overflow-hidden rounded-2xl h-[460px] shadow-lg transition-all duration-500 hover:shadow-2xl flex flex-col justify-end p-7 sm:p-8 cursor-default bg-[#025530]">
                <img 
                  src={imgPrimario01} 
                  alt="Nivel Primario Santa Lucía" 
                  className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen transition-all duration-700 ease-out group-hover:opacity-100 group-hover:mix-blend-normal group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 opacity-60 group-hover:opacity-90" />

                <div className="relative z-10 space-y-3 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-md text-white">
                      Nivel Primario
                    </span>
                    <span className="text-xs font-semibold text-emerald-200">
                      Ciclo 2027
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    Nivel Primario
                  </h3>

                  <div className="overflow-hidden transition-all duration-500 ease-in-out max-h-36 opacity-100 group-hover:max-h-0 group-hover:opacity-0 group-hover:translate-y-2">
                    <p className="text-slate-100 text-sm leading-relaxed">
                      Formación académica sólida y valores humanos, estimulando la curiosidad, el compañerismo y el crecimiento integral de cada alumno.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-white/20 text-xs sm:text-sm font-medium text-white/90">
                    <span>Ciclo Lectivo 2027</span>
                    <span className="text-xs text-emerald-300 font-semibold">Comunidad Educadora</span>
                  </div>
                </div>
              </div>

              {/* CARD 3: NIVEL SECUNDARIO - GRIS */}
              <div className="group relative overflow-hidden rounded-2xl h-[460px] shadow-lg transition-all duration-500 hover:shadow-2xl flex flex-col justify-end p-7 sm:p-8 cursor-default bg-[#334155]">
                <img 
                  src={imgSecundario05} 
                  alt="Nivel Secundario Santa Lucía" 
                  className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen transition-all duration-700 ease-out group-hover:opacity-100 group-hover:mix-blend-normal group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 opacity-60 group-hover:opacity-90" />

                <div className="relative z-10 space-y-3 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-md text-white">
                      Nivel Secundario
                    </span>
                    <span className="text-xs font-semibold text-slate-300">
                      Ciclo 2027
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    Nivel Secundario
                  </h3>

                  <div className="overflow-hidden transition-all duration-500 ease-in-out max-h-36 opacity-100 group-hover:max-h-0 group-hover:opacity-0 group-hover:translate-y-2">
                    <p className="text-slate-100 text-sm leading-relaxed">
                      Preparación para los estudios superiores y el mundo laboral, afianzando la responsabilidad y el compromiso social cristiano.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-white/20 text-xs sm:text-sm font-medium text-white/90">
                    <span>Ciclo Lectivo 2027</span>
                    <span className="text-xs text-slate-300 font-semibold">Comunidad Educadora</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* GALERÍA DE IMÁGENES ALINEADA Y SIN MARCOS */}
        <section id="galeria" className="py-16 sm:py-20 bg-white border-b border-slate-200 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[#025530] font-bold text-xs tracking-wider uppercase flex items-center justify-center space-x-1">
                <Images className="w-4 h-4 mr-1" />
                <span>Vida Escolar</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Nuestra Escuela en Imágenes
              </h2>
              <p className="text-slate-600 text-xs sm:text-base">
                Momentos, proyectos y encuentros que dan vida a la comunidad educativa en Tolosa. Hacé doble clic en una foto para ampliarla.
              </p>
            </div>

            {/* Seamless Carousel without outer border/frame, with soft lateral gradient masks */}
            <div className="relative overflow-hidden w-full py-2">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

              <div className="animate-carousel-slow flex space-x-4 px-2">
                {galleryPhotos.map((item, index) => (
                  <div 
                    key={`gal-c1-${index}`} 
                    onDoubleClick={() => setExpandedImage({ src: item.src, alt: item.alt })}
                    title="Doble clic para ampliar imagen"
                    className="w-64 sm:w-72 h-44 sm:h-52 shrink-0 rounded-2xl overflow-hidden shadow-sm bg-slate-100 group transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-zoom-in select-none"
                  >
                    <img 
                      src={item.src} 
                      alt={item.alt} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none" 
                    />
                  </div>
                ))}

                {galleryPhotos.map((item, index) => (
                  <div 
                    key={`gal-c2-${index}`} 
                    onDoubleClick={() => setExpandedImage({ src: item.src, alt: item.alt })}
                    title="Doble clic para ampliar imagen"
                    className="w-64 sm:w-72 h-44 sm:h-52 shrink-0 rounded-2xl overflow-hidden shadow-sm bg-slate-100 group transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-zoom-in select-none"
                  >
                    <img 
                      src={item.src} 
                      alt={item.alt} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none" 
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SECCIÓN INSTITUCIONAL: TÍTULO ARRIBA, FOTO ÚNICA SIN TEXTO ALINEADA CON LAS ETIQUETAS */}
        {/* Rule: "las fotos que pusiste tiene que aparecer una sola, sin texto tiene que arrancar donde arrancan las etiquetas no el texto del titulo y terminar conde termina la eqtiqueta ultima 'arraigo en tolosa' ese alto de las dos etiquetas tiene que tener." */}
        <section id="institucional" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            
            {/* Title & Introduction Block positioned clearly above the cards */}
            <div>
              <span className="text-[#025530] font-bold text-xs tracking-wider uppercase">
                Identidad y Comunidad
              </span>
              
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-1">
                Somos la Comunidad Educadora Parroquial Santa Lucía de Tolosa
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-2 max-w-3xl">
                En este espacio compartiremos la vida de nuestra escuela, sus proyectos y los valores que nos guían. ¡Bienvenidos!
              </p>
            </div>

            {/* Row: 4 Cards on Left, Single Photo on Right starting & ending exactly at the cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch pt-2">
              
              {/* Left Column: 4 Interactive Cards (2x2) */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Card 1: Caminar y aprender juntos */}
                <div className="group p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-rose-50/70 hover:border-rose-200 cursor-default flex flex-col justify-center min-h-[120px]">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#930112]/10 flex items-center justify-center text-[#930112] transition-transform duration-300 group-hover:scale-105">
                      <Users className="w-7 h-7 stroke-[1.75]" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                      Caminar y aprender juntos
                    </h3>
                  </div>
                  <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-300 ease-out group-hover:max-h-28 group-hover:opacity-100 group-hover:pt-3">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Porque somos comunidad, porque caminamos y aprendemos juntos junto al valioso compromiso de las familias.
                    </p>
                  </div>
                </div>

                {/* Card 2: Educar en Cristo */}
                <div className="group p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-emerald-50/70 hover:border-emerald-200 cursor-default flex flex-col justify-center min-h-[120px]">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#025530]/10 flex items-center justify-center text-[#025530] transition-transform duration-300 group-hover:scale-105">
                      <Heart className="w-7 h-7 stroke-[1.75]" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                      Educar en Cristo
                    </h3>
                  </div>
                  <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-300 ease-out group-hover:max-h-28 group-hover:opacity-100 group-hover:pt-3">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Con una mirada de amor que nos transforme y guíe cada paso de nuestro crecimiento educativo.
                    </p>
                  </div>
                </div>

                {/* Card 3: Continuidad Pedagógica */}
                <div className="group p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-amber-50/70 hover:border-amber-200 cursor-default flex flex-col justify-center min-h-[120px]">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 transition-transform duration-300 group-hover:scale-105">
                      <Layers className="w-7 h-7 stroke-[1.75]" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                      Continuidad Pedagógica
                    </h3>
                  </div>
                  <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-300 ease-out group-hover:max-h-28 group-hover:opacity-100 group-hover:pt-3">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Articulación constante entre Inicial, Primario y Secundario, asegurando una trayectoria escolar cuidada.
                    </p>
                  </div>
                </div>

                {/* Card 4: Arraigo en Tolosa */}
                <div className="group p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-sky-50/70 hover:border-sky-200 cursor-default flex flex-col justify-center min-h-[120px]">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-700 transition-transform duration-300 group-hover:scale-105">
                      <School className="w-7 h-7 stroke-[1.75]" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                      Arraigo en Tolosa
                    </h3>
                  </div>
                  <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-300 ease-out group-hover:max-h-28 group-hover:opacity-100 group-hover:pt-3">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Un espacio de referencia e identidad local, abierto al barrio y en constante diálogo con las familias de La Plata.
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Column: Single Photo without text, perfectly matched in height with the 4 cards */}
              <div className="lg:col-span-5 flex">
                <div className="w-full h-full min-h-[320px] rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-white">
                  <img 
                    src={imgSecundario06} 
                    alt="Comunidad Educadora Parroquial Santa Lucía" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                  />
                </div>
              </div>

            </div>

            <div className="pt-1 text-slate-700 font-medium text-xs sm:text-sm">
              🏫 Te invitamos a ser parte de nuestra Comunidad Educadora Parroquial Santa Lucía.
            </div>

          </div>
        </section>

        {/* CONTACTO & UBICACIÓN (ADAPTADO A MÓVIL Y DESKTOP) */}
        <section id="contacto" className="py-14 sm:py-20 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              
              <div className="space-y-5">
                <span className="text-[#930112] font-bold text-xs tracking-wider uppercase">
                  Ubicación y Contacto
                </span>
                
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Comunicate con Nuestra Institución
                </h2>

                <p className="text-slate-600 text-xs sm:text-base">
                  Estamos a tu disposición para brindarte asesoramiento sobre inscripciones y resolver cualquier inquietud de tu familia.
                </p>

                <div className="space-y-3 pt-1">
                  <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#930112] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">Dirección Institucional</h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5"># 5 N°927 e/ 522 y 523, Tolosa (CP 1900)</p>
                      <p className="text-[11px] sm:text-xs text-slate-500">La Plata, Provincia de Buenos Aires</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#025530] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">Teléfono</h3>
                      <p className="text-sm sm:text-base font-semibold text-slate-800 mt-0.5">4820250</p>
                      <p className="text-[11px] sm:text-xs text-slate-500">Línea directa de administración escolar</p>
                    </div>
                  </div>
                </div>

                {/* Google Maps Embed iframe with confirmed address */}
                <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 h-52 sm:h-60 bg-slate-100">
                  <iframe
                    title="Ubicación Comunidad Educadora Parroquial Santa Lucía"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://maps.google.com/maps?q=Calle%205%20927,%20Tolosa,%20La%20Plata&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  />
                </div>
              </div>

              {/* Contact Form - Responsive and mobile friendly */}
              <div className="bg-slate-50 p-5 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
                <form onSubmit={handleContactSubmit} className="space-y-3.5">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Envianos tu Consulta</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Completá el formulario y nos contactaremos para asistirte.
                    </p>
                  </div>
                  
                  {contactFormSubmitted ? (
                    <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-2">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                      <p className="font-bold text-base sm:text-lg">¡Mensaje enviado con éxito!</p>
                      <p className="text-xs text-emerald-700">Muchas gracias por comunicarte con la Comunidad Educadora Parroquial Santa Lucía. Responderemos a la brevedad.</p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Nombre y Apellido
                        </label>
                        <input 
                          type="text" 
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          placeholder="Ej. María González"
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#930112]" 
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Correo Electrónico
                        </label>
                        <input 
                          type="email" 
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          placeholder="ejemplo@correo.com"
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#930112]" 
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Mensaje o Consulta
                        </label>
                        <textarea 
                          rows={3}
                          required
                          value={contactForm.message}
                          onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                          placeholder="Indicanos tu duda sobre niveles educativos, vacantes, trámites..."
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#930112] resize-none"
                        ></textarea>
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-3 px-6 rounded-xl bg-[#930112] hover:bg-[#7a010f] text-white font-bold text-sm transition-all shadow-md shadow-[#930112]/20 flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
                      >
                        <Send className="w-4 h-4" />
                        <span>Enviar Mensaje</span>
                      </button>
                    </>
                  )}
                </form>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* FOOTER INSTITUCIONAL */}
      {/* Rule: Logo in pure 100% white single-ink (brightness-0 invert), pure white text, fully adapted to mobile */}
      <footer className="bg-slate-900 text-white py-12 sm:py-14 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-center md:text-left">
            
            {/* Logo in single ink pure white with white typography */}
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <img 
                src={logoSantaLucia} 
                alt="Logo Colegio Santa Lucía" 
                className="h-16 sm:h-20 w-auto object-contain filter brightness-0 invert drop-shadow-sm" 
              />
              <div>
                <span className="font-bold text-white text-base sm:text-lg block leading-tight">
                  Comunidad Educadora Parroquial Santa Lucía
                </span>
                <span className="text-xs text-slate-300">Tolosa, La Plata, Buenos Aires</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden sm:flex items-center space-x-6 text-sm text-slate-300 font-medium">
              <button onClick={() => scrollToSection('inicio')} className="hover:text-white transition-colors cursor-pointer">Inicio</button>
              <button onClick={() => scrollToSection('institucional')} className="hover:text-white transition-colors cursor-pointer">Institucional</button>
              <button onClick={() => scrollToSection('niveles')} className="hover:text-white transition-colors cursor-pointer">Niveles</button>
              <button onClick={() => scrollToSection('galeria')} className="hover:text-white transition-colors cursor-pointer">Galería</button>
              <button onClick={() => scrollToSection('contacto')} className="hover:text-white transition-colors cursor-pointer">Contacto</button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 space-y-2 sm:space-y-0 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Comunidad Educadora Parroquial Santa Lucía de Tolosa. Todos los derechos reservados.</p>
            <p className="italic font-serif text-white">“Educar en Cristo, con una mirada de amor que nos transforme.”</p>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX MODAL: DOBLE CLIC EN GALERÍA */}
      {expandedImage && (
        <div 
          onClick={() => setExpandedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200 cursor-zoom-out"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center justify-center cursor-default"
          >
            {/* Close Button */}
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute -top-12 right-0 sm:top-2 sm:right-2 z-20 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-colors cursor-pointer"
              title="Cerrar ampliación (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Expanded Image Container */}
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/15 max-h-[80vh] flex items-center justify-center">
              <img
                src={expandedImage.src}
                alt={expandedImage.alt}
                className="max-h-[80vh] w-auto max-w-full object-contain select-none"
              />
            </div>
            
            {/* Caption */}
            <div className="mt-3.5 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/90 text-xs sm:text-sm font-medium text-center">
              {expandedImage.alt}
            </div>
          </div>
        </div>
      )}

      {/* POPUP / MODAL: INSCRIPCIÓN CICLO LECTIVO 2027 */}
      {inscriptionModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/45 backdrop-blur-[2px] p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-sm sm:max-w-md w-full overflow-hidden shadow-2xl relative border border-slate-200/90 my-auto animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setInscriptionModalOpen(false)}
              className="absolute top-3 right-3 z-30 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white transition-colors cursor-pointer"
              title="Cerrar ventana"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Popup Image with Transparent Logo overlay */}
            <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-slate-900">
              <img 
                src={imgPrimario01} 
                alt="Inscripciones Santa Lucía 2027" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              
              {/* Logo & Title on image */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center space-x-3 text-white">
                <img 
                  src={logoSantaLucia} 
                  alt="Logo Santa Lucía" 
                  className="h-12 w-auto object-contain filter brightness-0 invert drop-shadow" 
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                    Comunidad Educadora
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold tracking-tight leading-tight">
                    Inscripción Ciclo Lectivo 2027
                  </h3>
                </div>
              </div>
            </div>

            {/* Compact Body */}
            <div className="p-5 sm:p-6 space-y-4">
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-center">
                Te invitamos a ser parte de nuestra comunidad. Inscripciones abiertas para <strong className="text-slate-800">Nivel Inicial, Primario y Secundario</strong>.
              </p>

              {/* Action Button: Inscribirse in Bordó */}
              <div className="pt-1">
                <a 
                  href="#formulario-google-pendiente" 
                  onClick={(e) => {
                    e.preventDefault();
                    alert("¡Gracias por tu interés! El enlace directo al formulario oficial de inscripciones será incorporado en breve.");
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#930112] hover:bg-[#7a010f] text-white font-bold text-sm text-center transition-all shadow-md shadow-[#930112]/20 flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
                >
                  <span>Inscribirse</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MOBILE APP-LIKE BOTTOM NAVIGATION BAR */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-2xl px-2 py-2 pb-safe">
        <div className="grid grid-cols-5 gap-1 items-center">
          
          {/* Button: Inicio */}
          <button
            onClick={() => scrollToSection('inicio')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
              activeSection === 'inicio' ? 'text-[#930112] font-bold bg-[#930112]/10' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] mt-1 tracking-tight">Inicio</span>
          </button>

          {/* Button: Institucional */}
          <button
            onClick={() => scrollToSection('institucional')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
              activeSection === 'institucional' ? 'text-[#930112] font-bold bg-[#930112]/10' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px] mt-1 tracking-tight">Nosotros</span>
          </button>

          {/* Button: INSCRIPCIONES */}
          <button
            onClick={() => setInscriptionModalOpen(true)}
            className="flex flex-col items-center justify-center -mt-5 py-2 px-1 rounded-2xl bg-[#025530] text-white shadow-lg shadow-[#025530]/40 transition-transform active:scale-90 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-0.5">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider">Inscribirse</span>
          </button>

          {/* Button: Niveles */}
          <button
            onClick={() => scrollToSection('niveles')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
              activeSection === 'niveles' ? 'text-[#930112] font-bold bg-[#930112]/10' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] mt-1 tracking-tight">Niveles</span>
          </button>

          {/* Button: Contacto */}
          <button
            onClick={() => scrollToSection('contacto')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
              activeSection === 'contacto' ? 'text-[#930112] font-bold bg-[#930112]/10' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Phone className="w-5 h-5" />
            <span className="text-[10px] mt-1 tracking-tight">Contacto</span>
          </button>

        </div>
      </div>

    </div>
  );
}
