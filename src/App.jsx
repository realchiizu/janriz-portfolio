import React, { useState, useEffect, useRef } from 'react';
import { inject } from '@vercel/analytics';
import { 
  Github, 
  Linkedin, 
  User,
  FileText,
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Code2, 
  Zap, 
  Layout, 
  Smartphone,
  Server,
  Terminal,
  Cpu,
  Globe,
  Camera,
  ChartBarBig,
  Menu,
  X,
  CheckCircle2, 
  AlertCircle,
  Briefcase,
  GitBranch,
  Layers,
  Kanban,
  LineChart,
  FileCode2,
  Hexagon,
  Database,
  Figma,
  MonitorSmartphone,
  GraduationCap,
  Users,
  Palette,
  Presentation,
  ListChecks,
  Projector,
  Cloud,
  LayoutDashboard, 
  Network,
  ExternalLink,        
  Wind       
} from 'lucide-react';

inject();

const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

  
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 100px; /* Offset for the fixed header */
  }

  body {
    font-family: 'Poppins', sans-serif;
    overflow-x: hidden;
  }

  /* Marquee Animation */
  .marquee-container {
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  }
  
  .marquee-content {
    display: flex;
    gap: 1.5rem;
    animation: scroll 25s linear infinite;
    width: max-content;
  }
  
  .marquee-content:hover {
    animation-play-state: paused;
  }

  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* Fade Up Animation Class */
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
  }
  
  .reveal.active {
    opacity: 1;
    transform: translateY(0);
  }

  /* Soft Gradient Pulse */
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.1); }
  }
  
  .animate-pulse-glow {
    animation: pulse-glow 4s ease-in-out infinite;
  }
`;

/* --- Reusable Components --- */
const StatusModal = ({ isOpen, onClose, type, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center">
        <h2 className={`text-lg font-bold ${type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{title}</h2>
        <p className="mt-2 text-gray-700">{message}</p>
        <button 
          onClick={onClose} 
          className="mt-4 bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};


const RevealOnScroll = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    }, { threshold: 0.1 }); 

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div ref={domRef} className={`reveal ${isVisible ? 'active' : ''} ${className}`}>
      {children}
    </div>
  );
};

const SkillCard = ({ icon: Icon, title }) => (
  <div className="flex flex-col items-center justify-center p-6 bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-2xl hover:border-pink-500 hover:bg-neutral-800 transition-all duration-300 hover:-translate-y-2 group cursor-pointer">
    <Icon className="w-10 h-10 text-white group-hover:text-pink-400 mb-3 transition-colors" />
    <span className="text-white font-medium text-sm">{title}</span>
  </div>
);

const ProjectCard = ({ title, type, year, tools, images, description, link }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = (e) => {
    e.preventDefault();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group h-full flex flex-col border border-neutral-100">
      <div className="h-52 overflow-hidden relative bg-gray-100">
        <img 
          src={images[currentImage]} 
          alt={`${title} view ${currentImage + 1}`} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
        />
        
        {/* Overlay Controls */}
        <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
          <button 
            onClick={prevImage}
            className="bg-white/90 p-1.5 rounded-full shadow-md text-neutral-800 hover:text-pink-500 transition-colors backdrop-blur-sm"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={nextImage}
            className="bg-white/90 p-1.5 rounded-full shadow-md text-neutral-800 hover:text-pink-500 transition-colors backdrop-blur-sm"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
           {images.map((_, idx) => (
             <div 
               key={idx} 
               className={`w-1.5 h-1.5 rounded-full shadow-sm transition-all ${idx === currentImage ? 'bg-white w-3' : 'bg-white/50'}`} 
             />
           ))}
        </div>
      </div>
      
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
           <h3 className="font-bold text-lg text-neutral-900 leading-tight">{title}</h3>
           <span className="text-xs font-mono font-bold text-pink-500 bg-pink-50 px-2.5 py-1 rounded-md border border-pink-100">{year}</span>
        </div>
        <p className="text-pink-500 text-[10px] font-bold uppercase tracking-widest mb-4">{type}</p>
        
        <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">
          {description}
        </p>

        {link && (
          <div className="mb-6">
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-neutral-800 hover:bg-pink-500 px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer w-fit"
            >
              <ExternalLink size={14} /> View Live Project
            </a>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 pt-5 border-t border-gray-100 mt-auto">
           {tools.map((Tool, idx) => (
               <div key={idx} className="flex items-center gap-1.5 bg-neutral-50 px-2.5 py-1.5 rounded-lg border border-neutral-200 text-neutral-600 hover:border-pink-300 hover:bg-pink-50 transition-colors">
                   <Tool.icon size={14} className="text-pink-400" />
                   <span className="text-xs font-semibold">{Tool.name}</span>
               </div>
           ))}
        </div>
      </div>
    </div>
  );
};
      

/* --- Main Application --- */

export default function App() {
  const [currentCert, setCurrentCert] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // <--- New State for scroll detection

// --- MODAL STATE ---
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'success', // 'success' or 'error'
    title: '',
    message: ''
  });

  const closeModal = () => setModalState({ ...modalState, isOpen: false });

  // Add this missing line right here!
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- FORM LOGIC ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Web3Forms API Request
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setModalState({
          isOpen: true,
          type: 'success',
          title: 'Message Sent!',
          message: 'Thank you for reaching out. I will get back to you shortly.'
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setModalState({
        isOpen: true,
        type: 'error',
        title: 'Oops!',
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  // --------------------------



  const certifications = [
    { title: "CCNA: Introduction to Networks", issuer: "Cisco", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1280px-Cisco_logo_blue_2016.svg.png",link:"https://www.credly.com/earner/earned/badge/afa7f275-7197-4881-9cf5-6c892f325a84" },
    { title: "PMI Project Management Ready™", issuer: "Project Management Institute", logo: "https://wp.logos-download.com/wp-content/uploads/2021/01/Project_Management_Institute_Logo.png?dl",link:"https://www.credly.com/earner/earned/badge/12464901-95fd-4144-983c-90dc33e5dcea" },
    { title: "IT Specialist - Networking", issuer: "Certiport", logo: "https://all-digital.org/wp-content/uploads/2022/11/Certiport-Pearson-Logo-2016.png" ,link:"https://www.credly.com/earner/earned/badge/8624b2d5-339b-4149-839f-1b223bcdb1d7"},
    { title: "CCNA: Switching, Routing, and Wireless Essentials", issuer: "Cisco", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1280px-Cisco_logo_blue_2016.svg.png",link:"https://www.credly.com/earner/earned/badge/be9c8247-b3bd-418f-a180-d38b84a0c332" },
    { title: "Linux Essentials", issuer: "Cisco", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1280px-Cisco_logo_blue_2016.svg.png",link:"https://www.credly.com/earner/earned/badge/11c7532f-e2c2-4479-82e2-d759ff966a46" },
    { title: "IT Specialist - HTML and CSS", issuer: "Certiport", logo: "https://all-digital.org/wp-content/uploads/2022/11/Certiport-Pearson-Logo-2016.png" ,link:"https://www.credly.com/earner/earned/badge/5d2eb08b-33b3-4381-b498-17e62e4c23f3"},
  ];

  const nextCert = () => {
    setCurrentCert((prev) => (prev + 1) % certifications.length);
  };

  const prevCert = () => {
    setCurrentCert((prev) => (prev - 1 + certifications.length) % certifications.length);
  };



  // Marquee images (placeholder images for portfolio vibe)
  const aboutImages = [
    "/1.jpg", // Diver/Underwater
    "/2.jpg", // Team
    "/3.jpg", // Group
    "/4.jpg", // Underwater 2
    "/5.jpg", // Conference
    "/6.jpg", // Tech
  ];

  // List of Navigation Links (Added Experience)
  const navLinks = ['Skills', 'Experience', 'Projects', 'About', 'Contact'];

  return (
    <div className="bg-neutral-50 text-neutral-900 selection:bg-pink-300 selection:text-pink-900">
      <style>{customStyles}</style>
      
      {/* Alert Modal */}
      <StatusModal 
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
        title={modalState.title}
        message={modalState.message}
      />

      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 px-6 py-4 md:px-8 md:py-4 flex justify-between items-center transition-all duration-500 ${
          isScrolled 
            ? 'bg-neutral-900/95 shadow-lg backdrop-blur-md py-3' 
            : 'bg-gradient-to-b from-black/80 to-transparent py-6'
        }`}
      >
        {/* Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-pink-400 font-bold text-4xl md:text-5xl tracking-tighter hover:scale-110 transition-transform cursor-pointer drop-shadow-md z-50"
        >
          j.
        </div>
        
        {/* Desktop Navigation */}
        <div className={`hidden md:flex gap-2 px-2 py-2 rounded-full transition-all ${isScrolled ? 'bg-transparent' : 'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg'}`}>
          {navLinks.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="px-6 py-2.5 rounded-full text-white text-base font-medium hover:bg-white/20 transition-all hover:shadow-inner"
            >
              {item.toLowerCase()}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className={`md:hidden text-white z-50 p-2 rounded-full transition-all ${isScrolled ? 'bg-white/10' : 'bg-white/10 border border-white/20'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Dropdown */}
        <div 
          className={`fixed inset-0 bg-neutral-900/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          {navLinks.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-3xl font-bold text-white hover:text-pink-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.toLowerCase()}
            </a>
          ))}
        </div>
      </nav>


      {/* Hero Section */}
      <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/jaja.png"
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-neutral-900/30"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 mt-20">
          <RevealOnScroll>
            <p className="text-gray-400 mb-2 font-light tracking-widest text-sm uppercase">Hello I am</p>
            <h1 className="text-5xl md:text-8xl font-bold mb-4 tracking-tight leading-tight">
              janriz <span className="text-pink-400">brielle</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light">
              FRONT-END DEVELOPER & UI/UX ENTHUSIAST
            </p>
            <a 
              href="/CUEVAS_MASTERCV.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-400 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-500 hover:scale-105 transition-all shadow-[0_0_20px_rgba(244,114,182,0.5)] flex items-center gap-2 mx-auto w-fit"
            >
              <Download size={18} /> View Resume
            </a>
          </RevealOnScroll>
        </div>
      </header>

      {/* Sticky Gradient Wrapper for Skills & Certs */}
      <div className="relative bg-[#1a1a1a]">
          
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <div className="sticky top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[120px] animate-pulse-glow z-0"></div>
        </div>

        {/* Technical Skills*/}
        <section id="skills" className="relative z-10 py-24 px-6 md:px-12 max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-pink-400 mb-3">technical skills</h2>
              <p className="text-gray-400 max-w-xl mx-auto text-sm">
                A snapshot of my current proficiency in full-stack and mobile development.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {/* Row 1: Front-End Core */}
              <SkillCard icon={Code2} title="HTML5" />
              <SkillCard icon={Layout} title="CSS3" />
              <SkillCard icon={Terminal} title="JavaScript" />
              <SkillCard icon={FileCode2} title="TypeScript" />
              <SkillCard icon={Globe} title="React" />
              
              {/* Row 2: Back-End & Data */}
              <SkillCard icon={Hexagon} title="Node.js" />
              <SkillCard icon={Server} title="PHP" />
              <SkillCard icon={Cpu} title="Python" />
              <SkillCard icon={Network} title="REST APIs" />
              <SkillCard icon={Database} title="SQL" />

              {/* Row 3: Mobile, CMS & Cloud */}
              <SkillCard icon={Smartphone} title="Kotlin" />
              <SkillCard icon={MonitorSmartphone} title="Android Studio" />
              <SkillCard icon={LayoutDashboard} title="WordPress" />
              <SkillCard icon={Zap} title="Supabase" />
              <SkillCard icon={Cloud} title="Web Hosting" />

              {/* Row 4: Design & Developer Tools */}
              <SkillCard icon={Wind} title="Tailwind CSS" />
              <SkillCard icon={Figma} title="Figma" />
              <SkillCard icon={Palette} title="Canva" />
              <SkillCard icon={GitBranch} title="Git / GitHub" />
              <SkillCard icon={Kanban} title="Jira" />
            </div>
            
            <p className="text-center text-gray-500 text-xs mt-12 italic">
              ...and I am constantly updating my stack to keep up with industry standards.
            </p>
          </RevealOnScroll>
        </section>


        {/* Certifications */}
        <section id="certifications" className="relative z-10 py-24 pb-32 px-6">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-pink-400">certifications</h2>
            </div>

            <div className="max-w-2xl mx-auto relative group">
              {/* Carousel Card */}
              <div className="bg-neutral-100 rounded-3xl p-8 md:p-12 text-center shadow-2xl mx-4 relative overflow-hidden">
                 {/* Card Content */}
                 <div className="flex flex-col items-center justify-center min-h-[160px]">
                    <img 
                      src={certifications[currentCert].logo} 
                      alt={certifications[currentCert].issuer} 
                      className="h-16 md:h-20 object-contain mb-6 grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <h3 className="text-xl font-bold text-neutral-800 mb-1">
                      {certifications[currentCert].title}
                    </h3>
                    <p className="text-neutral-500 text-sm mb-6">Issued by {certifications[currentCert].issuer}</p>
                    
                    <a 
                      href={certifications[currentCert].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-pink-200/50 text-pink-700 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-pink-300/50 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                       View Credential <ChevronRight size={12} />
                    </a>
                 </div>
              </div>

              {/* Navigation Buttons */}
              <button 
                onClick={prevCert}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-8 bg-neutral-800 text-white p-3 rounded-full hover:bg-pink-500 transition-colors shadow-lg z-20"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextCert}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-8 bg-neutral-800 text-white p-3 rounded-full hover:bg-pink-500 transition-colors shadow-lg z-20"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </RevealOnScroll>
        </section>
      </div>

      
      <section id="experience" className="bg-neutral-50 py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-3">experience</h2>
              <p className="text-neutral-500 max-w-xl mx-auto text-sm">
                My professional journey and hands-on industry involvement.
              </p>
            </div>

            
            <div className="relative border-l-2 border-pink-200 ml-4 md:ml-8 space-y-12">
              
              
              <div className="relative pl-8 md:pl-12 group">
                
                <div className="absolute -left-[11px] top-1 w-5 h-5 bg-pink-400 rounded-full border-4 border-neutral-50 group-hover:bg-pink-500 transition-colors shadow-sm"></div>
                
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-neutral-800 flex items-center gap-2">
                      <Briefcase size={18} className="text-pink-400" /> WordPress Developer Intern
                    </h3>
                    <span className="text-xs font-mono font-semibold text-pink-500 bg-pink-50 px-3 py-1 rounded-full w-fit mt-2 md:mt-0">
                      February 2026 - Present
                    </span>
                  </div>
                  
                  <h4 className="text-neutral-500 font-medium mb-4 text-sm">Spiralytics, Inc. - Metro Manila, PH</h4>
                  
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    Developing WordPress websites from scratch based on Figma designs and maintaining existing sites and blogs. Gained experience working with senior developers in an agile workflow using Jira, while also expanding skills in Google Analytics for site performance and insights.
                  </p>
                </div>
              </div>

              
              <div className="relative pl-8 md:pl-12 group">
                <div className="absolute -left-[11px] top-1 w-5 h-5 bg-neutral-300 rounded-full border-4 border-neutral-50 group-hover:bg-pink-400 transition-colors shadow-sm"></div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-neutral-800 flex items-center gap-2">
                      <GraduationCap size={18} className="text-neutral-400 group-hover:text-pink-400 transition-colors" /> IT Student & Developer
                    </h3>
                    <span className="text-xs font-mono text-neutral-500 mt-2 md:mt-0">
                      2022 - Present
                    </span>
                  </div>
                  <h4 className="text-neutral-500 font-medium mb-4 text-sm">FEU Institute of Technology</h4>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    Currently pursuing a BS in Information Technology specializing in Web and Mobile Applications. Experienced in full-stack development, including front-end design, back-end logic, and database integration. Hands-on experience with web hosting, Linux system administration, and Python-based data analysis.
                  </p>
                </div>
              </div>

            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-[#f8c8dc] py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-3">projects</h2>
              <p className="text-neutral-700 max-w-xl mx-auto text-sm">
                A selection of applications and platforms I've architected from the ground up.
              </p>
            </div>

            {/* Changed to flex wrap or auto-fit grid to accommodate 5 projects nicely */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              <ProjectCard 
                title="Roamly" 
                year="2026"
                type="Full-Stack Web Application" 
                description="An AI-driven travel app integrating Gemini 1.5 Flash for itineraries and Aviationstack for live flight tracking. Built on a secure Supabase backend with Row-Level Security and a social trip-cloning system."
                link="https://roamly-world.vercel.app/"
                tools={[
                  { icon: Globe, name: 'React' },
                  { icon: Network, name: 'REST APIs' },
                  { icon: Zap, name: 'Supabase' }
                ]}
                images={[
                  "/roamly-1.png", 
                  "/roamly-2.png",
                  "/roamly-3.png"
                ]}
              />
              

              <ProjectCard 
                title="Personal Portfolio" 
                year="2026"
                type="Front-End Architecture" 
                description="A personal website built to showcase my web development skills. It features a responsive layout, custom scroll animations, and a functional contact form."
                tools={[
                  { icon: Globe, name: 'React' },
                  { icon: Layout, name: 'Tailwind' },
                  { icon: GitBranch, name: 'Git' },
                  { icon: Cloud, name: 'Web Hosting' }
                ]}
                images={[
                  "/SITE.png", 
                  "/SITE1.png",
                  "/SITE3.png"
                ]}
              />

              <ProjectCard 
                title="FitBeat" 
                year="2025"
                type="Full-Stack Application" 
                description="A clinic management web and mobile app developed as our Capstone project. I served as the Project Manager and QA lead, handling team workflows, software testing, and designing the initial layout."
                tools={[
                  { icon: Kanban, name: 'Project Management' },
                  { icon: Figma, name: 'Figma' },
                  { icon: Cloud, name: 'Web Hosting' }
                ]}
                images={[
                  "/ft1.jpg",
                  "/ft2.jpg",
                  "/ft3.jpg"
                ]}
              />

              <ProjectCard 
                title="Payapa Wellness & Spa" 
                year="2025"
                type="Web Development" 
                description="A conceptual front-end landing page created as a proactive pitch for a local wellness brand. The layout was designed and developed to demonstrate modern web practices and clean UI."
                tools={[
                  { icon: Code2, name: 'HTML5' },
                  { icon: Layout, name: 'Tailwind' },
                  { icon: Terminal, name: 'JavaScript' }
                ]}
                images={[
                  "/py1.png",
                  "/py2.png",
                  "/py3.png"
                ]}
              />

              <ProjectCard 
                title="Digital Sticker Notebook" 
                year="2024"
                type="Interactive Web App" 
                description="A playful, mobile-responsive web app that simulates a digital sticker collection. I used vanilla JavaScript to implement custom 2D bounce physics and drag-and-drop mechanics."
                tools={[
                  { icon: Terminal, name: 'Vanilla JS' },
                  { icon: Layout, name: 'CSS3' },
                  { icon: Code2, name: 'HTML5' }
                ]}
                images={[
                  "/s1.png",
                  "/s2.png"
                ]}
              />

              <ProjectCard 
                title="Tech Horizon 2025" 
                year="2025"
                type="Digital Design & Management" 
                description="Organized a large-scale webinar on modern technology to fulfill a major academic requirement. Coordinated with multiple departments and designed all visual assets, virtual backgrounds, and presentation decks using Canva."
                tools={[
                  { icon: Palette, name: 'Canva' },
                  { icon: Kanban, name: 'Collaboration' }
                ]}
                images={[
                  "/th1.jpg",
                  "/th2.jpg",
                  "/th3.jpg"
                ]}
              />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* About Me Section*/}
      <section id="about" className="bg-[#1a1a1a] text-white py-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center mb-16 relative z-10">
          <RevealOnScroll>
            <h2 className="text-4xl font-bold text-pink-400 mb-8">about me</h2>
            <div className="space-y-6 text-gray-300 font-light leading-relaxed">
              <p>
                I am a 4th year student at FEU Institute of Technology taking BS Information Technology in Web and Mobile Applications. I am always learning to find new ideas to bring accessibility to others. I am currently exploring internship opportunities in Metro Manila to apply academic knowledge to practical development challenges.
              </p>
              <p>
                Taking my developer hat off, I am happiest when I'm near the ocean. I love travelling and practicing freediving to disconnect from the digital world. When I am back at my setup, I swap the wetsuit for a headset to play Valorant.
              </p>
            </div>
          </RevealOnScroll>
        </div>

        {/* Marquee Scroller */}
        <div className="mt-12 marquee-container w-full relative">
          <div className="marquee-content">
             {[...aboutImages, ...aboutImages].map((img, index) => (
               <div 
                  key={index} 
                  className="w-[300px] h-[200px] flex-shrink-0 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-pink-500"
                >
                  <img 
                    src={img} 
                    alt={`About gallery ${index}`} 
                    className="w-full h-full object-cover"
                  />
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-[#fdfbf7] py-24 px-6 md:px-12">
        <RevealOnScroll>
          <div className="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-xl overflow-hidden border border-neutral-100">
            <div className="grid md:grid-cols-5 p-8 md:p-12 gap-12">
              
              {/* Left Column */}
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">let's work together</h2>
                  <p className="text-gray-500 text-sm">Reach out for inquiries, collaborations, or even a game of Valorant.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600 hover:text-pink-500 transition-colors cursor-pointer group">
                    <Phone size={18} className="text-pink-400 group-hover:scale-110 transition-transform" />
                    <span>09267079959</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 hover:text-pink-500 transition-colors cursor-pointer group">
                    <Mail size={18} className="text-pink-400 group-hover:scale-110 transition-transform" />
                    <span>janrizbrielle@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 hover:text-pink-500 transition-colors cursor-pointer group">
                    <Linkedin size={18} className="text-pink-400 group-hover:scale-110 transition-transform" />
                    <span>linkedin.com/in/janriz-cuevas</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 hover:text-pink-500 transition-colors cursor-pointer group">
                    <MapPin size={18} className="text-pink-400 group-hover:scale-110 transition-transform" />
                    <span>San Pedro City, Laguna, Philippines</span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="md:col-span-3">
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="form-name" value="contact" />
                  
                  <div className="bg-neutral-800 rounded-lg p-3 flex items-center gap-3 border border-transparent focus-within:border-pink-500 transition-colors"><div className="bg-neutral-700 p-1.5 rounded-full flex items-center justify-center">
    <User size={12} className="text-white opacity-70" />
  </div>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Name" 
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-transparent text-white w-full focus:outline-none placeholder-gray-500 text-sm" 
                      required
                    />
                  </div>
                  <div className="bg-neutral-800 rounded-lg p-3 flex items-center gap-3 border border-transparent focus-within:border-pink-500 transition-colors">
                    <div className="bg-neutral-700 p-1.5 rounded-full"><Mail size={12} className="text-white opacity-50" /></div>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Email" 
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-transparent text-white w-full focus:outline-none placeholder-gray-500 text-sm" 
                      required
                    />
                  </div>
                  <div className="bg-neutral-800 rounded-lg p-3 flex items-center gap-3 border border-transparent focus-within:border-pink-500 transition-colors">
  <div className="bg-neutral-700 p-1.5 rounded-full flex items-center justify-center">
    <FileText size={12} className="text-white opacity-70" />
  </div>
                    <input 
                      type="text" 
                      name="subject" 
                      placeholder="Subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-transparent text-white w-full focus:outline-none placeholder-gray-500 text-sm" 
                      required
                    />
                  </div>
                  <div className="bg-neutral-800 rounded-lg p-3 border border-transparent focus-within:border-pink-500 transition-colors h-32">
                     <textarea 
                        name="message"
                        placeholder="Write your message here..." 
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-transparent text-white w-full h-full focus:outline-none placeholder-gray-500 text-sm resize-none"
                        required
                     ></textarea>
                  </div>

                  <button className="w-full bg-pink-400 text-white py-3 rounded-lg font-semibold hover:bg-pink-500 transition-all flex items-center justify-center gap-2 hover:shadow-lg">
                    <Send size={16} /> Send Message
                  </button>
                </form>
              </div>

            </div>
          </div>
        </RevealOnScroll>
      </section>

       {/* Footer */}
      <footer className="bg-pink-300 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-8 text-center md:text-left">
          <div>
            <p className="text-pink-900 text-xs mb-1 opacity-70">© 2026 Built with love by</p>
            <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">janriz brielle</h1>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1">
             <span className="text-pink-900 font-bold text-xs uppercase mb-1">Navigation</span>
             {navLinks.map(link => (
               <a key={link} href={`#${link.toLowerCase()}`} className="text-pink-900/70 hover:text-neutral-900 text-sm transition-colors">{link}</a>
             ))}
          </div>
        </div>
      </footer>
    </div>
  );
}