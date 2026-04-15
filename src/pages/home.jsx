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

  // 🔥 SLIDER STATE
  const [currentSlide, setCurrentSlide] = useState(0);

  // 🔥 SLIDES DATA
  const slides = [
    {
      title: "Discover Eco Events 📅",
      subtitle: "Join local and global events to make impact.",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      button: "View Events",
      link: "/events",
    },
    {
      title: "Track Your Activities 📊",
      subtitle: "Monitor your sustainability journey.",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      button: "My Activities",
      link: "/my-activities",
    },
    {
      title: "Go Green Every Day 🌱",
      subtitle: "Small steps lead to big change.",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
      button: "Explore Challenges",
      link: "/challenges",
    },
  ];

  // 🔥 AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 LOAD DATA
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
      {/* 🔥 HERO SLIDER */}
      <section className="relative h-[60vh] rounded-2xl overflow-hidden shadow-xl">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center flex flex-col justify-center items-center text-center px-6"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>

              <div className="relative z-10 text-white max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-3">
                  {slide.title}
                </h1>
                <p className="text-lg mb-5">{slide.subtitle}</p>
                <a
                  href={slide.link}
                  className="btn bg-green-600 hover:bg-green-700 text-white"
                >
                  {slide.button}
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* 🔥 LEFT ARROW */}
        <button
          onClick={() =>
            setCurrentSlide((prev) =>
              prev === 0 ? slides.length - 1 : prev - 1
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-black px-3 py-2 rounded-full shadow"
        >
          ←
        </button>

        {/* 🔥 RIGHT ARROW */}
        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % slides.length)
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-black px-3 py-2 rounded-full shadow"
        >
          →
        </button>

        {/* 🔥 DOTS */}
        <div className="absolute bottom-4 w-full flex justify-center gap-2 z-20">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                i === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            ></div>
          ))}
        </div>
      </section>

      {/* 🔥 STATS */}
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
              <div className="stat-title text-green-700">
                Total Participants
              </div>
              <div className="stat-value text-green-800">
                {stats?.totalParticipants || 0}
              </div>
            </div>

            <div className="stat">
              <div className="stat-title text-green-700">
                CO₂ Saved (kg)
              </div>
              <div className="stat-value text-green-800">
                {stats?.totalCO2SavedKg || 0}
              </div>
            </div>

            <div className="stat">
              <div className="stat-title text-green-700">
                Plastic Saved (kg)
              </div>
              <div className="stat-value text-green-800">
                {stats?.totalPlasticSavedKg || 0}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 🔥 CHALLENGES */}
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
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}