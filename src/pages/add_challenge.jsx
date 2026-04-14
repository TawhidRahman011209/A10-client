import React, { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import ProtectedRoute from "../components/protected_route";
import { auth } from "../firebase/firebase.config";

function AddChallengeForm() {
  const [form, setForm] = useState({
    title: "",
    category: "Waste Reduction",
    description: "",
    duration: 30,
    target: "",
    impactMetric: "",
    startDate: "",
    endDate: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.title || !form.description) return "Title & description required";
    if (!form.target || !form.impactMetric) return "Target & impact metric required";
    if (!form.startDate || !form.endDate) return "Dates are required";
    if (new Date(form.endDate) < new Date(form.startDate)) {
      return "End date must be after start date";
    }
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      return toast.error(error);
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("You must be logged in");
        return;
      }

      const token = await user.getIdToken();

      await API.post("/api/challenges", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Challenge created successfully 🎉");

      // reset form
      setForm({
        title: "",
        category: "Waste Reduction",
        description: "",
        duration: 30,
        target: "",
        impactMetric: "",
        startDate: "",
        endDate: "",
        imageUrl: "",
      });

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create challenge");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="auth-page space-y-4">
      <h3 className="text-2xl font-bold text-green-800">Add New Challenge</h3>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <select name="category" value={form.category} onChange={handleChange}>
        <option>Waste Reduction</option>
        <option>Energy Conservation</option>
        <option>Water Conservation</option>
        <option>Sustainable Transport</option>
        <option>Green Living</option>
        <option>Other</option>
      </select>

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />

      <input
        name="duration"
        type="number"
        placeholder="Duration (days)"
        value={form.duration}
        onChange={handleChange}
      />

      <input
        name="target"
        placeholder="Target (e.g., Reduce 5kg plastic)"
        value={form.target}
        onChange={handleChange}
        required
      />

      <input
        name="impactMetric"
        placeholder="Impact Metric (e.g., kg CO2 saved)"
        value={form.impactMetric}
        onChange={handleChange}
        required
      />

      <input
        name="startDate"
        type="date"
        value={form.startDate}
        onChange={handleChange}
        required
      />

      <input
        name="endDate"
        type="date"
        value={form.endDate}
        onChange={handleChange}
        required
      />

      <input
        name="imageUrl"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={loading}
        className="btn bg-green-600 text-white"
      >
        {loading ? "Creating..." : "Create Challenge"}
      </button>
    </form>
  );
}

export default function AddChallenge() {
  return (
    <ProtectedRoute>
      <AddChallengeForm />
    </ProtectedRoute>
  );
}