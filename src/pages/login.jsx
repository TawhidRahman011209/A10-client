import React, { useState, useEffect, useRef } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase.config";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 to-green-300 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-green-100">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Login to EcoTrack
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-green-800 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              ref={emailRef}
              className="w-full border border-green-300 bg-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none text-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-green-800 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-green-300 bg-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none text-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full bg-white border border-green-400 text-green-700 mt-4 py-2 rounded-lg hover:bg-green-100 transition-all duration-200"
        >
          {loading ? "Loading..." : "Continue with Google"}
        </button>

        <div className="text-center mt-4 text-sm text-green-800">
          <Link to="/register" className="hover:underline font-medium">
            Register
          </Link>{" "}
          ·{" "}
          <Link to="/forgot-password" className="hover:underline font-medium">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
}
