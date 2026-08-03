import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Calendar, Tv, Clapperboard, Loader2 } from 'lucide-react';
import ReviewForm from '../components/ReviewForm';
import ReviewFeed from '../components/ReviewFeed';

export default function ShowDetails() {
  const { id } = useParams();
  
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY || 'YOUR_TMDB_API_KEY'; 

        if (apiKey === 'YOUR_TMDB_API_KEY') {
          await new Promise(resolve => setTimeout(resolve, 600)); 
          
          setShow({
            id: id,
            name: "Breaking Bad",
            tagline: "All Hail the King",
            overview: "When Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
            backdrop_path: "/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
            poster_path: "/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
            first_air_date: "2008-01-20",
            status: "Ended",
            number_of_seasons: 5,
            number_of_episodes: 62,
            vote_average: 8.9,
            genres: [{ id: 18, name: "Drama" }, { id: 80, name: "Crime" }]
          });
          setIsLoading(false);
          return;
        }

        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
          {
            headers: { 
              accept: 'application/json',
              Authorization: `Bearer ${apiKey}` 
            }
          }
        );

        if (!response.ok) throw new Error('Failed to fetch show details');
        const data = await response.json();
        setShow(data);

      } catch (err) {
        console.error(err);
        setError("Could not load show details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-500" />
        <p>Loading show details...</p>
      </div>
    );
  }

  if (error || !show) {
    return (
      <div className="text-center py-20 text-red-400">
        <h2 className="text-2xl font-bold mb-2">Oops!</h2>
        <p>{error || "Show not found."}</p>
      </div>
    );
  }

  const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/';
  const backdropSrc = show.backdrop_path ? `${TMDB_IMAGE_BASE}original${show.backdrop_path}` : '';
  const posterSrc = show.poster_path ? `${TMDB_IMAGE_BASE}w500${show.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster';
  const releaseYear = show.first_air_date ? show.first_air_date.split('-')[0] : 'N/A';

  return (
    <div className="w-full -mt-8 pb-12">
      {/* Hero Backdrop Section */}
      <div className="relative w-full h-[40vh] md:h-[55vh] bg-slate-900 overflow-hidden">
        {backdropSrc && (
          <img 
            src={backdropSrc} 
            alt={`${show.name} backdrop`}
            className="w-full h-full object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"></div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 relative z-10 -mt-32 sm:-mt-48">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left Column: Poster Image */}
          <div className="shrink-0 mx-auto md:mx-0 w-48 sm:w-64">
            <img 
              src={posterSrc} 
              alt={show.name}
              className="w-full rounded-xl shadow-2xl border border-slate-700/50"
            />
          </div>

          {/* Right Column: Details & Overview */}
          <div className="flex flex-col justify-end pt-4 md:pt-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
              {show.name} <span className="text-slate-400 font-light">({releaseYear})</span>
            </h1>
            
            {show.tagline && (
              <p className="text-xl text-slate-300 italic mb-6">"{show.tagline}"</p>
            )}

            {/* Quick Stats Row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 text-sm font-medium text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="text-white">{show.vote_average?.toFixed(1)}</span>
                <span className="text-slate-500 ml-1">Score</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Tv size={16} className="text-blue-400" />
                {show.number_of_seasons} {show.number_of_seasons === 1 ? 'Season' : 'Seasons'}
              </div>
              <div className="flex items-center gap-1.5">
                <Clapperboard size={16} className="text-blue-400" />
                {show.number_of_episodes} Episodes
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={16} className="text-blue-400" />
                {show.status}
              </div>
            </div>

            {/* Genres */}
            {show.genres && show.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {show.genres.map(genre => (
                  <span key={genre.id} className="bg-blue-600/20 text-blue-300 border border-blue-500/20 px-3 py-1 rounded-full text-xs uppercase tracking-wider font-semibold">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview / Synopsis */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Overview</h3>
              <p className="text-slate-300 leading-relaxed max-w-3xl text-lg">
                {show.overview || "No overview available for this show."}
              </p>
            </div>
          </div>
        </div>

        {/* The New Review System */}
        <div className="mt-20 border-t border-slate-800 pt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">Community Reviews</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Left Side: The Feed */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <ReviewFeed showId={show.id} />
            </div>

            {/* Right Side: The Form */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="sticky top-24">
                <ReviewForm showId={show.id} showName={show.name} />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}