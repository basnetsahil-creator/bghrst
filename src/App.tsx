import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, MapPin, Phone, Mail, Leaf, Award, Users, Utensils, Waves } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const slides = [
    {
      title: 'Swimming Pool',
      desc: 'Cool off and relax in our beautiful pool facility surrounded by nature',
      image: '/WhatsApp_Image_2026-04-02_at_8.49.13_PM copy copy.jpeg',
    },
    {
      title: 'Outdoor Dining',
      desc: 'Enjoy meals in our vibrant open-air dining area under the trees',
      image: '/WhatsApp_Image_2026-04-09_at_1.44.20_PM.jpeg',
    },
    {
      title: 'Bamboo Cottages',
      desc: 'Serene bamboo cottages lit with fairy lights for a magical experience',
      image: '/WhatsApp_Image_2026-04-09_at_1.44.18_PM copy copy.jpeg',
    },
    {
      title: 'Our Menu',
      desc: 'Explore our rich multi-cuisine menu crafted by expert chefs',
      image: '/WhatsApp_Image_2026-04-09_at_1.44.15_PM copy copy.jpeg',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const menuItems = [
    { category: 'North Indian Cuisine', items: ['Butter Chicken', 'Dal Makhani', 'Tandoori Specialties', 'Naan & Breads'] },
    { category: 'Chinese Dishes', items: ['Hakka Noodles', 'Fried Rice', 'Manchurian', 'Spring Rolls'] },
    { category: 'Tandoor Specialties', items: ['Tandoori Chicken', 'Paneer Tikka', 'Seekh Kebab', 'Fish Tandoori'] },
    { category: 'Arabic Cuisine', items: ['Shawarma', 'Falafel', 'Hummus', 'Kebabs'] },
    { category: 'Fast Food', items: ['Burgers', 'Pizzas', 'Fries', 'Hot Dogs'] },
    { category: 'Beverages', items: ['Special Tea', 'Coffee', 'Cold Drinks', 'Shakes'] },
  ];

  const events = [
    { emoji: '🍴', title: 'A La Carte Dining', desc: 'Customized dining experience' },
    { emoji: '🎂', title: 'Birthday Parties', desc: 'Make birthdays memorable' },
    { emoji: '💍', title: 'Anniversaries', desc: 'Celebrate special moments' },
    { emoji: '🤝', title: 'Corporate Meetings', desc: 'Professional event hosting' },
    { emoji: '👨‍👩‍👧‍👦', title: 'Family Gatherings', desc: 'Bring family together' },
    { emoji: '💒', title: 'Wedding & Receptions', desc: 'Grand celebration venues' },
  ];

  const careers = [
    { emoji: '👨‍🍳', title: 'Multi-Cuisine Chef' },
    { emoji: '🍔', title: 'Fast Food Chef' },
    { emoji: '🤵', title: 'Waiter / Waitress' },
    { emoji: '🧹', title: 'Cleaner' },
    { emoji: '🍽️', title: 'Dishwasher' },
    { emoji: '🏊', title: 'Lifeguard' },
  ];

  const features = [
    { icon: Utensils, title: 'Fine Dining', desc: 'Multi-cuisine culinary excellence' },
    { icon: Waves, title: 'Pool & Spa', desc: 'Aquatic recreational facilities' },
    { icon: Users, title: 'Events', desc: 'Complete event management' },
    { icon: Award, title: 'Premium Service', desc: 'World-class hospitality' },
  ];

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const animationClass = (id: string) =>
    visibleSections[id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';

  const whatsappMainUrl = `https://wa.me/917277653665`;
  const whatsappCareersUrl = `https://wa.me/918521745856`;

  return (
    <div className="min-h-screen bg-white">

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappMainUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center group"
        onMouseEnter={() => setShowWhatsAppTooltip(true)}
        onMouseLeave={() => setShowWhatsAppTooltip(false)}
      >
        {showWhatsAppTooltip && (
          <span className="mr-3 bg-white text-green-800 font-semibold text-sm px-4 py-2 rounded-full shadow-xl border border-green-100 animate-fadeInRight whitespace-nowrap">
            Chat on WhatsApp
          </span>
        )}
        <div className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse-glow">
          <svg viewBox="0 0 32 32" className="w-9 h-9 fill-white">
            <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.83.74 5.49 2.04 7.8L.5 31.5l7.93-2.07A15.44 15.44 0 0 0 16 31.5c8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5zm0 28.3a12.7 12.7 0 0 1-6.48-1.77l-.46-.28-4.71 1.23 1.26-4.6-.3-.48A12.72 12.72 0 1 1 16 28.8zm7-9.48c-.38-.19-2.26-1.12-2.61-1.24-.35-.13-.6-.19-.86.19-.25.38-.98 1.24-1.2 1.5-.22.25-.44.28-.82.1-.38-.19-1.6-.59-3.05-1.88-1.13-1.01-1.89-2.25-2.11-2.63-.22-.38-.02-.58.17-.77.17-.17.38-.44.57-.66.19-.22.25-.38.38-.63.13-.25.06-.47-.03-.66-.1-.19-.86-2.07-1.18-2.83-.31-.74-.63-.64-.86-.65h-.73c-.25 0-.66.1-1.01.47-.35.38-1.33 1.3-1.33 3.17s1.36 3.68 1.55 3.93c.19.25 2.68 4.09 6.5 5.74.91.39 1.62.63 2.17.8.91.29 1.74.25 2.39.15.73-.11 2.26-.92 2.58-1.82.32-.9.32-1.66.22-1.82-.1-.16-.35-.25-.73-.44z"/>
          </svg>
        </div>
      </a>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-gradient-to-r from-green-700 to-emerald-600 shadow-2xl' : 'bg-gradient-to-r from-green-600/90 to-emerald-500/90 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative animate-spin-slow">
                <Leaf className="h-9 w-9 text-white group-hover:text-lime-200 transition-colors" />
              </div>
              <span className="text-2xl font-bold text-white drop-shadow-lg">Bageecha Resort</span>
            </div>
            <div className="hidden md:flex space-x-1">
              {['Home', 'About', 'Gallery', 'Menu', 'Events', 'Careers', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-white/90 hover:text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/20 font-medium">
                  {item}
                </a>
              ))}
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white hover:bg-white/20 p-2 rounded-lg transition-all">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2 animate-slideDown">
              {['Home', 'About', 'Gallery', 'Menu', 'Events', 'Careers', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="block text-white/90 hover:text-white py-2 px-4 rounded-lg hover:bg-white/10 transition-all">
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-300 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-300 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-emerald-300 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-green-400 rounded-full opacity-30 animate-float-particle"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${3 + (i % 3)}s`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
          <div className="mb-6 animate-slideInFromTop">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-semibold">Welcome to Paradise</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fadeInUp leading-tight">
            <span className="bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">Bageecha Resort</span>
          </h1>
          <p className="text-xl md:text-2xl text-green-800 mb-4 animate-fadeInUp animation-delay-200 font-light">
            Where Nature Meets Luxury
          </p>
          <p className="text-lg text-green-700 mb-10 animate-fadeInUp animation-delay-400">
            Escape to Tranquility in the Heart of Sitamarhi, Bihar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp animation-delay-600">
            <a href="#about" className="group relative bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105">
              <span className="relative z-10">Explore Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </a>
            <a href="#contact" className="group border-2 border-green-600 text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition-all duration-500 hover:shadow-lg">
              Get in Touch
            </a>
          </div>
          <div className="mt-12 flex items-center justify-center space-x-2 text-green-700 animate-bounce">
            <MapPin className="h-5 w-5" />
            <p className="text-sm md:text-base font-medium">Madhuban Goushala Road, Sitamarhi, Bihar</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" data-animate className={`py-24 bg-white relative overflow-hidden transition-all duration-1000 ${animationClass('about')}`}>
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-green-200 to-emerald-200"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-semibold mb-4">DISCOVER</span>
            <h2 className="text-5xl md:text-6xl font-bold text-green-900 mb-6">About Bageecha Resort</h2>
            <p className="text-lg text-green-700 max-w-2xl mx-auto leading-relaxed">Your perfect destination for relaxation, dining, and celebrations in a natural and refreshing atmosphere</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="group relative p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-green-100 hover:border-green-300" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-400 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500"></div>
                  <Icon className="h-12 w-12 text-green-600 mb-4 group-hover:text-emerald-600 group-hover:scale-110 transition-all duration-500" />
                  <h3 className="text-xl font-bold text-green-900 mb-2">{feature.title}</h3>
                  <p className="text-green-700">{feature.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: '🍽️', title: 'Multi-cuisine Restaurant', desc: 'Delicious cuisines prepared by expert chefs' },
              { emoji: '🏊', title: 'Swimming Pool Facility', desc: 'Cool off and relax in our modern pool' },
              { emoji: '🎤', title: 'Event Stage Setup', desc: 'Perfect venue for your celebrations' },
              { emoji: '🎠', title: 'Kids Play Zone', desc: 'Safe and fun space for children' },
              { emoji: '🎉', title: 'Event Arrangements', desc: 'Full customized event management' },
              { emoji: '🌿', title: 'Natural Ambiance', desc: 'Serene atmosphere in nature' },
            ].map((item, idx) => (
              <div key={idx} className="group p-8 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl hover:shadow-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-500 transform hover:-translate-y-2 border border-green-100 hover:border-green-400" style={{ animationDelay: `${idx * 80}ms` }}>
                <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-500 inline-block">{item.emoji}</div>
                <h3 className="text-xl font-bold text-green-900 mb-2">{item.title}</h3>
                <p className="text-green-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery / Highlights Slider */}
      <section id="gallery" className="py-24 bg-gradient-to-b from-green-50 to-emerald-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl animate-float"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-emerald-300 rounded-full mix-blend-multiply filter blur-2xl animate-float animation-delay-2000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-semibold mb-4">GALLERY</span>
            <h2 className="text-5xl md:text-6xl font-bold text-green-900 mb-6">Our Highlights</h2>
            <p className="text-green-700 text-lg max-w-2xl mx-auto">Experience the finest amenities and services at Bageecha Resort</p>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl border-2 border-green-200">
              <div
                className="flex transition-all duration-700 ease-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {slides.map((slide, idx) => (
                  <div key={idx} className="min-w-full relative">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-72 md:h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                      <h3 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">{slide.title}</h3>
                      <p className="text-lg text-white/90 max-w-xl drop-shadow">{slide.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-green-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-2xl z-10 group backdrop-blur-sm">
              <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-green-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-2xl z-10 group backdrop-blur-sm">
              <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex justify-center gap-3 mt-6">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-3 rounded-full transition-all duration-500 ${activeSlide === idx ? 'bg-gradient-to-r from-green-600 to-emerald-600 w-10' : 'bg-green-300 w-3 hover:bg-green-400'}`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {slides.map((slide, idx) => (
              <div
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`relative overflow-hidden rounded-xl cursor-pointer border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${activeSlide === idx ? 'border-green-500 shadow-lg' : 'border-transparent'}`}
              >
                <img src={slide.image} alt={slide.title} className="w-full h-24 md:h-32 object-cover" />
                <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${activeSlide === idx ? 'opacity-0' : 'opacity-30 hover:opacity-0'}`}></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-2">
                  <p className="text-white text-xs font-semibold truncate">{slide.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" data-animate className={`py-24 bg-white transition-all duration-1000 ${animationClass('events')}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-semibold mb-4">CELEBRATE</span>
            <h2 className="text-5xl md:text-6xl font-bold text-green-900 mb-6">Events & Celebrations</h2>
            <p className="text-lg text-green-700 max-w-2xl mx-auto">Make your special moments unforgettable with our comprehensive event services</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, idx) => (
              <div key={idx} className="group relative p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl hover:border-green-500 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden cursor-pointer" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-500 inline-block">{event.emoji}</div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">{event.title}</h3>
                  <p className="text-green-700">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" data-animate className={`py-24 bg-gradient-to-b from-green-50 to-emerald-50 transition-all duration-1000 ${animationClass('menu')}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-semibold mb-4">CULINARY</span>
            <h2 className="text-5xl md:text-6xl font-bold text-green-900 mb-6">Our Menu</h2>
            <p className="text-lg text-green-700 max-w-2xl mx-auto">Enjoy a wide variety of delicious cuisines prepared by experienced chefs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((menu, idx) => (
              <div key={idx} className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-green-100 hover:border-green-400 overflow-hidden relative" style={{ animationDelay: `${idx * 80}ms` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6 group-hover:from-emerald-600 group-hover:to-teal-600 transition-all">{menu.category}</h3>
                <ul className="space-y-3">
                  {menu.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-green-800 flex items-start group/item">
                      <span className="inline-block w-2 h-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mr-3 mt-2 group-hover/item:from-emerald-600 group-hover/item:to-teal-600 transition-all group-hover/item:scale-150"></span>
                      <span className="group-hover/item:text-green-900 transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" data-animate className={`py-24 bg-white transition-all duration-1000 ${animationClass('careers')}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-semibold mb-4">CAREERS</span>
            <h2 className="text-5xl md:text-6xl font-bold text-green-900 mb-6">Join Our Team</h2>
            <p className="text-lg text-green-700 max-w-2xl mx-auto">We are currently hiring passionate hospitality professionals</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careers.map((job, idx) => (
              <div
                key={idx}
                className="group p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl hover:shadow-2xl hover:from-green-100 hover:to-emerald-100 transition-all duration-500 transform hover:-translate-y-3 border border-green-100 hover:border-green-400 overflow-hidden relative"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-500 inline-block">{job.emoji}</div>
                  <h3 className="text-2xl font-bold text-green-900 mb-6">{job.title}</h3>
                  <a
                    href={whatsappCareersUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-xl"
                  >
                    <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white flex-shrink-0">
                      <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.83.74 5.49 2.04 7.8L.5 31.5l7.93-2.07A15.44 15.44 0 0 0 16 31.5c8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5zm0 28.3a12.7 12.7 0 0 1-6.48-1.77l-.46-.28-4.71 1.23 1.26-4.6-.3-.48A12.72 12.72 0 1 1 16 28.8zm7-9.48c-.38-.19-2.26-1.12-2.61-1.24-.35-.13-.6-.19-.86.19-.25.38-.98 1.24-1.2 1.5-.22.25-.44.28-.82.1-.38-.19-1.6-.59-3.05-1.88-1.13-1.01-1.89-2.25-2.11-2.63-.22-.38-.02-.58.17-.77.17-.17.38-.44.57-.66.19-.22.25-.38.38-.63.13-.25.06-.47-.03-.66-.1-.19-.86-2.07-1.18-2.83-.31-.74-.63-.64-.86-.65h-.73c-.25 0-.66.1-1.01.47-.35.38-1.33 1.3-1.33 3.17s1.36 3.68 1.55 3.93c.19.25 2.68 4.09 6.5 5.74.91.39 1.62.63 2.17.8.91.29 1.74.25 2.39.15.73-.11 2.26-.92 2.58-1.82.32-.9.32-1.66.22-1.82-.1-.16-.35-.25-.73-.44z"/>
                    </svg>
                    Apply on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" data-animate className={`py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 transition-all duration-1000 relative overflow-hidden ${animationClass('contact')}`}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-semibold mb-4">CONTACT</span>
            <h2 className="text-5xl md:text-6xl font-bold text-green-900 mb-6">Get In Touch</h2>
            <p className="text-lg text-green-700 max-w-2xl mx-auto">We're here to help and answer any questions you might have</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="group flex items-start space-x-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-green-100 hover:border-green-400">
                <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <Phone className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">Phone / WhatsApp</h3>
                  <p className="text-lg font-semibold text-green-600 hover:text-emerald-600 transition-colors"><a href="tel:+917277653665">+91 7277653665</a></p>
                  <p className="text-lg font-semibold text-green-600 hover:text-emerald-600 transition-colors"><a href="tel:+919430449128">+91 9430449128</a></p>
                </div>
              </div>
              <div className="group flex items-start space-x-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-green-100 hover:border-green-400">
                <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <MapPin className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">Address</h3>
                  <p className="text-green-700 leading-relaxed">Madhuban Goushala Road<br />Near Parori Pool, Sitamarhi<br />Dumra, Bihar - Ward No 21</p>
                </div>
              </div>
              <div className="group flex items-start space-x-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-green-100 hover:border-green-400">
                <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <Mail className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">Email</h3>
                  <a href="mailto:md.monazir7@gmail.com" className="text-green-700 hover:text-emerald-600 transition-colors">md.monazir7@gmail.com</a>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-6 bg-white p-8 rounded-2xl shadow-2xl border border-green-100">
                <input type="text" placeholder="Your Name" className="w-full px-6 py-4 border-2 border-green-200 rounded-lg focus:border-green-600 focus:outline-none transition-all duration-300 focus:shadow-lg text-green-900 placeholder-green-400" />
                <input type="email" placeholder="Your Email" className="w-full px-6 py-4 border-2 border-green-200 rounded-lg focus:border-green-600 focus:outline-none transition-all duration-300 focus:shadow-lg text-green-900 placeholder-green-400" />
                <input type="tel" placeholder="Your Phone" className="w-full px-6 py-4 border-2 border-green-200 rounded-lg focus:border-green-600 focus:outline-none transition-all duration-300 focus:shadow-lg text-green-900 placeholder-green-400" />
                <textarea placeholder="Your Message" rows={4} className="w-full px-6 py-4 border-2 border-green-200 rounded-lg focus:border-green-600 focus:outline-none transition-all duration-300 focus:shadow-lg text-green-900 placeholder-green-400 resize-none" />
                <button type="submit" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:from-green-700 hover:to-emerald-700">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-green-900 via-emerald-900 to-green-950 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="group animate-fadeInUp">
              <div className="flex items-center space-x-3 mb-4">
                <Leaf className="h-10 w-10 text-lime-300 group-hover:rotate-12 transition-transform duration-500" />
                <span className="text-3xl font-bold">Bageecha Resort</span>
              </div>
              <p className="text-green-100 leading-relaxed">Your perfect destination for relaxation, dining, and celebrations in Sitamarhi, Bihar.</p>
            </div>
            <div className="animate-fadeInUp animation-delay-200">
              <h3 className="text-xl font-bold mb-6 text-lime-300">Quick Links</h3>
              <ul className="space-y-3">
                {['Home', 'About', 'Gallery', 'Menu', 'Events', 'Careers', 'Contact'].map((item) => (
                  <li key={item}><a href={`#${item.toLowerCase()}`} className="text-green-100 hover:text-lime-300 transition-all duration-300 hover:translate-x-2 inline-block">{item}</a></li>
                ))}
              </ul>
            </div>
            <div className="animate-fadeInUp animation-delay-400">
              <h3 className="text-xl font-bold mb-6 text-lime-300">Contact Info</h3>
              <p className="text-green-100 mb-2">+91 7277653665</p>
              <p className="text-green-100 mb-2">+91 9430449128</p>
              <p className="text-green-100 mb-2">md.monazir7@gmail.com</p>
              <p className="text-green-100 text-sm">Sitamarhi, Bihar</p>
            </div>
          </div>
          <div className="border-t border-green-700 pt-8 text-center">
            <p className="text-green-200 mb-3">&copy; 2024 Bageecha Resort. All rights reserved.</p>
            <p className="text-green-200">Developed by <a href="https://snhrsolution.com" target="_blank" rel="noopener noreferrer" className="text-lime-300 hover:text-white transition-colors font-bold hover:underline">S.N HR Solution</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
