import { TrendingUp, Award } from 'lucide-react';
import ShowCard from '../components/ShowCard';

export default function Home() {
  // This is a sample response from the TMDB /tv/popular endpoint
  // In the future, this will be replaced with a real fetch call
  const popularShows = [
    {
      id: 1396,
      name: "Breaking Bad",
      first_air_date: "2008-01-20",
      poster_path: "/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
      vote_average: 8.9,
      origin_country: ["US"]
    },
    {
      id: 93405,
      name: "Squid Game",
      first_air_date: "2021-09-17",
      poster_path: "/dDlEmu3EZ0Pgg93K2SVNlcjCSvE.jpg",
      vote_average: 7.8,
      origin_country: ["KR"]
    },
    {
      id: 108978,
      name: "Reacher",
      first_air_date: "2022-02-03",
      poster_path: "/jYxuQOsXQ31N06a0V01z1YxO43n.jpg",
      vote_average: 8.1,
      origin_country: ["US"]
    },
    {
      id: 60625,
      name: "Rick and Morty",
      first_air_date: "2013-12-02",
      poster_path: "/gdIrmf2DdY5mgN6ycPhvV7Dylq.jpg",
      vote_average: 8.7,
      origin_country: ["US"]
    }
  ];

  // A second mock array to flesh out the layout's vertical rhythm
  const acclaimedShows = [
    {
      id: 66732,
      name: "Stranger Things",
      first_air_date: "2016-07-15",
      poster_path: "/49WJfeN0moxb9IPfGn8Os2w2q9H.jpg",
      vote_average: 8.6,
      origin_country: ["US"]
    },
    {
      id: 119051,
      name: "Wednesday",
      first_air_date: "2022-11-23",
      poster_path: "/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
      vote_average: 8.5,
      origin_country: ["US"]
    },
    {
      id: 1399,
      name: "Game of Thrones",
      first_air_date: "2011-04-17",
      poster_path: "/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
      vote_average: 8.4,
      origin_country: ["US"]
    },
    {
      id: 1402,
      name: "The Walking Dead",
      first_air_date: "2010-10-31",
      poster_path: "/n7PVu0hSz2sAsVekpOIoNjLADWA.jpg",
      vote_average: 8.1,
      origin_country: ["US"]
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto pb-12">
      
      {}
      <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Track what you watch. <br className="hidden md:block" />
            <span className="text-blue-500">Tell your friends.</span>
          </h1>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed">
            WickedRatings is the premier community-driven platform for tracking, reviewing, and discovering your next favorite television show.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm">
              Create an Account
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors border border-slate-600">
              Browse Shows
            </button>
          </div>
        </div>
        <div className="hidden lg:block w-64 h-64 bg-slate-700/30 rounded-full border-8 border-slate-800/50 shrink-0 relative overflow-hidden">
           {/* Clean geometric placeholder for an eventual graphic or collage */}
           <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
        </div>
      </div>

      {}
      <div className="space-y-16">
        
        {/* Section 1: Trending */}
        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <TrendingUp className="text-blue-500" size={28} />
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Trending This Week
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {popularShows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        </section>

        {/* Section 2: Critically Acclaimed */}
        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Award className="text-yellow-500" size={28} />
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Critically Acclaimed
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {acclaimedShows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}