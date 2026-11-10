import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  Users,
  Search,
  Star,
  Shield,
  Award,
  Sparkles,
  ArrowRight,
  Play,
  Menu,
  X,
  Heart
} from 'lucide-react';

interface HomePageProps {
  onReplayIntro?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onReplayIntro }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const destinations = [
    {
      id: 1,
      title: "Villa Bellissima",
      location: "Positano, Amalfi Coast",
      price: "$2,850",
      rating: 4.98,
      reviews: 42,
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
      tag: "Oceanfront Cliffside"
    },
    {
      id: 2,
      title: "Komorebi Forest Sanctuary",
      location: "Kyoto, Japan",
      price: "$1,950",
      rating: 5.0,
      reviews: 38,
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
      tag: "Private Onsen"
    },
    {
      id: 3,
      title: "The Matterhorn Alpine Chalet",
      location: "Zermatt, Switzerland",
      price: "$3,400",
      rating: 4.96,
      reviews: 56,
      image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1000&q=80",
      tag: "Ski-in Ski-out"
    },
    {
      id: 4,
      title: "Azure Overwater Estate",
      location: "Bora Bora, French Polynesia",
      price: "$4,100",
      rating: 4.99,
      reviews: 64,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
      tag: "Private Lagoon"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-gold-500/30 selection:text-neutral-900">
      {/* Top Banner & Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/70 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-neutral-900">
              Wander<span className="text-amber-700 italic">Lux</span>
            </span>
            <span className="hidden md:inline-block text-[10px] uppercase tracking-widest text-neutral-400 border-l border-neutral-300 pl-3">
              Haute Hospitality
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-neutral-600">
            <a href="#destinations" className="hover:text-amber-700 transition-colors">Destinations</a>
            <a href="#experiences" className="hover:text-amber-700 transition-colors">Experiences</a>
            <a href="#villas" className="hover:text-amber-700 transition-colors">Private Villas</a>
            <a href="#concierge" className="hover:text-amber-700 transition-colors">Concierge</a>
            <a href="#journal" className="hover:text-amber-700 transition-colors">Journal</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                title="Replay Logo Intro Animation"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wider uppercase border border-neutral-200 text-neutral-600 hover:text-amber-800 hover:border-amber-600 hover:bg-amber-50/50 transition-all cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Replay Intro</span>
              </button>
            )}

            <button className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-neutral-900 text-white hover:bg-neutral-800 transition-all shadow-sm">
              Reserve Stay
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 hover:text-neutral-900"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-neutral-200 bg-white px-6 py-4 space-y-3 text-sm">
            <a href="#destinations" className="block text-neutral-700 hover:text-amber-700">Destinations</a>
            <a href="#experiences" className="block text-neutral-700 hover:text-amber-700">Experiences</a>
            <a href="#villas" className="block text-neutral-700 hover:text-amber-700">Private Villas</a>
            <a href="#concierge" className="block text-neutral-700 hover:text-amber-700">Concierge</a>
            {onReplayIntro && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReplayIntro();
                }}
                className="flex items-center gap-2 pt-2 text-amber-800 font-medium text-xs uppercase tracking-wider"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Replay Logo Intro
              </button>
            )}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/60 border border-amber-200/80 text-amber-900 text-xs tracking-widest uppercase font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Bespoke Sanctuary Collections
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-neutral-900 tracking-tight leading-[1.1]">
            Where Extraordinary <span className="italic font-serif">Journeys</span> Unfold.
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto font-light leading-relaxed">
            Discover secluded estates, heritage retreats, and private island sanctuaries handpicked for the discerning traveler.
          </p>
        </div>

        {/* Luxury Booking Search Bar */}
        <div className="mt-10 sm:mt-12 max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-full p-2.5 sm:p-3 shadow-xl shadow-neutral-200/60 border border-neutral-200/80 grid grid-cols-1 sm:grid-cols-4 gap-2 items-center">
          <div className="px-4 py-2 border-b sm:border-b-0 sm:border-r border-neutral-100 flex items-center gap-3">
            <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400">Destination</p>
              <input
                type="text"
                placeholder="Where to?"
                className="w-full bg-transparent text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="px-4 py-2 border-b sm:border-b-0 sm:border-r border-neutral-100 flex items-center gap-3">
            <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400">Dates</p>
              <input
                type="text"
                placeholder="Check in - out"
                className="w-full bg-transparent text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="px-4 py-2 border-b sm:border-b-0 sm:border-r border-neutral-100 flex items-center gap-3">
            <Users className="w-4 h-4 text-amber-700 shrink-0" />
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400">Guests</p>
              <input
                type="text"
                placeholder="2 Guests"
                className="w-full bg-transparent text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-1">
            <button className="w-full py-3.5 px-6 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
              <Search className="w-4 h-4" />
              <span>Explore</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section id="destinations" className="py-16 bg-white/70 border-y border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-amber-800 font-semibold mb-2">Curated Portfolios</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900">Handpicked Estates & Sanctuaries</h2>
            </div>
            <a href="#all" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-neutral-800 hover:text-amber-800 transition-colors">
              View All 140+ Properties <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="group bg-neutral-50/60 rounded-2xl overflow-hidden border border-neutral-200/70 hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] tracking-wider uppercase font-medium">
                    {dest.tag}
                  </div>
                  <button
                    onClick={() => toggleFavorite(dest.id)}
                    aria-label="Add to favorites"
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-neutral-700 transition-all shadow-sm"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.includes(dest.id)
                          ? 'fill-rose-500 text-rose-500'
                          : 'text-neutral-600'
                      }`}
                    />
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                      <span>{dest.location}</span>
                      <span className="flex items-center gap-1 text-neutral-800 font-medium">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        {dest.rating}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-medium text-neutral-900 group-hover:text-amber-800 transition-colors">
                      {dest.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-200/60 flex items-center justify-between">
                    <div>
                      <span className="text-base font-semibold text-neutral-900">{dest.price}</span>
                      <span className="text-xs text-neutral-500 font-light"> / night</span>
                    </div>
                    <button className="text-xs uppercase tracking-wider font-semibold text-amber-800 hover:text-amber-950">
                      Reserve →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Services */}
      <section id="experiences" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-neutral-200/70 space-y-4">
            <Award className="w-8 h-8 text-amber-700" />
            <h3 className="font-serif text-xl font-medium text-neutral-900">Vetted Hospitality</h3>
            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              Every property undergoes an uncompromising 240-point verification for privacy, architecture, and discreet white-glove service.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-neutral-200/70 space-y-4">
            <Compass className="w-8 h-8 text-amber-700" />
            <h3 className="font-serif text-xl font-medium text-neutral-900">24/7 Dedicated Concierge</h3>
            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              From superyacht charters to private aviation and impossible dinner reservations, your personal concierge manages every detail.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-neutral-200/70 space-y-4">
            <Shield className="w-8 h-8 text-amber-700" />
            <h3 className="font-serif text-xl font-medium text-neutral-900">Absolute Privacy</h3>
            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              End-to-end discreet bookings with dedicated security protocols and confidential bespoke arrangements for high-profile guests.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-300 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <span className="font-serif text-2xl font-semibold tracking-wider text-white">
              Wander<span className="text-amber-500 italic">Lux</span>
            </span>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Curated luxury travel, private estates, and unforgettable global moments for the world's most discerning explorers.
            </p>
            <p className="text-[11px] text-neutral-500 font-mono">
              © {new Date().getFullYear()} WanderLux International. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-medium mb-4">Destinations</h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-light">
              <li><a href="#amalfi" className="hover:text-white">Amalfi Coast, Italy</a></li>
              <li><a href="#kyoto" className="hover:text-white">Kyoto, Japan</a></li>
              <li><a href="#swiss" className="hover:text-white">Swiss Alps, Switzerland</a></li>
              <li><a href="#borabora" className="hover:text-white">Bora Bora, French Polynesia</a></li>
              <li><a href="#aspen" className="hover:text-white">Aspen, Colorado</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-medium mb-4">Experiences</h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-light">
              <li><a href="#aviation" className="hover:text-white">Private Aviation</a></li>
              <li><a href="#yachts" className="hover:text-white">Yacht Charters</a></li>
              <li><a href="#culinary" className="hover:text-white">Culinary Residencies</a></li>
              <li><a href="#wellness" className="hover:text-white">Wellness Retreats</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-medium mb-4">Contact & Inquiry</h4>
            <p className="text-xs text-neutral-400 font-light mb-3">
              Direct Concierge Desk: <br />
              <span className="text-amber-400">+1 (800) 892-LUXE</span>
            </p>
            <p className="text-xs text-neutral-400 font-light">
              Inquiries: concierge@wanderlux.travel
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

