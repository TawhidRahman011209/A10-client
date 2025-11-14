import React, { useState, useRef, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase.config";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const nameRef = useRef(null);
  const navigate = useNavigate();

  const validation = validatePassword(password);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const saveUserToDB = async (name, email, photoURL) => {
    await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, photoURL }),
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!validation.valid) {
      return toast.error(
        "Password must have uppercase, lowercase, special character and at least 6 characters."
      );
    }

    setLoading(true);

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(cred.user, { displayName: name, photoURL });

      // Save to backend
      await saveUserToDB(name, email, photoURL);

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
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      // Save to backend (Google register)
      await saveUserToDB(user.displayName, user.email, user.photoURL);

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
              className="w-full border border-green-300 bg-white text-gray-800 rounded-lg px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-green-800 font-medium mb-1">Photo URL</label>
            <input
              placeholder="Enter your photo URL (optional)"
              className="w-full border border-green-300 bg-white text-gray-800 rounded-lg px-3 py-2"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-green-800 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-green-300 bg-white text-gray-800 rounded-lg px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-green-800 font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                className="w-full border border-green-300 bg-white text-gray-800 rounded-lg px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <button
          onClick={google}
          disabled={loading}
          className="w-full bg-white border border-green-400 text-green-700 mt-4 py-2 rounded-lg hover:bg-green-100"
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
