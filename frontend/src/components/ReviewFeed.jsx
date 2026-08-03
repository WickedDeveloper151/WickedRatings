import { Star, ThumbsUp, MessageSquare, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ReviewFeed({ showId }) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${showId}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchReviews();
    
    // Listen for a custom event so the feed updates when a new review is submitted
    window.addEventListener('reviewSubmitted', fetchReviews);
    return () => window.removeEventListener('reviewSubmitted', fetchReviews);
  }, [showId]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="bg-slate-800/20 border border-slate-700/50 rounded-2xl p-8 text-center text-slate-400">
        No reviews yet. Be the first to share your thoughts!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-slate-800/20 border border-slate-700/50 rounded-2xl p-6">
          
          {/* Review Header (User Info & Rating) */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
                {review.avatar}
              </div>
              <div>
                <h4 className="text-white font-medium">{review.user}</h4>
                <p className="text-xs text-slate-400">{review.date}</p>
              </div>
            </div>
            
            {/* 5-Star Display */}
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFull = review.rating >= star;
                const isHalf = review.rating >= star - 0.5 && !isFull;
                
                return (
                  <div key={star} className="relative w-3.5 h-3.5">
                    {/* Background Empty Star */}
                    <Star size={14} className="text-slate-700 fill-slate-700 absolute top-0 left-0" />
                    
                    {/* Foreground Filled Star (Clipped) */}
                    {(isFull || isHalf) && (
                      <div 
                        className="absolute top-0 left-0 h-full overflow-hidden" 
                        style={{ width: isHalf ? '50%' : '100%' }}
                      >
                        <Star size={14} className="text-yellow-400 fill-yellow-400 absolute top-0 left-0 min-w-[14px]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Review Text */}
          <p className="text-slate-300 leading-relaxed text-sm mb-5">
            {review.text}
          </p>

          {/* Interaction Footer */}
          <div className="flex items-center gap-6 border-t border-slate-700/50 pt-4 text-slate-400 text-sm font-medium">
            <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <ThumbsUp size={16} />
              {review.likes}
            </button>
            <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <MessageSquare size={16} />
              {review.comments}
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}