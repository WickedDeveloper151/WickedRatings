import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ShowDetails from './pages/ShowDetails';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar stays outside Routes so it appears on every page */}
      <Navbar /> 
      
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/show/:id" element={<ShowDetails />} />
          <Route path="/user/:username" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}