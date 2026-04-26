/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* TopNavBar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-xl shadow-2xl shadow-black/60 h-16' : 'bg-transparent h-20'}`}>
        <div className="flex justify-between items-center px-6 md:px-12 h-full w-full max-w-[1440px] mx-auto">
          <div className="text-xl font-black tracking-tighter text-white cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            AKSARAKODE
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {['Solutions', 'Hardware', 'Software', 'Tech Stack', 'About'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="font-headline uppercase tracking-wider text-xs md:text-sm font-bold text-slate-400 hover:text-white transition-all duration-300 active:scale-95"
              >
                {item}
              </button>
            ))}
          </div>
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-6 py-2.5 rounded-lg text-sm font-bold font-headline uppercase tracking-tight active:scale-95 transition-transform"
          >
            Contact Us
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-surface">
          <div className="absolute inset-0 z-0 opacity-40">
            <img 
              className="w-full h-full object-cover grayscale brightness-50" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFMouxKmO-cBEWtlVk-K0B-uQKaAK3ZgtXUPXi6aIL_KtMJ_axJdFlFH65XgrqTryhI773dt7ckPSkARLlDW_dXNHdMZD_awqYoN_dLJNqfVuD4oOxGW8nslxrmcF6lbyF-WVvdUvQvDwbMaBPeR-IFIZG9w2uzxNkDBWORR24bB5FqtsEH50EfvYlcXphGuVuUvwnO02hrih2iFR7rfFi42oRrhHfWt89CXxGWFrps82e8NPHRhMT70PQt-bNp2jgEb7PKvVIwjE" 
              alt="Industrial circuit board"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
          </div>
          
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                Precision Engineering Phase 1.0
              </span>
              <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                Empowering Industry <br/>
                <span className="text-primary">&amp;</span> Agriculture through Integrated <br/>
                <span className="text-tertiary">Technology</span>
              </h1>
              <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl font-light mb-10 leading-relaxed">
                End-to-end IoT ecosystems and custom software solutions designed to transform traditional workflows into data-driven operations.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => scrollToSection('solutions')}
                  className="px-8 py-4 bg-primary text-on-primary font-bold rounded-lg flex items-center gap-2 active:scale-95 transition-all hover:brightness-110"
                >
                  EXPLORE SOLUTIONS
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
                <button 
                  onClick={() => scrollToSection('hardware')}
                  className="px-8 py-4 bg-surface-container-high text-white font-bold rounded-lg border border-outline-variant/30 active:scale-95 transition-all hover:bg-surface-container-highest"
                >
                  VIEW HARDWARE
                </button>
              </div>
            </motion.div>
          </div>

          {/* Kinetic Data Overlay */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-12 right-12 hidden lg:block glass-panel p-6 rounded-lg border border-outline-variant/20 max-w-xs"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">LIVE_TELEMETRY_STREAM</span>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            </div>
            <div className="space-y-3">
              <div className="h-12 w-full bg-surface-container-lowest relative overflow-hidden">
                <div className="absolute inset-0 flex items-end px-1 gap-0.5">
                  {[60, 40, 75, 90, 50, 65, 80, 45].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ 
                        repeat: Infinity, 
                        repeatType: "reverse", 
                        duration: 0.5 + Math.random(),
                        delay: i * 0.1
                      }}
                      className="flex-1 bg-tertiary/60"
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-tertiary">
                <span>LATENCY: 12ms</span>
                <span>FREQ: 868MHz</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Core Services Section */}
        <section id="solutions" className="py-24 bg-surface-container-low">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-4">Functional Domains</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Core Services</h3>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-on-surface-variant max-w-md text-sm leading-relaxed"
              >
                Synthesizing hardware and software to create monolithic reliability in fragmented environments.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Service 1: IoT */}
              <motion.div 
                id="hardware"
                whileHover={{ y: -5 }}
                className="md:col-span-8 bg-surface-container-high p-8 md:p-12 rounded-lg relative overflow-hidden group"
              >
                <div className="relative z-10 h-full flex flex-col">
                  <span className="material-symbols-outlined text-primary text-4xl mb-6">settings_input_component</span>
                  <h4 className="text-3xl font-bold text-white mb-4">IoT &amp; Hardware Engineering</h4>
                  <p className="text-on-surface-variant max-w-xl mb-8">From custom PCB layouts to complex sensor arrays. We build the physical backbone of your digital infrastructure using industrial-grade components.</p>
                  <ul className="grid grid-cols-2 gap-4 text-sm font-mono text-slate-400">
                    {['PCB DESIGN', 'SENSOR MONITORING', 'EMBEDDED SYSTEMS', 'FIRMWARE DEV'].map(item => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary"></span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 group-hover:opacity-20 transition-opacity">
                  <img 
                    className="h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFVXuA-Opo0tdFMTNJO-KdD5yvvYgk0bKQFw7r_wTLw3RLmEXrg8b5tuB_KvknZOI44FU2K1HQeA0p5D-VMt7FShx4ZhEFwcr4jwDUXqhIkP98Q-YLq2shhyFr-Y68KkDqvN-U0vlwFt0c13CnPDCfcZQaXCLYaVwTT1K_kQPO2fRr9G0BsqHTbHPkPNyjuz01p6vzJPREXDobN9JJu3uJ80JrDaRi68Y4h4zmdUVLVCFWmqGnMUXE-CwKnQGKvY9FC63i4zAlpZU" 
                    alt="Circuitry"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>

              {/* Service 2: Software */}
              <motion.div 
                id="software"
                whileHover={{ y: -5 }}
                className="md:col-span-4 bg-secondary-container p-8 rounded-lg flex flex-col justify-between text-on-secondary-container"
              >
                <div>
                  <span className="material-symbols-outlined text-4xl mb-6">terminal</span>
                  <h4 className="text-3xl font-bold mb-4">Software Development</h4>
                  <p className="text-on-secondary-container/80 text-sm leading-relaxed mb-6">
                    Scalable cloud architectures and intuitive interfaces. Mobile apps with Flutter and high-performance backends with Go.
                  </p>
                </div>
                <div className="space-y-2">
                  {[
                    ['ARCHITECTURE', 'DOCKER'],
                    ['BACKEND', 'GOLANG'],
                    ['CROSS-PLATFORM', 'FLUTTER']
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between border-b border-white/10 pb-2 text-xs font-bold">
                      <span>{label}</span>
                      <span>{val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Service 3: Industrial */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="md:col-span-12 bg-surface p-8 md:p-12 rounded-lg border border-outline-variant/10 flex flex-col md:flex-row items-center gap-12"
              >
                <div className="flex-1">
                  <h4 className="text-3xl font-bold text-white mb-4">Industrial Solutions</h4>
                  <p className="text-on-surface-variant mb-6">Automating heavy industry with precision weighing systems and factory floor optimization. We turn physical mass into digital data points.</p>
                  <div className="flex gap-4">
                    <div className="px-4 py-2 bg-surface-container-high rounded text-xs font-bold text-primary">FACTORY AUTOMATION</div>
                    <div className="px-4 py-2 bg-surface-container-high rounded text-xs font-bold text-primary">WEIGHBRIDGE SYSTEMS</div>
                  </div>
                </div>
                <div className="w-full md:w-1/3 aspect-video bg-surface-container-lowest rounded overflow-hidden">
                  <img 
                    className="w-full h-full object-cover grayscale opacity-50" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuEJmOdOk9-e3E4DSjBal1Dys79qXBxQf2wZc8F9oCkIfcHzDewB8vCAN3wmEZogJqi7ncZZ7aoquMkX0qaElIIgCYaaic971pGowxSVNMLZT_duYfmee7S4Oj-aML0MfpeaRD9JbKSL0qmvR5GSBQI-O0uYjepLQpKP9KtD3kszRBkPFr13JtTGpO59HLuyQ6WKKcmfdcu-7Oj7zkedgfVynM7wY9Wa74wy1dLvlvjB6BiYo-QBIn4rE7ECO-LOWLTpmYqV9WrZE" 
                    alt="Industrial Robot"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Product Verticals Section */}
        <section id="product-verticals" className="py-24 bg-surface">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-black text-white tracking-tighter mb-4">PRODUCT VERTICALS</h2>
              <div className="h-1 w-24 bg-primary mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Motorized Tools',
                  desc: 'High-efficiency mechanical systems for intensive agricultural tasks.',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMlyE-hCjxsLHAJrAJu5Sw5xR-aqFHh-ZxDvWwnlRUAvXqaipMZ8gRPHvCXa5QE8WiyducUOBGvXKRRVgk2p9KAptg5l0QJ6tw78LeY3WqvqegMmMy5of__uNYISCDBxo5xHLY_j6t8sK6RUiCuejuxJeKDelW_8LIerB-J98aKJjkNuxdLNhUcI5VatSimCrkQabtui4WpEotryK6SxpS5BM19qqjOsnUjTB5QYfCef3HxoCPybgc5ogZ4A-_FiXB1n-NBoGIuok'
                },
                {
                  title: 'Advanced Hand Tools',
                  desc: 'Ergonomic designs meeting industrial standards for durability and precision.',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbWxGc02OmJErqI0IddKBcFN9QsMqJyQH3p6lPv0oq4VH9jmcPs0dnrjokrD6rLw-c5ABuxQB-1_AaqCtv--pQe2kzcR6ZpEVkZ-q3pem0Ni9z7o-Xx78DYl1AKY8lJjBf33LwlJwlyCGz0xcO32EoyfqAk21U0djOvl5G_6dx2J6SnL_0RrvI_rf0Z-xMpDzVgpCbREMudizOp5ASFFcfNhQYDUnpGanxhMslzVQ4Z_j2pjN0ij24DSSXnyoQWYzD4_FkpkFqQqM'
                },
                {
                  title: 'Industrial IoT Nodes',
                  desc: 'Wireless telemetry units for real-time monitoring of soil and factory assets.',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChXZjpKv9HcE5WcCnJdtYWynVLGoEC4a_u-9kYcxB3hC0n4HYypUzUTOZMJN-9iEDJ6-vRzpZbKHc2fJrI94JeW_RxPNeYeq_ntiItfZClCsOYksRBSBw4pH33rGjZwLIgPrfHh8mLthsjE4Xc1fGebmIgf-WNAPfo3uvUINiMG_gaYSqXs-H-nq5XcZLe_NfD0jtNHwEEgE3BjqHPwmvjtf7N8G5XF1YUHgWYAhwvHtHVsLH2ZxVTCZoyVRVWrBMUjgfsu_t5nPg'
                }
              ].map((product, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="group"
                >
                  <div className="aspect-square bg-surface-container-low rounded-lg mb-6 overflow-hidden relative">
                    <img 
                      className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" 
                      src={product.img} 
                      alt={product.title}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                  </div>
                  <h5 className="text-xl font-bold text-white mb-2">{product.title}</h5>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-4">{product.desc}</p>
                  <a className="text-primary text-xs font-bold tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all" href="#">
                    VIEW CATALOG <span className="material-symbols-outlined text-sm">east</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech-stack" className="py-20 bg-surface-container-low border-y border-outline-variant/10">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all">
              {[
                { name: 'GO', label: 'BACKEND' },
                { name: 'FLUTTER', label: 'MOBILE' },
                { name: 'POSTGRES', label: 'DATA' },
                { name: 'DOCKER', label: 'OPS' },
                { name: 'ESP32', label: 'HARDWARE' },
                { name: 'PI', label: 'COMPUTE' }
              ].map(tech => (
                <div key={tech.name} className="flex flex-col items-center gap-2">
                  <span className="font-headline font-bold text-2xl">{tech.name}</span>
                  <span className="text-[10px] font-mono tracking-widest">{tech.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-24 bg-surface overflow-hidden">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px]"></div>
                <h2 className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-4">Engineering the Future</h2>
                <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-8">PT Aksara Kode Agritech Adimulya</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
                  Founded on the principle of technical excellence, Aksara Kode serves as a vital bridge between traditional industrial practices and the digital frontier. 
                </p>
                <p className="text-on-surface-variant text-lg leading-relaxed mb-10">
                  We specialize in creating bespoke ecosystems for agriculture and manufacturing—where every line of code and every solder joint is optimized for maximum efficiency and long-term sustainability.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-3xl font-black text-primary mb-1">100%</div>
                    <div className="text-xs font-bold text-slate-500 uppercase">Custom Solutions</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-tertiary mb-1">24/7</div>
                    <div className="text-xs font-bold text-slate-500 uppercase">System Uptime</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-square"
              >
                <div className="absolute inset-0 bg-surface-container-high rounded-lg flex items-center justify-center p-8">
                  <div className="w-full h-full border border-outline-variant/30 relative flex items-center justify-center">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-4/5 h-4/5 border border-primary/20 absolute"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="w-3/5 h-3/5 border border-tertiary/20 absolute"
                    />
                    <span className="font-headline font-black text-4xl text-white tracking-[0.2em] z-10">AKSARAKODE</span>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 p-6 glass-panel border border-outline-variant/20 rounded-lg">
                  <p className="text-xs font-mono text-primary mb-2">// ESTABLISHED 2024</p>
                  <p className="text-[10px] text-slate-400">Headquartered in Indonesia,<br/>serving the global agritech sector.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-surface-container-lowest">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-5">
                <h2 className="text-4xl font-bold text-white tracking-tight mb-6">Technical Inquiry</h2>
                <p className="text-on-surface-variant mb-10">Our engineers are ready to discuss your specific infrastructure needs. Reach out for a technical consultation or project quote.</p>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    <div>
                      <h6 className="text-white font-bold mb-1 text-sm">Office Location</h6>
                      <p className="text-xs text-slate-400 leading-relaxed">Jl. Industri Raya No. 42, Techno Hub District,<br/>Adimulya, Indonesia.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary">mail</span>
                    <div>
                      <h6 className="text-white font-bold mb-1 text-sm">Email Address</h6>
                      <p className="text-xs text-slate-400">engineering@aksarakode.id</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-7 bg-surface-container p-8 rounded-lg"
              >
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                      <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-colors text-white py-2" placeholder="John Doe" type="text"/>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Work Email</label>
                      <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-colors text-white py-2" placeholder="john@company.com" type="email"/>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Industry Vertical</label>
                    <select className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-colors text-white py-2 appearance-none">
                      <option className="bg-surface">Agriculture</option>
                      <option className="bg-surface">Manufacturing</option>
                      <option className="bg-surface">IoT Hardware</option>
                      <option className="bg-surface">Custom Software</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Project Details</label>
                    <textarea className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-colors text-white py-2 resize-none" placeholder="Describe your technical challenge..." rows={4}></textarea>
                  </div>
                  <button className="w-full py-4 bg-primary text-on-primary font-bold rounded-lg uppercase tracking-[0.1em] hover:brightness-110 active:scale-95 transition-all">
                    SEND REQUEST
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-[#131314]">
        <div className="flex flex-col md:flex-row justify-between items-center py-12 px-6 md:px-12 max-w-[1440px] mx-auto space-y-8 md:space-y-0">
          <div className="space-y-4 text-center md:text-left">
            <div className="font-headline font-bold text-primary tracking-tighter text-2xl">AKSARAKODE</div>
            <p className="text-xs font-light tracking-wide text-slate-500 max-w-sm">
              © 2024 PT Aksara Kode Agritech Adimulya. Engineering the Future of Precision Agriculture.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {['IoT Solutions', 'Hardware Design', 'Privacy Policy', 'Terms of Service'].map(link => (
              <a key={link} className="text-xs font-light tracking-wide text-slate-500 hover:text-primary hover:translate-x-1 transition-all duration-200" href="#">
                {link}
              </a>
            ))}
          </div>
          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-slate-400 text-sm">share</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-slate-400 text-sm">language</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
