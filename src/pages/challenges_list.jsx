import React, { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import SkeletonCard from "../components/skeleton_cards";

export default function ChallengesList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await API.get("/api/challenges");
        setList(res.data);
      } catch (err) {
        toast.error("Failed to load challenges");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-green-800 mb-6">All Challenges</h2>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3,4].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {list.map(c => (
            <div key={c._id} className="card bg-green-50 border border-green-200 shadow">
              <figure><img src={c.imageUrl || "/placeholder.jpg"} alt={c.title} className="h-44 w-full object-cover"/></figure>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-green-800">{c.title}</h3>
                <p className="text-sm text-green-700">{c.category} • {c.duration} days</p>
                <p className="mt-2 text-green-700">{c.description?.slice(0,100)}</p>
                <div className="mt-3 text-right">
                  <a className="btn btn-sm bg-green-600 text-white" href={`/challenges/${c._id}`}>View</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
