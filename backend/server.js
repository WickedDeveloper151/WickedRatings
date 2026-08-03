import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
// CORS allows our Vite frontend (running on port 5173) to talk to this backend
app.use(cors());
app.use(express.json());

// In-memory database (We will swap this out for MongoDB next!)
let reviews = [
  {
    id: 1,
    showId: "1396", // The TMDB ID for Breaking Bad
    user: "CinemaJunkie",
    avatar: "C",
    rating: 4.5,
    date: "Just now",
    text: "Absolutely phenomenal from start to finish. The character development is masterclass.",
    likes: 24,
    comments: 3
  }
];

// GET: Fetch all reviews for a specific show
app.get('/api/reviews/:showId', (req, res) => {
  const { showId } = req.params;
  const showReviews = reviews.filter(r => r.showId === showId);
  
  // Return the reviews sorted by newest first (highest ID)
  res.json(showReviews.sort((a, b) => b.id - a.id));
});

// POST: Submit a new review
app.post('/api/reviews', (req, res) => {
  const { showId, user, rating, text } = req.body;
  
  const newReview = {
    id: Date.now(), // Generate a simple unique ID
    showId,
    user: user || "Anonymous",
    avatar: (user || "A")[0].toUpperCase(),
    rating,
    date: "Just now",
    text,
    likes: 0,
    comments: 0
  };

  reviews.push(newReview);
  
  // Respond with a 201 Created status and the new review data
  res.status(201).json(newReview);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});