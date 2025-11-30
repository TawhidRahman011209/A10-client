import React, { useEffect, useState } from "react";
import { getChallenges } from "../api";
import { toast } from "react-hot-toast";
import SkeletonCard from "../components/skeleton_cards";
import { Link } from "react-router-dom";

export default function ChallengesList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await getChallenges();
        setList(res);
      } catch (err) {
        toast.error("Failed to load challenges");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-300 p-8">
      <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
        All Challenges
      </h2>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : list.length === 0 ? (
        <p className="text-green-700 text-center text-lg">
          No challenges found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((c) => (
            <div
              key={c._id}
              className="bg-white border border-green-200 rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-transform duration-200"
            >
              <img
                src={c.imageUrl || "/placeholder.jpg"}
                alt={c.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-green-800 mb-1">
                  {c.title}
                </h3>
                <p className="text-sm text-green-700 mb-2">
                  {c.category} • {c.duration} days
                </p>
                <p className="text-green-700 text-sm mb-4">
                  {c.description?.slice(0, 100)}...
                </p>

                <div className="text-right">
                  <Link
                    to={`/challenges/${c._id}`}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
