
import { ExternalLink } from 'lucide-react';

interface SiteCardProps {
  name: string;
  image: string;
  url: string;
  description?: string;
}

const SiteCard = ({ name, image, url, description }: SiteCardProps) => {
  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="group/card relative w-full h-[140px] sm:h-[160px] md:h-[180px] cursor-pointer transform transition-all duration-300 ease-out hover:scale-105 hover:z-30 z-20"
      onClick={handleClick}
    >
      <div className="relative h-full w-full rounded-lg overflow-hidden bg-netflix-gray shadow-lg transition-all duration-300 group-hover/card:shadow-2xl group-hover/card:shadow-netflix-red/30">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-all duration-300 filter brightness-90 group-hover/card:brightness-75 group-hover/card:blur-[1px]"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop';
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        {/* Border highlight on hover */}
        <div className="absolute inset-0 border-2 border-transparent transition-all duration-300 group-hover/card:border-netflix-red/60 rounded-lg" />
        
        {/* Title at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
          <h3 className="text-white font-bold text-sm sm:text-base md:text-lg font-netflix tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-colors duration-300 group-hover/card:text-netflix-red">
            {name}
          </h3>
        </div>
        
        {/* Hover overlay with icon - removed circle background */}
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-all duration-300 group-hover/card:opacity-100 flex items-center justify-center">
          <div className="transform scale-0 group-hover/card:scale-100 transition-transform duration-300 ease-out">
            <ExternalLink className="h-8 w-8 sm:h-10 sm:w-10 text-white drop-shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteCard;
