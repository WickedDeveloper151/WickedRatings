import { Link } from 'react-router-dom';
import { Tv } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Logo Section */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors no-underline shrink-0"
        >
          <Tv size={28} strokeWidth={2.5} />
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
            WickedRatings
          </span>
        </Link>

        {/* Search Bar Section (Flex-1 allows it to grow and fill empty space) */}
        <div className="flex-1 max-w-xl mx-4 flex justify-center">
          <SearchBar />
        </div>

        {/* Auth / Profile Placeholder Section */}
        <div className="flex items-center gap-3 shrink-0">
          <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-2">
            Log In
          </button>
          <button className="text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors shadow-sm">
            Sign Up
          </button>
        </div>
        
      </div>
    </nav>
  );
}