
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-netflix-black/95 via-netflix-black/80 to-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between relative">
        <div className="flex items-center space-x-8">
          <h1 className="text-netflix-red text-2xl md:text-3xl font-netflix font-bold tracking-wider text-shadow-netflix">
            KTAFLIX
          </h1>
          
          <nav className="hidden lg:flex space-x-6">
            <a href="#streaming" className="text-white hover:text-gray-400 transition-colors duration-300 font-medium text-sm tracking-wide">
              Streaming
            </a>
            <a href="#torrent" className="text-white hover:text-gray-400 transition-colors duration-300 font-medium text-sm tracking-wide">
              Torrent
            </a>
            <a href="#anime" className="text-white hover:text-gray-400 transition-colors duration-300 font-medium text-sm tracking-wide">
              Anime
            </a>
            <a href="#manga" className="text-white hover:text-gray-400 transition-colors duration-300 font-medium text-sm tracking-wide">
              Manga
            </a>
            <a href="#games" className="text-white hover:text-gray-400 transition-colors duration-300 font-medium text-sm tracking-wide">
              Jeux
            </a>
            <a href="#sports" className="text-white hover:text-gray-400 transition-colors duration-300 font-medium text-sm tracking-wide">
              Sports
            </a>
            <a href="#ai" className="text-white hover:text-gray-400 transition-colors duration-300 font-medium text-sm tracking-wide">
              IA
            </a>
            <a href="#software" className="text-white hover:text-gray-400 transition-colors duration-300 font-medium text-sm tracking-wide">
              Logiciels
            </a>
            <a href="#extension" className="text-white hover:text-gray-400 transition-colors duration-300 font-medium text-sm tracking-wide">
              Extensions
            </a>
            <a href="#benchmark" className="text-white hover:text-gray-400 transition-colors duration-300 font-medium text-sm tracking-wide">
              Benchmark
            </a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <a 
            href="https://linktr.ee/KaataFR" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden lg:flex items-center text-white hover:text-netflix-red transition-colors duration-300 font-medium text-sm tracking-wide"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Mes autres sites
          </a>
          
          <div className="lg:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-netflix-gray hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className="w-full h-0.5 bg-current"></span>
                <span className="w-full h-0.5 bg-current"></span>
                <span className="w-full h-0.5 bg-current"></span>
              </div>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-netflix-black/95 backdrop-blur-sm border-t border-netflix-gray">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="https://linktr.ee/KaataFR" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-white hover:text-netflix-red transition-colors duration-300 font-medium text-sm tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Mes autres sites
            </a>
            <a 
              href="#streaming" 
              className="text-white hover:text-gray-400 transition-colors duration-300 font-medium text-sm tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Streaming
            </a>
            <a 
              href="#torrent" 
              className="text-white hover:text-gray-400 transition-colors duration-300 font-medium text-sm tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Torrent
            </a>
            <a 
              href="#anime" 
              className="text-white hover:text-gray-400 transition-colors duration-300 font-medium text-sm tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Anime
            </a>
            <a 
              href="#manga" 
              className="text-white hover:text-gray-400 transition-colors duration-300 font-medium text-sm tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Manga
            </a>
            <a 
              href="#games" 
              className="text-white hover:text-gray-400 transition-colors duration-300 font-medium text-sm tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Jeux
            </a>
            <a 
              href="#sports" 
              className="text-white hover:text-gray-400 transition-colors duration-300 font-medium text-sm tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sports
            </a>
            <a 
              href="#ai" 
              className="text-white hover:text-gray-400 transition-colors duration-300 font-medium text-sm tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              IA
            </a>
            <a 
              href="#software" 
              className="text-white hover:text-gray-400 transition-colors duration-300 font-medium text-sm tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Logiciels
            </a>
            <a 
              href="#extension" 
              className="text-white hover:text-gray-400 transition-colors duration-300 font-medium text-sm tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Extensions
            </a>
            <a 
              href="#benchmark" 
              className="text-white hover:text-gray-400 transition-colors duration-300 font-medium text-sm tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Benchmark
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
