import React, { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import SkeletonCard from "../components/skeleton_cards";

export default function Home() {
  const [stats, setStats] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [tips, setTips] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function load() {
    try {
     
      const [chRes, tipsRes, evRes] = await Promise.all([
        API.getChallenges(),
        API.getTips(),
        API.getEvents(),
      ]);

      setChallenges(chRes.slice(0, 6));
      setTips(tipsRes.slice(0, 5));
      setEvents(evRes.slice(0, 4));

      const totalParticipants = chRes.reduce(
        (sum, c) => sum + (c.participants || 0),
        0
      );

      setStats({
        totalParticipants,
        totalCO2SavedKg: Math.round(totalParticipants * 1.5),
        totalPlasticSavedKg: Math.round(totalParticipants * 0.5),
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load home data");
    } finally {
      setLoading(false);
    }
  }

  load();
}, []);


  return (
    <div
      className="min-h-screen flex flex-col gap-16 px-6 py-10"
      style={{
        background:
          "linear-gradient(180deg, #d9f99d 0%, #bbf7d0 50%, #a7f3d0 100%)",
      }}
    >

      <section className="hero min-h-[60vh] bg-green-100 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center px-6 border border-green-200">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-3 drop-shadow-md">
          Join the Sustainability Movement 🌱
        </h1>
        <p className="text-lg text-green-700 max-w-2xl">
          Small actions. Big change. Take part in challenges and help make our
          planet greener.
        </p>
        <div className="mt-6">
          <a
            href="/challenges"
            className="btn bg-green-600 hover:bg-green-700 text-white text-lg"
          >
            Explore Challenges
          </a>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
          Live Impact Stats 🌍
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-24 w-full"></div>
            ))}
          </div>
        ) : (
          <div className="stats shadow-xl bg-green-100 border border-green-200 rounded-2xl grid grid-cols-1 md:grid-cols-3">
            <div className="stat">
              <div className="stat-title text-green-700">Total Participants</div>
              <div className="stat-value text-green-800">
                {stats?.totalParticipants || 0}
              </div>
            </div>

            <div className="stat">
              <div className="stat-title text-green-700">
                Total CO₂ Saved (kg)
              </div>
              <div className="stat-value text-green-800">
                {stats?.totalCO2SavedKg || 0}
              </div>
            </div>

            <div className="stat">
              <div className="stat-title text-green-700">Plastic Saved (kg)</div>
              <div className="stat-value text-green-800">
                {stats?.totalPlasticSavedKg || 0}
              </div>
            </div>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
          Active Challenges ⚡
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((c) => (
              <div
                key={c._id}
                className="card bg-green-50 hover:bg-green-100 transition shadow-lg border border-green-200"
              >
                <figure>
                  <img
                    src={c.imageUrl || "/placeholder.jpg"}
                    alt={c.title}
                    className="h-40 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-green-800">{c.title}</h3>
                  <p className="text-sm text-green-700">
                    {c.category} • {c.duration} days
                  </p>
                  <p className="text-sm text-green-700">
                    {c.description?.slice(0, 80)}...
                  </p>
                  <div className="card-actions justify-end">
                    <a
                      href={`/challenges/${c._id}`}
                      className="btn btn-sm bg-green-600 text-white"
                    >
                      View
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
          Recent Eco Tips 💡
        </h2>

        {loading ? (
          <div className="skeleton h-24 w-full"></div>
        ) : (
          <div className="space-y-3">
            {tips.map((t) => (
              <div
                key={t._id}
                className="p-3 bg-green-50 rounded-lg border border-green-200 shadow-sm hover:bg-green-100 transition"
              >
                <strong className="text-green-800">{t.title}</strong>
                <p className="text-sm text-green-700">
                  By {t.authorName || t.author}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
          Upcoming Events 📅
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton h-32 w-full"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((e) => (
              <div
                key={e._id}
                className="card bg-green-50 border border-green-200 shadow-md hover:bg-green-100 transition"
              >
                <div className="card-body">
                  <h3 className="card-title text-green-800">{e.title}</h3>
                  <p className="text-sm text-green-700">
                    {new Date(e.date).toLocaleString()} — {e.location}
                  </p>
                  <p className="text-sm text-green-700">
                    {e.description?.slice(0, 100)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-green-100 border border-green-200 p-6 rounded-2xl shadow-inner">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-4">
          Why Go Green?
        </h2>
        <ul className="list-disc list-inside space-y-1 text-green-700">
          <li>Save money and resources</li>
          <li>Healthier communities with cleaner air</li>
          <li>Protect wildlife and local ecosystems</li>
          <li>Build sustainable habits for the future</li>
        </ul>
      </section>
    </div>
  );
}
