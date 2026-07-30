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

  return (
    <div className="w-full">
      {}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to WickedRatings</h1>
          <p className="text-slate-400">Discover and review the best TV shows.</p>
        </div>
      </div>

      {}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4 border-b border-slate-700 pb-2">
          Trending Shows
        </h2>
        
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {popularShows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      </section>
    </div>
  );
}