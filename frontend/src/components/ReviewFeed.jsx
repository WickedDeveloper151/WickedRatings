import { Star, ThumbsUp, MessageSquare } from 'lucide-react';

export default function ReviewFeed() {
  // Mock data representing reviews fetched from your future database
  const mockReviews = [
    {
      id: 1,
      user: "CinemaJunkie",
      avatar: "C",
      rating: 5,
      date: "2 days ago",
      text: "Absolutely phenomenal from start to finish. The character development is masterclass and the cinematography blew me away. Can't wait to see what they do in the next season.",
      likes: 24,
      comments: 3
    },
    {
      id: 2,
      user: "BingeWatcher99",
      avatar: "B",
      rating: 4,
      date: "1 week ago",
      text: "Starts off a little slow in the first few episodes, but once it finds its footing, it is completely unputdownable. Highly recommend sticking with it.",
      likes: 12,
      comments: 0
    },
    {
      id: 3,
      user: "TVSnob",
      avatar: "T",
      rating: 2,
      date: "1 month ago",
      text: "Honestly, I don't get the hype. The pacing is weird and the dialogue feels forced. Might give it another try later, but dropped it after episode 4.",
      likes: 4,
      comments: 8
    }
  ];

  return (
    <div className="space-y-6">
      {mockReviews.map((review) => (
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
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  className={star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-700 fill-slate-700"}
                />
              ))}
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