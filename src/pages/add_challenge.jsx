import React, { useState } from "react";
import API from "../api";
import { toast } from "react-hot-toast";
import ProtectedRoute from "../components/protected_route";

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

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // validate form
  const validateForm = () => {
    if (!form.title || !form.description)
      return "Title & description required";

    if (!form.target || !form.impactMetric)
      return "Target & impact metric required";

    if (!form.startDate || !form.endDate)
      return "Dates are required";

    if (new Date(form.endDate) < new Date(form.startDate)) {
      return "End date must be after start date";
    }

    return null;
  };

  // submit form
  const submit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      return toast.error(error);
    }

    setLoading(true);

    try {
      await API.addChallenge(form);

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
      toast.error(err.message || "Failed to create challenge");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gradient-to-b from-green-100 to-green-300">
      <form
        onSubmit={submit}
        className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg space-y-4"
      >
        <h3 className="text-2xl font-bold text-green-800 text-center">
          Add New Challenge
        </h3>

        {/* Title */}
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          required
        />

        {/* Category */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        >
          <option>Waste Reduction</option>
          <option>Energy Conservation</option>
          <option>Water Conservation</option>
          <option>Sustainable Transport</option>
          <option>Green Living</option>
          <option>Other</option>
        </select>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          required
        />

        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="duration"
            type="number"
            placeholder="Duration (days)"
            value={form.duration}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />

          <input
            name="target"
            placeholder="Target (e.g., Reduce 5kg plastic)"
            value={form.target}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
        </div>

        {/* Impact Metric */}
        <input
          name="impactMetric"
          placeholder="Impact Metric (e.g., kg CO2 saved)"
          value={form.impactMetric}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          required
        />

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />

          <input
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
        </div>

        {/* Image URL */}
        <input
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          {loading ? "Creating..." : "Create Challenge"}
        </button>
      </form>
    </div>
  );
}

// protected wrapper
export default function AddChallenge() {
  return (
    <ProtectedRoute>
      <AddChallengeForm />
    </ProtectedRoute>
  );
}