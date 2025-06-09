import Header from '@/components/Header';
import CategorySection from '@/components/CategorySection';
import LoadingScreen from '@/components/LoadingScreen';
import { sitesData } from '@/data/sitesData';
import { useEffect, useState } from 'react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) return;

    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          const headerOffset = 120; // Augmenté de 100 à 120 pour mieux voir le titre
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          // Smooth scroll with custom animation
          const startPosition = window.pageYOffset;
          const distance = offsetPosition - startPosition;
          const duration = 300; // 0.3s
          let startTime: number | null = null;

          // Cubic bezier easing function (ease-out)
          const easeOutCubic = (t: number): number => {
            return 1 - Math.pow(1 - t, 3);
          };

          const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            const easedProgress = easeOutCubic(progress);
            window.scrollTo(0, startPosition + distance * easedProgress);

            if (progress < 1) {
              requestAnimationFrame(animation);
            }
          };

          requestAnimationFrame(animation);
        }
      }
    };

    // Handle scroll skip to streaming section with smooth animation
    let hasScrolled = false;
    const handleWheel = (e: WheelEvent) => {
      if (!hasScrolled && window.scrollY === 0 && e.deltaY > 0) {
        e.preventDefault();
        hasScrolled = true;
        const streamingSection = document.querySelector('#streaming');
        if (streamingSection) {
          const headerOffset = 120; // Augmenté de 100 à 120 pour mieux voir le titre
          const elementPosition = streamingSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          // Custom smooth scroll animation
          const startPosition = window.pageYOffset;
          const distance = offsetPosition - startPosition;
          const duration = 300; // 0.3s
          let startTime: number | null = null;

          // Cubic bezier easing function (ease-out)
          const easeOutCubic = (t: number): number => {
            return 1 - Math.pow(1 - t, 3);
          };

          const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            const easedProgress = easeOutCubic(progress);
            window.scrollTo(0, startPosition + distance * easedProgress);

            if (progress < 1) {
              requestAnimationFrame(animation);
            }
          };

          requestAnimationFrame(animation);
        }
      }
    };

    // Reset scroll tracking when user scrolls back to top
    const handleScroll = () => {
      if (window.scrollY === 0) {
        hasScrolled = false;
      }
    };

    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);

    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className={`min-h-screen bg-netflix-black overflow-x-hidden transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
      <Header />

      <section className="relative flex items-center justify-center overflow-hidden z-0" style={{ height: '100vh', minHeight: '100vh' }}>
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/80 via-netflix-black/60 to-netflix-black/80"></div>
        </div>

        <div className="text-center space-y-4 sm:space-y-6 px-4 z-10 relative max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-netflix font-bold text-white mb-2 sm:mb-4 animate-netflix-fade-in tracking-wider text-shadow-netflix">
            KTA<span className="text-netflix-red">FLIX</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-netflix-light-gray max-w-2xl mx-auto animate-netflix-fade-in font-sans leading-relaxed px-4">
            Votre hub ultime pour le streaming, les jeux, l'IA et bien plus encore
          </p>
          <div className="animate-netflix-fade-in delay-300 pt-4">
            <a
              href="#streaming"
              className="inline-block bg-netflix-red hover:bg-red-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-[0_10px_30px_rgba(229,9,20,0.4)] font-sans tracking-wide text-sm sm:text-base"
            >
              Découvrir les sites
            </a>
          </div>
        </div>

        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-netflix-red rounded-full flex justify-center shadow-[0_0_20px_rgba(229,9,20,0.3)]">
            <div className="w-1 h-2 sm:h-3 bg-netflix-red rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <main className="relative z-10 pt-32 md:pt-40">
        <CategorySection
          id="streaming"
          title="Streaming"
          sites={sitesData.streaming}
        />

        <CategorySection
          id="torrent"
          title="Torrent"
          sites={sitesData.torrent}
        />

        <CategorySection
          id="anime"
          title="Anime"
          sites={sitesData.anime}
        />

        <CategorySection
          id="manga"
          title="Manga"
          sites={sitesData.manga}
        />

        <CategorySection
          id="games"
          title="Jeux"
          sites={sitesData.games}
        />

        <CategorySection
          id="sports"
          title="Sports"
          sites={sitesData.sports}
        />

        <CategorySection
          id="ai"
          title="Intelligence Artificielle"
          sites={sitesData.ai}
        />

        <CategorySection
          id="software"
          title="Logiciels"
          sites={sitesData.software}
        />

        <CategorySection
          id="extension"
          title="Extensions"
          sites={sitesData.extension}
        />

        <CategorySection
          id="benchmark"
          title="Benchmark"
          sites={sitesData.benchmark}
        />
      </main>

      <footer className="bg-netflix-black border-t border-netflix-gray py-6 sm:py-8 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-netflix-light-gray font-sans text-sm sm:text-base">
            © Juin 2025 <span className="text-netflix-red font-netflix tracking-wider">KTAFLIX</span>. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
