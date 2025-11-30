import React, { useEffect, useState } from "react";
import API from "../api";
import SkeletonCard from "../components/skeleton_cards";
import { toast } from "react-toastify";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await API.getEvents();
        setEvents(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load events");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="px-6 py-10 min-h-screen">
      <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">
        Upcoming Events 📅
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((e) => (
            <div
              key={e._id}
              className="card bg-green-50 border border-green-200 shadow-md hover:bg-green-100 transition"
            >
              <div className="card-body">
                <h2 className="card-title text-green-800">{e.title}</h2>
                <p className="text-sm text-green-700">
                  {new Date(e.date).toLocaleString()}
                </p>
                <p className="text-green-700 mt-1">{e.location}</p>
                <p className="text-sm text-green-700 mt-2">
                  {e.description?.slice(0, 120)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
