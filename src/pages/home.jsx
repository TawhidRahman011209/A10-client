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

  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ Slider content
  const slides = [
    {
      title: "Discover Eco Events 📅",
      desc: "Join local and global events to make impact.",
      btn: "View Events",
      link: "/events",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    {
      title: "Take Green Challenges 🌱",
      desc: "Build habits and compete with others.",
      btn: "Explore Challenges",
      link: "/challenges",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
    },
    {
      title: "Track Your Activities⚡",
      desc: "Monitor your eco-friendly actions.",
      btn: "My Activities",
      link: "/my-activities",
      image:
        "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    },
  ];

  // ✅ Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Fetch data
  useEffect(() => {
    async function load() {
      try {
        const [chRes, tipsRes, evRes] = await Promise.all([
          API.getChallenges(),
          API.getTips(),
          API.getEvents(),
        ]);

        setChallenges(chRes.slice(0, 6));
        setTips(tipsRes.slice(0, 6));
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
        // ✅ FIXED BACKGROUND (no yellow gradient anymore)
        backgroundColor: "#a7f3d0",
      }}
    >
      {/* ================= SLIDER ================= */}
      <section className="relative h-[60vh] rounded-2xl overflow-hidden shadow-xl">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${slides[currentSlide].image})`,
          }}
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg text-gray-200 max-w-xl">
            {slides[currentSlide].desc}
          </p>

          <a
            href={slides[currentSlide].link}
            className="mt-6 btn bg-green-600 hover:bg-green-700 text-white"
          >
            {slides[currentSlide].btn}
          </a>
        </div>

        {/* arrows */}
        <button
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + slides.length) % slides.length
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-3 py-2 rounded-full shadow"
        >
          ❮
        </button>

        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % slides.length)
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-3 py-2 rounded-full shadow"
        >
          ❯
        </button>

        {/* dots */}
        <div className="absolute bottom-4 w-full flex justify-center gap-2">
          {slides.map((_, i) => (
            <span
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                i === currentSlide ? "bg-white" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section>
        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
          Live Impact Stats 🌍
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading
            ? [1, 2, 3].map((i) => (
                <div key={i} className="skeleton h-32 w-full"></div>
              ))
            : [
                {
                  label: "Total Participants",
                  value: stats?.totalParticipants,
                },
                {
                  label: "CO₂ Saved (kg)",
                  value: stats?.totalCO2SavedKg,
                },
                {
                  label: "Plastic Saved (kg)",
                  value: stats?.totalPlasticSavedKg,
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-green-100 border border-green-200 rounded-xl shadow-md p-6 text-center"
                >
                  <p className="text-green-700 text-sm">{s.label}</p>
                  <h3 className="text-3xl font-bold text-green-800">
                    {s.value || 0}
                  </h3>
                </div>
              ))}
        </div>
      </section>

      {/* ================= CHALLENGES ================= */}
      <section>
        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
          Active Challenges ⚡
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? [1, 2, 3].map((i) => <SkeletonCard key={i} />)
            : challenges.map((c) => (
                <div
                  key={c._id}
                  className="card bg-green-50 hover:bg-green-100 shadow-lg border border-green-200"
                >
                  <figure>
                    <img
                      src={c.imageUrl || "/placeholder.jpg"}
                      alt={c.title}
                      className="h-40 w-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-green-800">
                      {c.title}
                    </h3>
                    <p className="text-sm text-green-700">
                      {c.category} • {c.duration} days
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </section>

      {/* ================= TIPS ================= */}
      <section>
        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
          Recent Eco Tips 💡
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? [1, 2, 3].map((i) => (
                <div key={i} className="skeleton h-28 w-full"></div>
              ))
            : tips.map((t) => (
                <div
                  key={t._id}
                  className="bg-green-50 border border-green-200 rounded-xl shadow-md p-5 hover:bg-green-100 transition"
                >
                  <h3 className="text-green-800 font-semibold">
                    {t.title}
                  </h3>
                  <p className="text-sm text-green-700 mt-2">
                    By {t.authorName || t.author}
                  </p>
                </div>
              ))}
        </div>
      </section>

      {/* ================= EVENTS ================= */}
      <section>
        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
          Upcoming Events 📅
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((e) => (
            <div
              key={e._id}
              className="bg-green-50 border border-green-200 rounded-xl shadow-md p-5 hover:bg-green-100 transition"
            >
              <h3 className="text-green-800 font-semibold">
                {e.title}
              </h3>
              <p className="text-sm text-green-700 mt-2">
                {new Date(e.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}