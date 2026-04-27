/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { translations } from "./translations";

export default function App() {
  const [lang, setLang] = useState<'en' | 'id'>('en');
  const t = translations[lang];

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
            {[
              { id: 'solutions', label: t.nav.solutions },
              { id: 'hardware', label: t.nav.hardware },
              { id: 'software', label: t.nav.software },
              { id: 'projects', label: t.nav.projects },
              { id: 'tech-stack', label: t.nav.techStack },
              { id: 'about', label: t.nav.about }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-headline uppercase tracking-wider text-xs md:text-sm font-bold text-slate-400 hover:text-white transition-all duration-300 active:scale-95"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-4 md:space-x-8">
            <button onClick={() => setLang(lang === 'en' ? 'id' : 'en')} className="font-headline text-xs font-bold text-primary hover:text-white transition-colors flex items-center gap-2">
              <i className="fa-solid fa-globe text-sm md:text-base"></i>
              <span className="hidden xs:inline">{lang.toUpperCase()}</span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-bold font-headline uppercase tracking-tight active:scale-95 transition-transform"
            >
              {t.nav.contact}
            </button>
          </div>
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
                {t.hero.tag}
              </span>
              <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                {lang === 'en' ? (
                  <>Empowering Industry <br/><span className="text-primary">&amp;</span> Agriculture through Integrated <br/><span className="text-tertiary">Technology</span></>
                ) : (
                  <>Memberdayakan Industri <br/><span className="text-primary">&amp;</span> Pertanian melalui Teknologi <br/><span className="text-tertiary">Terintegrasi</span></>
                )}
              </h1>
              <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl font-light mb-10 leading-relaxed">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => scrollToSection('solutions')}
                  className="px-8 py-4 bg-primary text-on-primary font-bold rounded-lg flex items-center gap-2 active:scale-95 transition-all hover:brightness-110"
                >
                  {t.hero.explore}
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
                <button 
                  onClick={() => scrollToSection('hardware')}
                  className="px-8 py-4 bg-surface-container-high text-white font-bold rounded-lg border border-outline-variant/30 active:scale-95 transition-all hover:bg-surface-container-highest"
                >
                  {t.hero.viewHardware}
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
                <h2 className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-4">{t.services.tag}</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{t.services.title}</h3>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-on-surface-variant max-w-md text-sm leading-relaxed"
              >
                {t.services.subtitle}
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
                  <span className="material-symbols-outlined text-primary text-4xl mb-6 truncate"><i className="fa-solid fa-microchip"></i></span>
                  <h4 className="text-3xl font-bold text-white mb-4">{t.services.iot.title}</h4>
                  <p className="text-on-surface-variant max-w-xl mb-8">{t.services.iot.desc}</p>
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
                  <span className="material-symbols-outlined text-4xl mb-6 truncate"><i className="fa-solid fa-code"></i></span>
                  <h4 className="text-3xl font-bold mb-4">{t.services.software.title}</h4>
                  <p className="text-on-secondary-container/80 text-sm leading-relaxed mb-6">
                    {t.services.software.desc}
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
                  <h4 className="text-3xl font-bold text-white mb-4">{t.services.industrial.title}</h4>
                  <p className="text-on-surface-variant mb-6">{t.services.industrial.desc}</p>
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
              <h2 className="text-5xl font-black text-white tracking-tighter mb-4">{t.products.title}</h2>
              <div className="h-1 w-24 bg-primary mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: t.products.items[0].title,
                  desc: t.products.items[0].desc,
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMlyE-hCjxsLHAJrAJu5Sw5xR-aqFHh-ZxDvWwnlRUAvXqaipMZ8gRPHvCXa5QE8WiyducUOBGvXKRRVgk2p9KAptg5l0QJ6tw78LeY3WqvqegMmMy5of__uNYISCDBxo5xHLY_j6t8sK6RUiCuejuxJeKDelW_8LIerB-J98aKJjkNuxdLNhUcI5VatSimCrkQabtui4WpEotryK6SxpS5BM19qqjOsnUjTB5QYfCef3HxoCPybgc5ogZ4A-_FiXB1n-NBoGIuok'
                },
                {
                  title: t.products.items[1].title,
                  desc: t.products.items[1].desc,
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbWxGc02OmJErqI0IddKBcFN9QsMqJyQH3p6lPv0oq4VH9jmcPs0dnrjokrD6rLw-c5ABuxQB-1_AaqCtv--pQe2kzcR6ZpEVkZ-q3pem0Ni9z7o-Xx78DYl1AKY8lJjBf33LwlJwlyCGz0xcO32EoyfqAk21U0djOvl5G_6dx2J6SnL_0RrvI_rf0Z-xMpDzVgpCbREMudizOp5ASFFcfNhQYDUnpGanxhMslzVQ4Z_j2pjN0ij24DSSXnyoQWYzD4_FkpkFqQqM'
                },
                {
                  title: t.products.items[2].title,
                  desc: t.products.items[2].desc,
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
                    {t.products.viewCatalog} <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 bg-surface-container-low">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-4">{t.projects.tag}</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">{t.projects.title}</h3>
              <p className="text-on-surface-variant max-w-2xl mx-auto">{t.projects.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.projects.items.map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-surface rounded-xl border border-outline-variant/20 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="p-8 h-full flex flex-col">
                    <div className="mb-4">
                      <span className="text-[10px] font-mono text-tertiary tracking-widest uppercase px-2 py-1 bg-tertiary/10 rounded">
                        {project.client}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-sm text-on-surface-variant mb-8 flex-grow">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map(tech => (
                        <span key={tech} className="text-xs font-medium text-slate-400 bg-surface-container px-3 py-1 rounded-full border border-outline-variant/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <button className="text-xs font-bold text-primary tracking-[0.2em] hover:text-white transition-colors uppercase border-b border-primary pb-1 group inline-flex items-center gap-2">
                {t.projects.viewAll}
                <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
              </button>
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
                <h2 className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-4">{t.about.tag}</h2>
                <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-8">{t.about.title}</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
                  {t.about.p1}
                </p>
                <p className="text-on-surface-variant text-lg leading-relaxed mb-10">
                  {t.about.p2}
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-3xl font-black text-primary mb-1">100%</div>
                    <div className="text-xs font-bold text-slate-500 uppercase">{t.about.stats.solutions}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-tertiary mb-1">24/7</div>
                    <div className="text-xs font-bold text-slate-500 uppercase">{t.about.stats.uptime}</div>
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
                  <p className="text-xs font-mono text-primary mb-2">// {t.about.established}</p>
                  <p className="text-[10px] text-slate-400">{t.about.hq}</p>
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
                <h2 className="text-4xl font-bold text-white tracking-tight mb-6">{t.contact.title}</h2>
                <p className="text-on-surface-variant mb-10">{t.contact.subtitle}</p>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <span className="text-primary"><i className="fa-solid fa-location-dot"></i></span>
                    <div>
                      <h6 className="text-white font-bold mb-1 text-sm">{t.contact.office.title}</h6>
                      <p className="text-xs text-slate-400 leading-relaxed">{t.contact.office.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-primary"><i className="fa-solid fa-envelope"></i></span>
                    <div>
                      <h6 className="text-white font-bold mb-1 text-sm">{t.contact.email.title}</h6>
                      <p className="text-xs text-slate-400">sales@aksarakodeagritech.com</p>
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
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.contact.form.name}</label>
                      <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-colors text-white py-2" placeholder="John Doe" type="text"/>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.contact.form.email}</label>
                      <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-colors text-white py-2" placeholder="john@company.com" type="email"/>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.contact.form.industry}</label>
                    <select className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-colors text-white py-2 appearance-none">
                      {t.contact.form.verticals.map(v => (
                        <option key={v} className="bg-surface">{v}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.contact.form.details}</label>
                    <textarea className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-colors text-white py-2 resize-none" placeholder={t.contact.form.detailsPlaceholder} rows={4}></textarea>
                  </div>
                  <button className="w-full py-4 bg-primary text-on-primary font-bold rounded-lg uppercase tracking-[0.1em] hover:brightness-110 active:scale-95 transition-all">
                    {t.contact.form.submit}
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
              {t.footer.copy}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {t.footer.links.map(link => (
              <a key={link} className="text-xs font-light tracking-wide text-slate-500 hover:text-primary hover:translate-x-1 transition-all duration-200" href="#">
                {link}
              </a>
            ))}
          </div>
          <div className="flex gap-6">
            <button className="text-slate-400 hover:text-primary transition-colors">
              <i className="fa-brands fa-linkedin text-xl"></i>
            </button>
            <button className="text-slate-400 hover:text-primary transition-colors">
              <i className="fa-brands fa-instagram text-xl"></i>
            </button>
            <button className="text-slate-400 hover:text-primary transition-colors">
              <i className="fa-solid fa-envelope text-xl"></i>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
