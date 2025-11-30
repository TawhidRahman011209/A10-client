import React, { useEffect, useState } from "react";
import API from "../api";
import SkeletonCard from "../components/skeleton_cards";
import { toast } from "react-toastify";

export default function Tips() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await API.getTips();
        setTips(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load tips");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="px-6 py-10 min-h-screen">
      <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">
        Eco Tips 💡
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {tips.map((t) => (
            <div
              key={t._id}
              className="bg-green-50 border border-green-200 p-4 rounded-xl shadow-md hover:bg-green-100 transition"
            >
              <h2 className="text-xl font-semibold text-green-800">{t.title}</h2>
              <p className="text-sm text-green-700">
                {t.authorName || t.author || "Unknown"}
              </p>
              <p className="mt-2 text-green-700">{t.content}</p>
              <p className="text-xs text-green-600 mt-1">
                {new Date(t.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
