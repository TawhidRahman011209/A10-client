import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";

export default function ChallengeDetails() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  
  useEffect(() => {
    (async () => {
      try {
        const res = await API.get(`/api/challenges/${id}`);
        setChallenge(res.data);
      } catch (err) {
        toast.error("Failed to load challenge");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  
  const handleJoin = async () => {
    if (!user) {
      toast.info("Please login to join");
      navigate("/login", { state: { from: `/challenges/${id}` } });
      return;
    }

    try {
      await API.post("/api/user-challenges/join", {
        userId: user.uid || user.email,
        challengeId: id,
      });
      toast.success("You joined the challenge!");
      setChallenge((prev) => ({
        ...prev,
        participants: (prev.participants || 0) + 1,
      }));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to join");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!challenge) return <div>Not found</div>;

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
        <button className="btn primary" onClick={handleJoin}>
          Join Challenge
        </button>
      </div>
    </div>
  );
}
