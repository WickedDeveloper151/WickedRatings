import { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';
import { debounceWithAbort } from '../utils/helpers';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // We use a ref to detect when the user clicks outside the search bar
  const wrapperRef = useRef(null);

  // The raw function that actually fetches data
  const performSearch = async (searchTerm, signal) => {
    if (searchTerm.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    setIsOpen(true);

    try {
      // ⚠️ IMPORTANT: Replace this with your actual TMDB API Key from an environment variable
      // Example: const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const apiKey = 'YOUR_TMDB_API_KEY'; 
      
      // MOCK MODE: If no real key is provided, simulate a network request for testing the UI
      if (apiKey === 'YOUR_TMDB_API_KEY') {
        await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network latency
        setResults([
          { id: 1396, name: `Mock Result for "${searchTerm}"`, first_air_date: "2008-01-20", poster_path: "/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg" },
          { id: 66732, name: "Stranger Things", first_air_date: "2016-07-15", poster_path: "/49WJfeN0moxb9IPfGn8Os2w2q9H.jpg" },
          { id: 119051, name: "Wednesday", first_air_date: "2022-11-23", poster_path: "/9PFonBhy4cQy7Jz20NpMygczOkv.jpg" }
        ]);
        return;
      }

      // REAL MODE: Fetching from TMDB
      const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(searchTerm)}&language=en-US&page=1`,
        {
          headers: { 
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}` 
          },
          signal // Pass the abort signal here
        }
      );
      
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      
      // Only keep the top 5 results for the dropdown
      setResults(data.results.slice(0, 5));
      
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Search aborted due to new keystroke.');
      } else {
        console.error('Search failed:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Wrap our search function in the debounce utility (400ms delay)
  const debouncedSearch = useMemo(
    () => debounceWithAbort(performSearch, 400),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  // Close the dropdown if the user clicks anywhere outside of the wrapperRef
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-lg">
      
      {/* Search Input Field */}
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-slate-400" size={18} />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => { if (results.length > 0) setIsOpen(true) }}
          placeholder="Search for a TV show..."
          className="w-full bg-slate-800 text-white border border-slate-700 rounded-full py-2 pl-10 pr-10 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-slate-500"
        />
        {/* Loading Spinner */}
        {isLoading && (
          <Loader2 className="absolute right-3 text-blue-500 animate-spin" size={18} />
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
          {results.map((show) => {
            const posterSrc = show.poster_path 
              ? `https://image.tmdb.org/t/p/w92${show.poster_path}` 
              : 'https://via.placeholder.com/92x138?text=No+Img';
            const year = show.first_air_date ? show.first_air_date.split('-')[0] : 'N/A';

            return (
              <Link
                key={show.id}
                to={`/show/${show.id}`}
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
                className="flex items-center gap-3 p-3 hover:bg-slate-700 transition-colors border-b border-slate-700/50 last:border-0"
              >
                <img 
                  src={posterSrc} 
                  alt={show.name} 
                  className="w-10 h-14 object-cover rounded bg-slate-900"
                />
                <div className="flex flex-col">
                  <span className="text-white font-medium line-clamp-1">{show.name}</span>
                  <span className="text-slate-400 text-sm">{year}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}