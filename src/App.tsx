import { useState, useEffect, useRef } from 'react';

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const parallaxOffset = scrollY * 0.3;

  return (
    <div className="min-h-screen bg-[#0a0f0d] text-[#f5f1eb] overflow-x-hidden selection:bg-[#c9a66b] selection:text-[#0a0f0d]">
      {/* Noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating cursor follower */}
      <div
        className="fixed w-64 h-64 rounded-full pointer-events-none z-40 hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(201, 166, 107, 0.08) 0%, transparent 70%)',
          left: mousePos.x - 128,
          top: mousePos.y - 128,
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
        }}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16">
        {/* Geometric shapes */}
        <div
          className="absolute top-[10%] right-[5%] md:right-[15%] w-24 h-24 md:w-40 md:h-40 border border-[#c9a66b]/30 rotate-45"
          style={{ transform: `rotate(${45 + scrollY * 0.05}deg)` }}
        />
        <div
          className="absolute bottom-[20%] left-[5%] md:left-[10%] w-16 h-16 md:w-24 md:h-24 bg-[#2a3b35] rounded-full"
          style={{ transform: `translateY(${-parallaxOffset * 0.5}px)` }}
        />
        <div
          className="absolute top-[30%] left-[8%] md:left-[20%] w-2 h-32 md:h-48 bg-gradient-to-b from-[#c9a66b] to-transparent"
          style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
        />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          {/* Intro text */}
          <div
            className={`mb-4 md:mb-6 transition-all duration-1000 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-[#c9a66b] font-mono text-xs md:text-sm tracking-[0.3em] uppercase">
              Welcome to my corner of the internet
            </span>
          </div>

          {/* Main heading */}
          <h1
            className={`font-display text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold leading-[0.85] tracking-tight transition-all duration-1000 delay-400 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <span className="block">Hello,</span>
            <span className="block text-[#c9a66b] italic font-light">I'm me.</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`mt-6 md:mt-10 text-lg md:text-xl lg:text-2xl text-[#8b9a93] max-w-xl font-light leading-relaxed transition-all duration-1000 delay-600 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            A digital wanderer, creative spirit, and builder of things
            that matter.
          </p>

          {/* CTA */}
          <div
            className={`mt-8 md:mt-12 transition-all duration-1000 delay-800 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <a
              href="#about"
              className="group inline-flex items-center gap-3 md:gap-4 text-[#f5f1eb] hover:text-[#c9a66b] transition-colors"
            >
              <span className="text-sm md:text-base tracking-[0.2em] uppercase font-mono">Explore</span>
              <span className="w-12 md:w-16 h-px bg-current group-hover:w-20 md:group-hover:w-24 transition-all" />
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-[#c9a66b]/50 to-transparent animate-pulse" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Section label */}
            <div className="lg:col-span-2">
              <span className="text-[#c9a66b] font-mono text-xs tracking-[0.3em] uppercase sticky top-8">
                01 / About
              </span>
            </div>

            {/* Content */}
            <div className="lg:col-span-6">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 leading-tight">
                Crafting digital experiences with intention
              </h2>
              <div className="space-y-4 md:space-y-6 text-[#8b9a93] text-base md:text-lg leading-relaxed">
                <p>
                  I believe in the power of thoughtful design and meaningful connections.
                  Every project is an opportunity to create something that resonates.
                </p>
                <p>
                  When I'm not creating, you'll find me exploring new ideas,
                  diving deep into rabbit holes of curiosity, or simply appreciating
                  the beauty in everyday moments.
                </p>
              </div>
            </div>

            {/* Visual element */}
            <div className="lg:col-span-4 relative mt-8 lg:mt-0">
              <div className="aspect-square bg-gradient-to-br from-[#2a3b35] to-[#1a2520] rounded-sm relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 border-2 border-[#c9a66b]/40 rounded-full animate-[spin_20s_linear_infinite]" />
                  <div className="absolute w-16 h-16 md:w-20 md:h-20 border border-[#f5f1eb]/20 rotate-45" />
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="h-px bg-gradient-to-r from-[#c9a66b] to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-[#0d1411]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <span className="text-[#c9a66b] font-mono text-xs tracking-[0.3em] uppercase sticky top-8">
                02 / Interests
              </span>
            </div>

            <div className="lg:col-span-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[
                  { title: 'Creation', desc: 'Building things from nothing' },
                  { title: 'Exploration', desc: 'Finding beauty in the unknown' },
                  { title: 'Connection', desc: 'Meaningful conversations' },
                  { title: 'Growth', desc: 'Always learning, always evolving' },
                  { title: 'Expression', desc: 'Art in all its forms' },
                  { title: 'Wonder', desc: 'Staying curious about everything' },
                ].map((item, i) => (
                  <div
                    key={item.title}
                    className="group p-6 md:p-8 bg-[#0a0f0d] border border-[#2a3b35] hover:border-[#c9a66b]/50 transition-all duration-500 cursor-default"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <h3 className="font-display text-xl md:text-2xl font-bold mb-2 group-hover:text-[#c9a66b] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[#8b9a93] text-sm md:text-base">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <span className="absolute -top-8 md:-top-12 -left-2 md:-left-8 text-[6rem] md:text-[10rem] text-[#c9a66b]/10 font-display leading-none">
              "
            </span>
            <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light italic leading-snug text-[#f5f1eb]/90">
              The best time to plant a tree was 20 years ago.
              The second best time is now.
            </blockquote>
            <span className="absolute -bottom-8 md:-bottom-12 -right-2 md:-right-8 text-[6rem] md:text-[10rem] text-[#c9a66b]/10 font-display leading-none">
              "
            </span>
          </div>
          <p className="mt-8 md:mt-12 text-[#8b9a93] font-mono text-xs md:text-sm tracking-wider">
            — Chinese Proverb
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-[#0a0f0d] to-[#0d1411]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <span className="text-[#c9a66b] font-mono text-xs tracking-[0.3em] uppercase">
                03 / Connect
              </span>
            </div>

            <div className="lg:col-span-10">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight">
                Let's create something{' '}
                <span className="text-[#c9a66b] italic font-light">beautiful</span>{' '}
                together
              </h2>
              <p className="text-[#8b9a93] text-lg md:text-xl max-w-xl mb-8 md:mb-12">
                Whether you have a project in mind, want to collaborate, or just
                want to say hello — I'd love to hear from you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <a
                  href="mailto:hello@example.com"
                  className="group inline-flex items-center justify-center sm:justify-start gap-3 px-6 md:px-8 py-4 bg-[#c9a66b] text-[#0a0f0d] font-mono text-sm tracking-wider uppercase hover:bg-[#d4b77a] transition-colors min-h-[56px]"
                >
                  <span>Get in touch</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 px-4 md:px-8 lg:px-16 border-t border-[#2a3b35]/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <div className="font-mono text-xs text-[#5a6b63]">
            {new Date().getFullYear()} / Made with intention
          </div>
          <div className="font-mono text-xs text-[#5a6b63]">
            Requested by @Vox_Claw_ · Built by @clonkbot
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
