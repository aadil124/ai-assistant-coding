import React, { useState } from 'react';

export default function HomeShowcase({ onNavigate, user, onLogout, onOpenAuth }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('Anywhere (Online)');

  const specialties = [
    { name: 'General Medicine', icon: 'stethoscope' },
    { name: 'Mental Health', icon: 'psychology' },
    { name: 'Pediatrics', icon: 'child_care' },
    { name: 'Cardiology', icon: 'favorite' },
    { name: 'Dentistry', icon: 'dentistry' },
    { name: 'Dermatology', icon: 'join' }
  ];

  const doctors = [
    {
      name: 'Dr. Marcus Chen',
      specialty: 'Mental Health Specialist',
      experience: 'Harvard Medical School • 12 years experience',
      price: '$45',
      rating: '4.9 (1.2k reviews)',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr6bqhVYPog40sZunA_jmudMZwzE485FmLO8efXUb_qMann5-ogcse7wIb1DmlHd8zGMZMYFGznOjC_njUoiUFID7AA50kHrqSUVc_z6pYbWVS9ZnJFr98lTLqG1RHvseaDFBBn2dVOolHGF5OUV_-Jz6oPbW5kN-5etqBqACsuTN-k0csbWzfAK43EEmNoe-pLkra-fCM48U077Ork1yj3ESMVgM0rTecQCy8l3TYqAVjkQx4RkyVq-9U8tDmHxMI9h9lXsdeD4H9'
    },
    {
      name: 'Dr. Elena Rodriguez',
      specialty: 'Pediatrics',
      experience: 'Stanford University • 8 years experience',
      price: '$39',
      rating: '5.0 (850 reviews)',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQrBHpsbRhjZfGHKrtWqqogZxmFzrEjwgHCVcWFSLzoKqgEYMDcSFLAUU9ZmK1K4jVDgG_yuH-qJbi2GNxLW45SOv3pgjkcjndQ34Wq6CF6bPDk-7-11_b_tSZrf1r3mFnqbr5dFPia7aUaBCZXd-GCp9dWYM03xUsu5XpxFW3R74OLG6TYBj3__jiihhR9Ga55BOfCJSR8uFvcloPbE--q3kff4YBxOBkfz1BwgZtKe0ZTSpW1bOaq9xZmyVeTCwU2UuSuGwlyKxA'
    },
    {
      name: 'Dr. James Wilson',
      specialty: 'General Medicine',
      experience: 'Johns Hopkins • 20 years experience',
      price: '$35',
      rating: '4.8 (2.4k reviews)',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAihhLPDV8jn8ctJXrILu8uaQ5Z_Oq5SFh6v5W3DEi_CfG0-hgPEExCLe39Y6x595R4yUrddkcA3ai5SOqSUg6wHTzd5WIciHrHlfdMA6t6uWZ5w_7SdWZkNXhr3cqZjkMciKbkMintYb8-pzz0H7P0ZAZH0rgDsQBWy93Rz0l_os3YxvaSLAHSGVgGjCpAglR-ZiZohuu9r8J_4mimPrDiJz0a67dDn44LwupAdFLuSmZ9Uq8m90OdP_hiSYaCClSpIQ3GJavI-Je'
    }
  ];

  return (
    <div className="bg-background text-on-surface">
      {/* Top Navigation Bar */}
      <header className="bg-surface/80 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-outline-variant/10">
        <div className="flex justify-between items-center w-full px-gutter max-w-7xl mx-auto h-16">
          <div className="flex items-center gap-xl">
            <span className="font-display text-h3 font-bold text-primary cursor-pointer" onClick={() => onNavigate('home')}>
              Telehealth Connect
            </span>
            <nav className="hidden md:flex gap-lg">
              <button className="font-body text-body-lg text-primary border-b-2 border-primary font-semibold py-1">Home</button>
              <button className="font-body text-body-lg text-on-surface-variant hover:text-primary transition-colors py-1 border-0 bg-transparent" onClick={() => onNavigate('dashboard')}>Dashboard</button>
              <button className="font-body text-body-lg text-on-surface-variant hover:text-primary transition-colors py-1 border-0 bg-transparent" onClick={() => onNavigate('consultation')}>Consultation</button>
            </nav>
          </div>
          <div className="flex items-center gap-md">
            {user ? (
              <div className="d-flex items-center gap-3">
                <span className="font-body text-label-md text-on-surface-variant hidden lg:inline">Logged in as: <strong>{user.email}</strong></span>
                <button className="btn btn-outline-secondary rounded-full px-4 text-label-md font-semibold" onClick={onLogout}>
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <button className="btn btn-outline-primary rounded-full px-4 text-label-md font-semibold" onClick={() => onOpenAuth('login')}>
                  Log In
                </button>
                <button className="btn btn-primary rounded-full px-4 text-label-md font-semibold" onClick={() => onOpenAuth('signup')}>
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-gradient pt-5 pb-5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-gutter text-center flex flex-col items-center py-5">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-label-md text-label-md mb-4 inline-block">
            Healthcare Reimagined
          </span>
          <h1 className="font-display text-h1-mobile md:text-display text-on-surface max-w-4xl mx-auto leading-tight mb-4">
            Healthcare that feels like home.
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-5">
            Connect with verified primary and specialty medical professionals for online appointments, digital prescriptions, and record shares.
          </p>

          {/* Search Bar Container */}
          <div className="w-full max-w-3xl glass-card p-2 rounded-full shadow-lg d-flex flex-column flex-md-row items-center gap-2 mt-3">
            <div className="flex-1 d-flex items-center px-3 gap-2 border-bottom border-md-0 border-md-end border-outline-variant w-full h-12">
              <span className="material-symbols-outlined text-primary">search</span>
              <input
                className="bg-transparent border-0 focus:outline-none focus:ring-0 w-full font-body text-body"
                placeholder="Specialty or doctor name"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 d-flex items-center px-3 gap-2 w-full h-12">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <select
                className="bg-transparent border-0 focus:outline-none focus:ring-0 w-full font-body text-body text-on-surface-variant"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              >
                <option>Anywhere (Online)</option>
                <option>Near me</option>
              </select>
            </div>
            <button 
              className="btn btn-primary h-12 px-4 rounded-full font-label-md active:scale-95 transition-all w-full w-md-auto"
              onClick={() => onNavigate('dashboard')}
            >
              Search Doctors
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-5 d-flex flex-wrap justify-content-center gap-4 opacity-80">
            <div className="d-flex items-center gap-1">
              <span className="material-symbols-outlined text-tertiary">verified_user</span>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">HIPAA Compliant</span>
            </div>
            <div className="d-flex items-center gap-1">
              <span className="material-symbols-outlined text-tertiary">support_agent</span>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">24/7 Support</span>
            </div>
            <div className="d-flex items-center gap-1">
              <span className="material-symbols-outlined text-tertiary">medical_services</span>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Verified Doctors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Grid */}
      <section className="py-5 bg-surface">
        <div className="max-w-7xl mx-auto px-gutter py-4">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div className="max-w-xl">
              <h2 className="font-display text-h2 text-on-surface mb-2">Medical Specialties</h2>
              <p className="font-body text-body-lg text-on-surface-variant">
                Access top-tier care across various departments from the comfort of your couch.
              </p>
            </div>
            <button className="text-primary font-label-md d-flex align-items-center gap-1 hover:underline underline-offset-4" onClick={() => onNavigate('dashboard')}>
              View All <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-lg">
            {specialties.map((spec, i) => (
              <div 
                key={i} 
                className="bg-surface-container-low p-xl rounded-xl text-center hover-lift cursor-pointer group"
                onClick={() => onNavigate('dashboard')}
              >
                <div className="w-16 h-16 bg-white rounded-full d-flex items-center justify-content-center mx-auto mb-3 shadow-sm group-hover:bg-primary-container transition-colors">
                  <span className="material-symbols-outlined text-primary text-[32px] group-hover:text-on-primary-container">
                    {spec.icon}
                  </span>
                </div>
                <span className="font-label-md text-label-md block">{spec.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-gutter py-4">
          <div className="text-center mb-5">
            <h2 className="font-display text-h2 text-on-surface mb-2">Easy care in 3 steps</h2>
            <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Skip the waiting room. Connect with experts in minutes from your smartphone or computer.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-2xl">
            {/* Step 1 */}
            <div className="position-relative">
              <div className="position-absolute top-0 end-0 text-display opacity-10 font-bold leading-none select-none">01</div>
              <div className="pt-xl">
                <div className="w-12 h-12 bg-primary rounded-lg d-flex items-center justify-center mb-lg">
                  <span className="material-symbols-outlined text-on-primary">search</span>
                </div>
                <h3 className="font-h3 text-on-surface mb-2">Find your Doctor</h3>
                <p className="font-body text-body text-on-surface-variant">
                  Browse through our directory of thousands of verified specialists based on your needs and insurance.
                </p>
              </div>
            </div>
            {/* Step 2 */}
            <div className="position-relative">
              <div className="position-absolute top-0 end-0 text-display opacity-10 font-bold leading-none select-none">02</div>
              <div className="pt-xl">
                <div className="w-12 h-12 bg-primary rounded-lg d-flex items-center justify-center mb-lg">
                  <span className="material-symbols-outlined text-on-primary">calendar_month</span>
                </div>
                <h3 className="font-h3 text-on-surface mb-2">Book an appointment</h3>
                <p className="font-body text-body text-on-surface-variant">
                  Select a time that works for you. Most patients can see a doctor within 24 hours of booking.
                </p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="position-relative">
              <div className="position-absolute top-0 end-0 text-display opacity-10 font-bold leading-none select-none">03</div>
              <div className="pt-xl">
                <div className="w-12 h-12 bg-primary rounded-lg d-flex items-center justify-center mb-lg">
                  <span className="material-symbols-outlined text-on-primary">videocam</span>
                </div>
                <h3 className="font-h3 text-on-surface mb-2">Start Consultation</h3>
                <p className="font-body text-body text-on-surface-variant">
                  Join a secure HD video call. Get diagnoses, treatment plans, and prescriptions sent to your local pharmacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Showcase */}
      <section className="py-5 bg-surface">
        <div className="max-w-7xl mx-auto px-gutter py-4">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div className="max-w-xl">
              <h2 className="font-display text-h2 text-on-surface mb-2">Meet our top-rated clinicians</h2>
              <p className="font-body text-body-lg text-on-surface-variant">
                World-class medical experts, peer-reviewed and highly rated by our community.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
            {doctors.map((doc, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden border border-outline-variant hover-lift shadow-sm">
                <div className="h-64 position-relative">
                  <img alt={doc.name} className="w-full h-full object-cover" src={doc.avatar} />
                  <div className="position-absolute top-3 end-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg d-flex align-items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-[#FBBF24] text-sm">star</span>
                    <span className="font-label-md text-label-sm">{doc.rating}</span>
                  </div>
                </div>
                <div className="p-lg">
                  <span className="text-primary font-label-md text-label-sm uppercase tracking-wider mb-2 block">
                    {doc.specialty}
                  </span>
                  <h4 className="font-h3 text-on-surface mb-1">{doc.name}</h4>
                  <p className="font-body text-label-md text-on-surface-variant mb-4">{doc.experience}</p>
                  <div className="d-flex align-items-center justify-content-between border-top border-outline-variant pt-3">
                    <span className="font-label-md text-on-surface-variant">
                      Starting at <strong className="text-on-surface">{doc.price}</strong>
                    </span>
                    <button 
                      className="btn btn-primary-container text-on-primary-container px-3 py-1 rounded-lg font-label-md hover:bg-primary-container/80 transition-colors"
                      onClick={() => onNavigate('dashboard')}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Healthcare Statistics */}
      <section className="py-5 bg-primary-container text-on-primary-container">
        <div className="max-w-7xl mx-auto px-gutter py-2">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-xl text-center">
            <div>
              <div className="font-display text-display leading-tight">5M+</div>
              <div className="font-body text-label-md uppercase tracking-widest opacity-80 mt-2">Consultations</div>
            </div>
            <div>
              <div className="font-display text-display leading-tight">15k+</div>
              <div className="font-body text-label-md uppercase tracking-widest opacity-80 mt-2">Verified Doctors</div>
            </div>
            <div>
              <div className="font-display text-display leading-tight">98%</div>
              <div className="font-body text-label-md uppercase tracking-widest opacity-80 mt-2">Patient Satisfaction</div>
            </div>
            <div>
              <div className="font-display text-display leading-tight">100+</div>
              <div className="font-body text-label-md uppercase tracking-widest opacity-80 mt-2">Specialities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-5 position-relative overflow-hidden">
        <div className="position-absolute inset-0 hero-gradient opacity-40"></div>
        <div className="max-w-7xl mx-auto px-gutter position-relative z-10 py-4">
          <div className="bg-surface glass-card rounded-3xl p-4 md:p-5 text-center shadow-xl border border-white">
            <h2 className="font-display text-h1-mobile md:text-h1 text-on-surface mb-3">Ready for better care?</h2>
            <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-4">
              Join over 5 million patients who trust Telehealth Connect for their primary and specialized medical needs. Secure, fast, and professional.
            </p>
            <div className="d-flex flex-column sm:flex-row justify-content-center gap-3">
              <button 
                className="btn btn-primary h-14 px-5 rounded-full font-h3 active:scale-95 shadow-lg shadow-primary/20"
                onClick={() => onNavigate('dashboard')}
              >
                Book your first consultation today
              </button>
              <button 
                className="btn btn-light h-14 px-5 rounded-full font-h3 hover:bg-surface-container-highest transition-all border"
                onClick={() => onNavigate('dashboard')}
              >
                How it works
              </button>
            </div>
            <p className="mt-4 text-label-sm text-outline font-body d-flex items-center justify-content-center gap-1">
              <span className="material-symbols-outlined text-[16px]">lock</span> Secure, HIPAA-compliant encryption on all calls.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-lowest py-5 border-top border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-gutter d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">
          <div className="d-flex flex-column align-items-center align-items-md-start gap-1">
            <span className="font-display text-h3 font-bold text-primary">Telehealth Connect</span>
            <span className="font-body text-label-sm text-on-surface-variant opacity-80">
              © 2026 Telehealth Connect. HIPAA Compliant.
            </span>
          </div>
          <nav className="d-flex flex-wrap justify-content-center gap-4">
            <a className="font-body text-label-sm text-on-surface-variant hover:text-primary underline underline-offset-4" href="#">Privacy Policy</a>
            <a className="font-body text-label-sm text-on-surface-variant hover:text-primary underline underline-offset-4" href="#">Terms of Service</a>
            <a className="font-body text-label-sm text-on-surface-variant hover:text-primary underline underline-offset-4" href="#">Security</a>
            <a className="font-body text-label-sm text-on-surface-variant hover:text-primary underline underline-offset-4" href="#">Contact Support</a>
          </nav>
          <div className="d-flex gap-3">
            <a className="w-10 h-10 rounded-full bg-surface-container-high d-flex items-center justify-center hover:bg-primary/10 transition-colors" href="#">
              <span className="material-symbols-outlined text-primary">public</span>
            </a>
            <a className="w-10 h-10 rounded-full bg-surface-container-high d-flex items-center justify-center hover:bg-primary/10 transition-colors" href="#">
              <span className="material-symbols-outlined text-primary">mail</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
