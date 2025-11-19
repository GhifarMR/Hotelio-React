import { Star } from "lucide-react";
import { useState } from "react";

const StarFilter = () => {
    const [starRating, setStarRating] = useState(4);

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Star Rating</h3>
        <button className="text-indigo-600 text-sm">Reset</button>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-10 h-10 cursor-pointer transition ${
              star <= starRating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() => setStarRating(star)}
          />
        ))}
      </div>
    </div>
  );
};

export default StarFilter;
