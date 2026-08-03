import { useState } from 'react';
import { Star, Send } from 'lucide-react';

export default function ReviewForm({ showId, showName }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert("Please select a star rating first!");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          showId: showId,
          user: "Guest User", // Hardcoded for now
          rating: rating,
          text: reviewText
        })
      });

      if (response.ok) {
        setRating(0);
        setHoverRating(0);
        setReviewText('');
        // Trigger the feed to refresh without reloading the page
        window.dispatchEvent(new Event('reviewSubmitted'));
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to connect to the backend server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-1">Write a Review</h3>
      <p className="text-sm text-slate-400 mb-6">What did you think of {showName}?</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
        {/* Interactive Star Rating */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Your Rating <span className="text-red-400">*</span>
          </label>
          <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
            {[1, 2, 3, 4, 5].map((star) => {
              const current = hoverRating || rating;
              const isFull = current >= star;
              const isHalf = current >= star - 0.5 && !isFull;

              return (
                <div key={star} className="relative w-7 h-7 transition-transform hover:scale-110">
                  {/* Background Empty Star */}
                  <Star size={28} className="text-slate-600 fill-transparent absolute top-0 left-0" />
                  
                  {/* Foreground Filled Star (Clipped) */}
                  <div 
                    className="absolute top-0 left-0 h-full overflow-hidden pointer-events-none"
                    style={{ width: isFull ? '100%' : isHalf ? '50%' : '0%' }}
                  >
                    <Star size={28} className="text-yellow-400 fill-yellow-400 absolute top-0 left-0 min-w-[28px]" />
                  </div>

                  {/* Clickable Overlay Halves */}
                  <div className="absolute inset-0 flex">
                    <button
                      type="button"
                      className="w-1/2 h-full focus:outline-none cursor-pointer"
                      onClick={() => setRating(star - 0.5)}
                      onMouseEnter={() => setHoverRating(star - 0.5)}
                    />
                    <button
                      type="button"
                      className="w-1/2 h-full focus:outline-none cursor-pointer"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                    />
                  </div>
                </div>
              );
            })}
            <span className="ml-3 text-sm font-semibold text-slate-400">
              {rating > 0 ? `${rating} / 5` : "Select a rating"}
            </span>
          </div>
        </div>

        {/* Text Area */}
        <div>
          <label htmlFor="review" className="block text-sm font-medium text-slate-300 mb-2">
            Your Review (Optional)
          </label>
          <textarea
            id="review"
            rows="4"
            placeholder="Share your thoughts with the WickedRatings community..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-sm mt-2"
        >
          {isSubmitting ? "Publishing..." : "Publish Review"}
          {!isSubmitting && <Send size={18} />}
        </button>
      </form>
    </div>
  );
}