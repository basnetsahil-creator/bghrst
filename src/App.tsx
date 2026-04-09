import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, MapPin, Phone, Mail, Leaf } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
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
    { title: 'Multi-Cuisine Restaurant', icon: '🍽️', desc: 'Exquisite dining with flavors from around the world' },
    { title: 'Swimming Pool', icon: '🏊', desc: 'Cool off and relax in our beautiful pool facility' },
    { title: 'Event Stage Setup', icon: '🎤', desc: 'Perfect venue for your celebrations' },
    { title: 'Kids Play Zone', icon: '🎠', desc: 'Fun and safe space for children' },
  ];

  const menuItems = [
    { category: '🇮🇳 North Indian Cuisine', items: ['Butter Chicken', 'Dal Makhani', 'Tandoori Specialties', 'Naan & Breads'] },
    { category: '🇨🇳 Chinese Dishes', items: ['Hakka Noodles', 'Fried Rice', 'Manchurian', 'Spring Rolls'] },
    { category: '🔥 Tandoor Specialties', items: ['Tandoori Chicken', 'Paneer Tikka', 'Seekh Kebab', 'Fish Tandoori'] },
    { category: '🥙 Arabic Cuisine', items: ['Shawarma', 'Falafel', 'Hummus', 'Kebabs'] },
    { category: '🍔 Fast Food', items: ['Burgers', 'Pizzas', 'Fries', 'Hot Dogs'] },
    { category: '☕ Beverages', items: ['Special Tea', 'Coffee', 'Cold Drinks', 'Shakes'] },
  ];

  const events = [
    { emoji: '🍴', title: 'À La Carte Dining', desc: 'Customized dining experience' },
    { emoji: '🎂', title: 'Birthday Parties', desc: 'Make birthdays memorable' },
    { emoji: '💍', title: 'Anniversaries', desc: 'Celebrate special moments' },
    { emoji: '🤝', title: 'Corporate Meetings', desc: 'Professional event hosting' },
    { emoji: '👨‍👩‍👧‍👦', title: 'Family Gatherings', desc: 'Bring family together' },
    { emoji: '💒', title: 'Wedding & Receptions', desc: 'Grand celebration venues' },
  ];

  const careers = [
    { emoji: '👨‍🍳', title: 'Multi-Cuisine Chef', phone: '+91 8521745856' },
    { emoji: '🍔', title: 'Fast Food Chef', phone: '+91 8521745856' },
    { emoji: '🤵', title: 'Waiter / Waitress', phone: '+91 8521745856' },
    { emoji: '🧹', title: 'Cleaner', phone: '+91 8521745856' },
    { emoji: '🍽️', title: 'Dishwasher', phone: '+91 8521745856' },
    { emoji: '🏊', title: 'Lifeguard', phone: '+91 8521745856' },
  ];

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const animationClass = (id: string) => visibleSections[id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';

  return (
    <div className="min-h-screen bg-white">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/80 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 group cursor-pointer">
              <Leaf className="h-8 w-8 text-emerald-600 group-hover:rotate-12 transition-transform" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Bageecha</span>
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Menu', 'Events', 'Careers', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                  {item}
                </a>
              ))}
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2 animate-slideDown">
              {['Home', 'About', 'Menu', 'Events', 'Careers', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block text-gray-700 hover:text-emerald-600 py-2">
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20 animate-zoomSlow"></div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fadeInUp">
            Welcome to <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Bageecha Resort</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 animate-fadeInUp animation-delay-200">
            Your Perfect Destination for Relaxation, Dining & Celebrations
          </p>
          <p className="text-lg text-gray-500 mb-8 animate-fadeInUp animation-delay-400">
            Located in Sitamarhi, Bihar – Where Nature Meets Hospitality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp animation-delay-600">
            <a href="#about" className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105">
              Explore Now
            </a>
            <a href="#contact" className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-all">
              Get Directions
            </a>
          </div>
        </div>
      </section>

      <section id="about" data-animate className={`py-20 bg-white transition-all duration-1000 ${animationClass('about')}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Us</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto"></div>
          </div>
          <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto leading-relaxed">
            Welcome to Bageecha Resort, Sitamarhi, Bihar – your perfect destination for relaxation, dining, and celebrations in a natural and refreshing atmosphere.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { emoji: '🍽️', title: 'Multi-cuisine Restaurant', desc: 'Delicious cuisines prepared by expert chefs' },
              { emoji: '🏊', title: 'Swimming Pool Facility', desc: 'Cool off and relax in our modern pool' },
              { emoji: '🎤', title: 'Event Stage Setup', desc: 'Perfect venue for your celebrations' },
              { emoji: '🎠', title: 'Kids Play Zone', desc: 'Safe and fun space for children' },
              { emoji: '🎉', title: 'Event Arrangements', desc: 'Full customized event management' },
              { emoji: '🌿', title: 'Natural Ambiance', desc: 'Serene atmosphere in nature' },
            ].map((item, idx) => (
              <div key={idx} className="group p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl hover:shadow-xl transition-all transform hover:-translate-y-2 hover:from-emerald-100 hover:to-teal-100" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">{item.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">Our Highlights</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto mb-16"></div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div className="flex transition-all duration-500" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                {slides.map((slide, idx) => (
                  <div key={idx} className="min-w-full p-12 md:p-20 text-center">
                    <div className="text-7xl mb-6 animate-bounce">{slide.icon}</div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{slide.title}</h3>
                    <p className="text-xl text-gray-600">{slide.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 transition-all transform hover:scale-110">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 transition-all transform hover:scale-110">
              <ChevronRight size={24} />
            </button>
            <div className="flex justify-center gap-2 mt-8">
              {slides.map((_, idx) => (
                <button key={idx} onClick={() => setActiveSlide(idx)} className={`h-3 rounded-full transition-all ${activeSlide === idx ? 'bg-emerald-600 w-8' : 'bg-gray-300 w-3'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="events" data-animate className={`py-20 bg-white transition-all duration-1000 ${animationClass('events')}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">Events & Celebrations</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto mb-16"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, idx) => (
              <div key={idx} className="group p-8 bg-gradient-to-br from-white to-emerald-50 border-2 border-emerald-200 rounded-2xl hover:border-emerald-600 hover:shadow-xl transition-all transform hover:-translate-y-2 cursor-pointer" style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">{event.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600">{event.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="menu" data-animate className={`py-20 bg-gradient-to-br from-emerald-50 to-teal-50 transition-all duration-1000 ${animationClass('menu')}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">Our Menu</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto mb-4 text-center"></div>
          <p className="text-center text-gray-600 mb-16 text-lg">Enjoy a wide variety of delicious cuisines prepared by experienced chefs</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((menu, idx) => (
              <div key={idx} className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2" style={{ animationDelay: `${idx * 100}ms` }}>
                <h3 className="text-2xl font-bold text-emerald-600 mb-6 group-hover:text-teal-600 transition-colors">{menu.category}</h3>
                <ul className="space-y-3">
                  {menu.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-gray-700 flex items-start">
                      <span className="inline-block w-2 h-2 bg-emerald-600 rounded-full mr-3 mt-2 group-hover:bg-teal-600 transition-colors"></span>
                      <span className="group-hover:text-emerald-600 transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="careers" data-animate className={`py-20 bg-white transition-all duration-1000 ${animationClass('careers')}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">Join Our Team</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto mb-16"></div>
          <p className="text-center text-gray-600 mb-16 text-lg">We are currently hiring passionate hospitality professionals</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careers.map((job, idx) => (
              <a key={idx} href={`tel:${job.phone.replace(/\D/g, '')}`} className="group p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl hover:shadow-xl hover:from-emerald-100 hover:to-teal-100 transition-all transform hover:-translate-y-2 cursor-pointer">
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">{job.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{job.title}</h3>
                <p className="text-emerald-600 font-semibold group-hover:text-teal-600 transition-colors">{job.phone}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" data-animate className={`py-20 bg-gradient-to-br from-emerald-50 to-teal-50 transition-all duration-1000 ${animationClass('contact')}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">Inquiry & Reservations</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto mb-16"></div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4 group">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Phone / WhatsApp</h3>
                  <p className="text-lg text-emerald-600 font-semibold hover:text-teal-600"><a href="tel:+917277653665">+91 7277653665</a></p>
                  <p className="text-lg text-emerald-600 font-semibold hover:text-teal-600"><a href="tel:+919430449128">+91 9430449128</a></p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-600">Madhuban Goushala Road<br />Near Parori Pool, Sitamarhi<br />Dumra, Bihar - Ward No 21</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600">info@bageecha-resort.com</p>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-6 bg-white p-8 rounded-2xl shadow-lg">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-600 focus:outline-none transition-colors" />
                <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-600 focus:outline-none transition-colors" />
                <input type="tel" placeholder="Your Phone" className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-600 focus:outline-none transition-colors" />
                <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-600 focus:outline-none transition-colors" />
                <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-8 w-8 text-emerald-500" />
                <span className="text-2xl font-bold">Bageecha Resort</span>
              </div>
              <p className="text-gray-400">Your perfect destination for relaxation, dining, and celebrations in Sitamarhi, Bihar.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'About', 'Menu', 'Events', 'Careers', 'Contact'].map((item) => (
                  <li key={item}><a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-emerald-500 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">+91 7277653665</p>
              <p className="text-gray-400">+91 9430449128</p>
              <p className="text-gray-400 text-sm mt-2">Sitamarhi, Bihar</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p className="mb-2">&copy; 2024 Bageecha Resort. All rights reserved.</p>
            <p>Developed by <a href="https://snhrsolution.com" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-400 transition-colors font-semibold">S.N HR Solution</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
