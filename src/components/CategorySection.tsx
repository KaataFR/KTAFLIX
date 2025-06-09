
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import SiteCard from './SiteCard';
import { type CarouselApi } from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import { Monitor, Download, Tv, Gamepad2, Trophy, Brain, Code, BarChart3, Book } from 'lucide-react';

interface Site {
  name: string;
  image: string;
  url: string;
  description?: string;
}

interface CategorySectionProps {
  id: string;
  title: string;
  sites: Site[];
}

const getIconForCategory = (id: string) => {
  switch (id) {
    case 'streaming':
      return <Monitor className="w-6 h-6 text-netflix-red" />;
    case 'torrent':
      return <Download className="w-6 h-6 text-netflix-red" />;
    case 'anime':
      return <Tv className="w-6 h-6 text-netflix-red" />;
    case 'manga':
      return <Book className="w-6 h-6 text-netflix-red" />;
    case 'games':
      return <Gamepad2 className="w-6 h-6 text-netflix-red" />;
    case 'sports':
      return <Trophy className="w-6 h-6 text-netflix-red" />;
    case 'ai':
      return <Brain className="w-6 h-6 text-netflix-red" />;
    case 'software':
      return <Code className="w-6 h-6 text-netflix-red" />;
    case 'extension':
      return <Code className="w-6 h-6 text-netflix-red" />;
    case 'benchmark':
      return <BarChart3 className="w-6 h-6 text-netflix-red" />;
    default:
      return null;
  }
};

const CategorySection = ({ id, title, sites }: CategorySectionProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateScrollState = () => {
      setCanScrollNext(api.canScrollNext());
      setCanScrollPrev(api.canScrollPrev());
      setCurrentSlide(api.selectedScrollSnap());
      setSlideCount(api.scrollSnapList().length);
    };

    updateScrollState();
    api.on("select", updateScrollState);
    api.on("reInit", updateScrollState);

    return () => {
      api.off("select", updateScrollState);
      api.off("reInit", updateScrollState);
    };
  }, [api]);

  // Déterminer si on a besoin des flèches basé sur le nombre d'éléments et la taille d'écran
  const shouldShowArrows = sites.length > 4; // Plus de 4 éléments car on affiche max 4 par ligne sur desktop

  return (
    <section id={id} className="mb-16 sm:mb-20 px-4 sm:px-6 lg:px-8 relative z-20">
      <div className="max-w-full">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6 sm:mb-8 font-netflix tracking-wide relative z-20 flex items-center gap-3">
          {getIconForCategory(id)}
          {title}
        </h2>
        
        <div className="relative group/section">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {sites.map((site, index) => (
                <CarouselItem key={`${site.name}-${index}`} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <SiteCard
                    name={site.name}
                    image={site.image}
                    url={site.url}
                    description={site.description}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Flèches conditionnelles pour desktop */}
            {shouldShowArrows && canScrollPrev && (
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-black/70 hover:bg-black/90 backdrop-blur-sm border border-white/20 hover:border-netflix-red/50 shadow-xl hover:shadow-2xl hover:shadow-netflix-red/20 text-white hover:text-netflix-red transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-110 opacity-0 group-hover/section:opacity-100 pointer-events-none group-hover/section:pointer-events-auto hidden md:flex" />
            )}
            
            {shouldShowArrows && canScrollNext && (
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-black/70 hover:bg-black/90 backdrop-blur-sm border border-white/20 hover:border-netflix-red/50 shadow-xl hover:shadow-2xl hover:shadow-netflix-red/20 text-white hover:text-netflix-red transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-110 opacity-0 group-hover/section:opacity-100 pointer-events-none group-hover/section:pointer-events-auto hidden md:flex" />
            )}
          </Carousel>

          {/* Gradient fade et indicateur pour mobile/responsive */}
          {canScrollNext && (
            <div className="absolute right-0 top-0 bottom-0 z-40 pointer-events-none md:hidden">
              <div className="h-full w-16 bg-gradient-to-l from-netflix-black via-netflix-black/80 to-transparent flex items-center justify-end pr-2">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-1 h-1 bg-netflix-red rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-netflix-red/60 rounded-full animate-pulse delay-200"></div>
                  <div className="w-1 h-1 bg-netflix-red/40 rounded-full animate-pulse delay-400"></div>
                </div>
              </div>
            </div>
          )}

          {/* Indicateurs de progression pour mobile */}
          {slideCount > 1 && (
            <div className="flex justify-center mt-4 gap-2 md:hidden">
              {Array.from({ length: slideCount }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-netflix-red w-4' 
                      : 'bg-netflix-gray hover:bg-netflix-light-gray'
                  }`}
                  aria-label={`Aller à la page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
