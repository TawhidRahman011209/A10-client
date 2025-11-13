import React, { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import ProtectedRoute from "../components/protected_route";

function AddChallengeForm() {
  const [form, setForm] = useState({
    title: "",
    category: "Waste Reduction",
    description: "",
    duration: 30,
    startDate: "",
    endDate: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/api/challenges", form);
      toast.success("Challenge created");
      setForm({
        title: "",
        category: "Waste Reduction",
        description: "",
        duration: 30,
        startDate: "",
        endDate: "",
        imageUrl: "",
      });
    } catch (err) {
      toast.error("Failed to create challenge");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="auth-page">
      <h3>Add New Challenge</h3>
      <label>
        Title
        <input name="title" value={form.title} onChange={handleChange} required />
      </label>
      <label>
        Category
        <select name="category" value={form.category} onChange={handleChange}>
          <option>Waste Reduction</option>
          <option>Energy Conservation</option>
          <option>Water Conservation</option>
          <option>Sustainable Transport</option>
          <option>Green Living</option>
        </select>
      </label>
      <label>
        Description
        <textarea name="description" value={form.description} onChange={handleChange} />
      </label>
      <label>
        Duration (days)
        <input
          name="duration"
          type="number"
          value={form.duration}
          onChange={handleChange}
        />
      </label>
      <label>
        Start Date
        <input
          name="startDate"
          type="date"
          value={form.startDate}
          onChange={handleChange}
        />
      </label>
      <label>
        End Date
        <input
          name="endDate"
          type="date"
          value={form.endDate}
          onChange={handleChange}
        />
      </label>
      <label>
        Image URL
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
        />
      </label>

      <button type="submit" className="btn primary" disabled={loading}>
        {loading ? "Saving..." : "Create Challenge"}
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
