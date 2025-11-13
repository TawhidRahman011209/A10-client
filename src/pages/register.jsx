import React, { useState, useRef, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase.config";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

function validatePassword(pwd) {
  const uppercase = /[A-Z]/.test(pwd);
  const lowercase = /[a-z]/.test(pwd);
  const special = /[^A-Za-z0-9]/.test(pwd);
  const lengthOk = pwd.length >= 6;
  return {
    uppercase,
    lowercase,
    special,
    lengthOk,
    valid: uppercase && lowercase && special && lengthOk,
  };
}

export default function Register() {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nameRef = useRef(null);
  const navigate = useNavigate();
  const validation = validatePassword(password);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!validation.valid)
      return toast.error(
        "Password invalid: must include upper, lower, special and >=6 characters"
      );
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name, photoURL });
      toast.success("Registered successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google");
      navigate("/");
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
          Join EcoTrack
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-green-800 font-medium mb-1">Name</label>
            <input
              ref={nameRef}
              placeholder="Enter your name"
              className="w-full border border-green-300 bg-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none text-gray-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-green-800 font-medium mb-1">
              Photo URL
            </label>
            <input
              placeholder="Enter your photo URL (optional)"
              className="w-full border border-green-300 bg-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none text-gray-700"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-green-800 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-green-300 bg-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none text-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-green-800 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a strong password"
              className="w-full border border-green-300 bg-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none text-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <ul className="text-sm mt-2 space-y-1">
            <li
              className={
                validation.uppercase ? "text-green-600" : "text-red-500"
              }
            >
              At least 1 uppercase
            </li>
            <li
              className={
                validation.lowercase ? "text-green-600" : "text-red-500"
              }
            >
              At least 1 lowercase
            </li>
            <li
              className={validation.special ? "text-green-600" : "text-red-500"}
            >
              At least 1 special character
            </li>
            <li
              className={validation.lengthOk ? "text-green-600" : "text-red-500"}
            >
              Minimum length 6
            </li>
          </ul>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all duration-200"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <button
          onClick={google}
          disabled={loading}
          className="w-full bg-white border border-green-400 text-green-700 mt-4 py-2 rounded-lg hover:bg-green-100 transition-all duration-200"
        >
          {loading ? "Loading..." : "Register with Google"}
        </button>

        <div className="text-center mt-4 text-sm text-green-800">
          <Link to="/login" className="hover:underline font-medium">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
