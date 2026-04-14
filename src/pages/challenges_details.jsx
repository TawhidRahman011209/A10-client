import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";

export default function ChallengeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // 🔐 Track logged-in user
  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  // 📦 Load challenge details (FIXED)
  useEffect(() => {
    (async () => {
      try {
        // ✅ Use feature API (correct)
        const res = await API.getChallenge(id);

        // ✅ API already returns data directly
        setChallenge(res);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load challenge");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // 🚀 Join challenge (FIXED)
  const handleJoin = async () => {
    if (!user) {
      toast.info("Please login to join");
      navigate("/login", { state: { from: `/challenges/${id}` } });
      return;
    }

    try {
      // ✅ Use feature API
      await API.joinChallenge(id);

      toast.success("You joined the challenge 🎉");
    } catch (err) {
      console.error(err);
      toast.error(err?.body?.message || "Failed to join");
    }
  };

  // ⏳ Loading state
  if (loading) return <div>Loading...</div>;

  // ❌ Not found state
  if (!challenge) return <div>Not found</div>;

  // ✅ UI
  return (
    <div style={{ padding: 20 }}>
      <h2>{challenge.title}</h2>

      <img
        src={challenge.imageUrl || "/placeholder.jpg"}
        alt={challenge.title}
        style={{
          width: "100%",
          maxHeight: 320,
          objectFit: "cover",
          borderRadius: 8,
        }}
      />

      <p style={{ color: "var(--muted)" }}>
        {challenge.category} • {challenge.duration} days •{" "}
        {challenge.participants} participants
      </p>

      <p>{challenge.description}</p>

      <div style={{ marginTop: 12 }}>
        <button
          onClick={handleJoin}
          className="btn bg-green-600 text-white"
        >
          Join Challenge
        </button>
      </div>
    </div>
  );
}