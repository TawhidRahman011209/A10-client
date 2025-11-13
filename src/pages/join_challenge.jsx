import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { auth } from "../firebase/firebase.config";
import { getIdToken } from "firebase/auth";
import { toast } from "react-toastify";

export default function JoinChallenge() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    try {
      setLoading(true);
      const token = await getIdToken(auth.currentUser, true);
      const res = await API.post(`/api/challenges/join/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Joined challenge");
      navigate("/my-activities");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to join");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{padding:20}}>
      <h2>Join Challenge</h2>
      <p>Do you want to join this challenge?</p>
      <div style={{marginTop:12}}>
        <button onClick={handleJoin} disabled={loading} className="btn bg-green-600 text-white">
          {loading ? "Joining..." : "Join"}
        </button>
      </div>
    </div>
  );
}
