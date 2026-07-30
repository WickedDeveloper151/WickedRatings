import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', gap: '1rem' }}>
      <Link to="/"><strong>WickedRatings</strong></Link>
      <Link to="/search">Search</Link>
      {/* We will add the real Search Bar and Login buttons here later */}
    </nav>
  );
}