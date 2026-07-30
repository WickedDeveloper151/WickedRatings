import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function ShowCard({ show }) {
  // TMDB images require a base URL to render properly
  const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  
  // Fallback image in case the API doesn't have a poster for a specific show
  const fallbackImage = 'https://via.placeholder.com/500x750?text=No+Poster+Available';

  const posterSrc = show.poster_path 
    ? `${TMDB_IMAGE_BASE_URL}${show.poster_path}` 
    : fallbackImage;

  // Extract just the year from the first_air_date string (e.g., "2008-01-20" -> "2008")
  const releaseYear = show.first_air_date ? show.first_air_date.split('-')[0] : 'N/A';

  // Format the rating to one decimal place
  const rating = show.vote_average ? show.vote_average.toFixed(1) : 'NR';

  return (
    <Link 
      to={`/show/${show.id}`} 
      className="group flex flex-col bg-slate-800 rounded-xl overflow-hidden shadow-md transition-all hover:shadow-xl hover:-translate-y-1 duration-300 w-full h-full text-slate-200 no-underline"
    >
      {}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
        <img 
          src={posterSrc} 
          alt={`${show.name} poster`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Top Right Badge - Rating */}
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md text-sm font-semibold">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span>{rating}</span>
        </div>
      </div>

      {}
      <div className="p-4 flex flex-col grow">
        <h3 className="text-lg font-bold line-clamp-1 mb-1 text-white group-hover:text-blue-400 transition-colors">
          {show.name}
        </h3>
        
        <div className="flex items-center justify-between mt-auto pt-2 text-sm text-slate-400">
          <span>{releaseYear}</span>
          {show.origin_country && show.origin_country.length > 0 && (
            <span className="bg-slate-700 px-2 py-0.5 rounded text-xs font-medium">
              {show.origin_country[0]}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}