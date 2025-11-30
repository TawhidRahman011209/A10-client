import React, { useEffect, useState } from "react";
import API from "../api";         
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

function Activities() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      console.log("🔥 FRONTEND FIREBASE USER:", u?.uid);
      if (u) loadUserChallenges(u.uid);
      else {
        setList([]);
        setLoading(false);
      }
    });
    return unsub;
  }, []);

  const loadUserChallenges = async (uid) => {
    try {
      setLoading(true);

      console.log("📡 REQUESTING USER CHALLENGES FOR:", uid);

      const data = await API.getUserChallenges(uid);

      console.log("📥 SERVER RESPONSE:", data);

      setList(data);
    } catch (err) {
      console.error("❌ API ERROR:", err);
      toast.error("Failed to load activities");
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (id, progress) => {
    try {
      const data = await API.updateUserChallenge(id, { progress });

      setList((prev) =>
        prev.map((x) => (x._id === id ? data : x))
      );

      toast.success("Progress updated");
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-800">My Activities</h2>

      {loading ? (
        <div className="skeleton h-24" />
      ) : list.length === 0 ? (
        <div>No joined challenges</div>
      ) : (
        list.map((item) => (
          <div
            key={item._id}
            className="card p-4 mb-3 bg-green-50 border border-green-200"
          >
            <h4 className="text-lg font-semibold">
              {item.challengeId?.title}
            </h4>

            <div>Progress: {item.progress}%</div>

            <input
              type="range"
              min="0"
              max="100"
              value={item.progress || 0}
              onChange={(e) =>
                updateProgress(item._id, Number(e.target.value))
              }
            />

            <div className="text-sm text-green-700">
              Status: {item.status}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default function MyActivitiesPage() {
  return <Activities />;
}
